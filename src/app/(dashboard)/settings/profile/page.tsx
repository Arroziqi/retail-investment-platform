"use client";

import { useUserStore } from "@/lib/stores/user-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, ShieldCheck, Mail, CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const profileSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, kycStatus, setUser } = useUserStore();

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
    },
  });

  const onSubmit = (values: ProfileValues) => {
    if (user) {
      setUser({ ...user, ...values });
      toast.success("Profile updated successfully");
    }
  };

  const getKycBadge = () => {
    switch (kycStatus) {
      case "Verified":
        return <Badge className="bg-green-500 hover:bg-green-600"><ShieldCheck className="w-3 h-3 mr-1" /> Verified</Badge>;
      case "Pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">Pending Verification</Badge>;
      case "Rejected":
        return <Badge variant="destructive">Verification Rejected</Badge>;
      default:
        return <Badge variant="outline">Unverified</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your personal information and account security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="border-border/50 shadow-sm overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary to-primary/60" />
            <CardContent className="-mt-12 text-center pb-8">
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-background border-4 border-background shadow-lg text-3xl font-bold text-primary uppercase mb-4">
                {user?.fullName?.substring(0, 2) || "U"}
              </div>
              <h2 className="text-xl font-bold">{user?.fullName || "Valued Investor"}</h2>
              <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>
              <div className="flex justify-center">
                {getKycBadge()}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Compliance Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-sm font-medium">KYC Status</span>
                <span className="text-sm font-bold text-primary">{kycStatus}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-sm font-medium">Risk Profile</span>
                <span className="text-sm font-bold text-primary">{user?.riskCategory || "Not Assessed"}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Account Type</span>
                <span className="text-sm font-bold text-primary">Individual</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your basic profile details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="fullName" className="pl-10" {...form.register("fullName")} />
                    </div>
                    {form.formState.errors.fullName && (
                      <p className="text-xs text-destructive font-medium">{form.formState.errors.fullName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" className="pl-10" {...form.register("email")} />
                    </div>
                    {form.formState.errors.email && (
                      <p className="text-xs text-destructive font-medium">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50 flex justify-end">
                  <Button type="submit" disabled={!form.formState.isDirty}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your banking and payment methods.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-background rounded-full flex items-center justify-center border border-border/50">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">BCA Bank •••• 4291</p>
                    <p className="text-xs text-muted-foreground">Primary funding source</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <Button variant="outline" className="w-full border-dashed">
                + Add New Payment Method
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
