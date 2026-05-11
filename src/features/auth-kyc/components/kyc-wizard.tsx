'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useMutation } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { useUserStore } from '@/lib/stores/user-store'
import { apiClient } from '@/lib/api-client'
import { updateKycStatusCookie } from '@/lib/auth/actions'
import { useAnalytics } from '@/hooks/useAnalytics'

const kycSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  idNumber: z.string().min(16, 'ID Number must be 16 digits'),
})

type KYCValues = z.infer<typeof kycSchema>

export function KYCWizard() {
  const router = useRouter()
  const { setKycStatus, kycStep: step, setKycStep: setStep } = useUserStore()
  const { trackEvent } = useAnalytics()

  const form = useForm<KYCValues>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      idNumber: '',
    },
  })

  const mutation = useMutation({
    mutationFn: (values: KYCValues) => 
      apiClient('/api/kyc/submit', { body: values }),
    onSuccess: async (data: any) => {
      const status = data.status || 'Pending'
      setKycStatus(status)
      await updateKycStatusCookie(status)
      trackEvent('KYC_COMPLETE')
      
      if (status === 'Verified') {
        router.push('/dashboard')
      } else {
        router.push('/onboarding/risk-profile')
      }
      router.refresh()
    },
  })

  async function handleNext() {
    let fieldsToValidate: (keyof KYCValues)[] = []
    if (step === 1) fieldsToValidate = ['fullName', 'phone']
    if (step === 2) fieldsToValidate = ['idNumber']

    const isValid = await form.trigger(fieldsToValidate)
    if (isValid) {
      setStep(step + 1)
    }
  }

  function onSubmit(values: KYCValues) {
    mutation.mutate(values)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle aria-live="polite">KYC Onboarding - Step {step} of 3</CardTitle>
        <CardDescription>
          {step === 1 && "Personal Information"}
          {step === 2 && "Identity Verification"}
          {step === 3 && "Review and Submit"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
            id="kyc-form" 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-4"
            aria-label={`KYC Step ${step}: ${step === 1 ? 'Personal Info' : step === 2 ? 'Identity' : 'Review'}`}
          >
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Legal Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="08123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 2 && (
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>KTP / ID Number</FormLabel>
                    <FormControl>
                      <Input placeholder="3201234567890001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {step === 3 && (
              <div className="space-y-2">
                <p><strong>Name:</strong> {form.getValues('fullName')}</p>
                <p><strong>Phone:</strong> {form.getValues('phone')}</p>
                <p><strong>ID Number:</strong> {form.getValues('idNumber')}</p>
                <p className="text-sm text-muted-foreground mt-4">
                  By submitting, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
          Back
        </Button>
        <Button 
          type={step === 3 ? "submit" : "button"} 
          form="kyc-form" 
          onClick={step < 3 ? handleNext : undefined}
          disabled={mutation.isPending}
        >
          {step === 3 ? (mutation.isPending ? 'Submitting...' : 'Submit KYC') : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  )
}
