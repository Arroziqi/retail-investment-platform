'use client';

import { Clock, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function VerificationWaitingRoom() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Clock className="w-10 h-10 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Verification in Progress</h1>
          <p className="text-muted-foreground">
            We are currently reviewing your KYC documents. This usually takes between 2-4 hours.
          </p>
        </div>

        <div className="grid gap-4 py-4">
          <div className="flex items-start gap-4 p-4 rounded-xl border bg-card/50 text-left">
            <div className="mt-1 bg-green-500/10 p-1 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-semibold">Documents Received</p>
              <p className="text-sm text-muted-foreground">Your identity proof and address documents were successfully uploaded.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl border bg-card/50 text-left">
            <div className="mt-1 bg-primary/10 p-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Security Check</p>
          <p className="text-sm text-muted-foreground">We are performing standard compliance checks to ensure your account&apos;s safety.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground italic">
            You&apos;ll receive an email notification once your account is ready.
          </p>
          
          <div className="flex flex-col gap-2">
            <Button render={<Link href="/login" />} variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
            </Button>
            <Button onClick={() => window.location.reload()} className="w-full">
              Check Status
            </Button>
            
            {/* Development Only: Bypass Verification */}
            {process.env.NODE_ENV === 'development' && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-4 text-xs text-muted-foreground opacity-50 hover:opacity-100"
                onClick={async () => {
                  const { updateKycStatusCookie } = await import('@/lib/auth/actions');
                  await updateKycStatusCookie('Verified');
                  window.location.href = '/dashboard';
                }}
              >
                [Dev] Simulate Approved Verification
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
