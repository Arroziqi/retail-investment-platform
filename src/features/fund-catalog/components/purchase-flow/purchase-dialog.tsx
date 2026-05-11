'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { format } from 'date-fns'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Fund } from '@/types/fund'
import { useUserStore } from '@/lib/stores/user-store'
import { RecurringFrequency } from '@/types/recurring'
import { RecurringSetup } from './recurring-setup'
import { calculateNextExecutionDate, formatDisplayDate } from '../../lib/sip-utils'
import { useAnalytics } from '@/hooks/useAnalytics'

interface PurchaseDialogProps {
  fund: Fund | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PurchaseDialog({ fund, isOpen, onClose }: PurchaseDialogProps) {
  const [step, setStep] = useState(1)
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'recurring'>('one-time')
  const [amount, setAmount] = useState('')
  const [frequency, setFrequency] = useState<RecurringFrequency>('monthly')
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { kycStatus } = useUserStore()
  const { track } = useAnalytics()

  if (!fund) return null

  if (kycStatus !== 'Verified') {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verification Required</DialogTitle>
            <DialogDescription>
              You need to complete your KYC verification before you can start investing.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={() => window.location.href = '/onboarding/kyc'}>Complete KYC</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const handleNext = () => setStep(2)
  const handleBack = () => setStep(1)

  const handleConfirm = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    const endpoint = purchaseType === 'one-time' ? '/api/orders' : '/api/recurring-plans'
    const body = purchaseType === 'one-time' 
      ? { fundId: fund.id, amount: Number(amount) }
      : { fundId: fund.id, amount: Number(amount), frequency, startDate: startDate?.toISOString() }

    await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })

    await new Promise(resolve => setTimeout(resolve, 1500))
    track({ 
      type: 'PURCHASE_SUCCESS', 
      payload: { fundId: fund.id, amount: Number(amount) } 
    })
    setIsSubmitting(false)
    setStep(3)
  }

  const isValidAmount = Number(amount) >= fund.minInvestment
  const isRecurringReady = purchaseType === 'recurring' ? (isValidAmount && !!startDate) : isValidAmount
  const nextDate = startDate ? calculateNextExecutionDate(startDate, frequency) : null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose()
        // Reset state after dialog closes
        setTimeout(() => {
          setStep(1)
          setAmount('')
          setPurchaseType('one-time')
        }, 300)
      }
    }}>
      <DialogContent className="sm:max-w-[425px]">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Invest in {fund.name}</DialogTitle>
              <DialogDescription>
                Choose your investment type and amount.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="one-time" className="w-full" onValueChange={(v) => setPurchaseType(v as 'one-time' | 'recurring')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="one-time">One-time</TabsTrigger>
                <TabsTrigger value="recurring">Recurring (SIP)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="one-time" className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Investment Amount (Rp)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder={`Min. Rp ${fund.minInvestment.toLocaleString()}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    aria-describedby={amount && !isValidAmount ? "amount-error" : undefined}
                  />
                  {amount && !isValidAmount && (
                    <p id="amount-error" className="text-xs text-destructive">
                      Amount must be at least Rp {fund.minInvestment.toLocaleString()}
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="recurring">
                <RecurringSetup 
                  amount={amount}
                  setAmount={setAmount}
                  frequency={frequency}
                  setFrequency={setFrequency}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  minInvestment={fund.minInvestment}
                />
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleNext} disabled={!isRecurringReady}>Continue</Button>
            </DialogFooter>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Review {purchaseType === 'one-time' ? 'Investment' : 'Recurring Plan'}</DialogTitle>
              <DialogDescription>
                Please confirm your {purchaseType === 'one-time' ? 'investment' : 'recurring plan'} details.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fund Name</span>
                <span className="font-medium">{fund.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-bold">Rp {Number(amount).toLocaleString()}</span>
              </div>
              {purchaseType === 'recurring' && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frequency</span>
                    <span className="capitalize">{frequency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Start Date</span>
                    <span>{startDate ? format(startDate, 'PPP') : '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span className="text-muted-foreground">Next Execution</span>
                    <span className="font-semibold text-primary">{nextDate ? formatDisplayDate(nextDate) : '-'}</span>
                  </div>
                </>
              )}
              {purchaseType === 'one-time' && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">NAV (Estimated)</span>
                  <span>Rp {fund.nav.toLocaleString()}</span>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>Back</Button>
              <Button onClick={handleConfirm} disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : purchaseType === 'one-time' ? 'Confirm & Invest' : 'Start Recurring Plan'}
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 3 && (
          <div className="py-12 flex flex-col items-center text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <div className="space-y-2" aria-live="polite">
              <h3 className="text-xl font-bold">
                {purchaseType === 'one-time' ? 'Investment Successful!' : 'Plan Created!'}
              </h3>
              <p className="text-muted-foreground">
                {purchaseType === 'one-time' 
                  ? `You have successfully invested Rp ${Number(amount).toLocaleString()} in ${fund.name}.`
                  : `Your ${frequency} plan for ${fund.name} has been set up.`}
              </p>
              {purchaseType === 'recurring' && (
                <p className="text-sm font-medium pt-2">
                  Next execution: {nextDate ? formatDisplayDate(nextDate) : '-'}
                </p>
              )}
            </div>
            <Button className="w-full mt-6" onClick={onClose}>Done</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
