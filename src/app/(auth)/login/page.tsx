"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/api-client";
import { useUserStore } from "@/lib/stores/user-store";
import { User } from "@/types/user";
import { setAuthSession } from "@/lib/auth/actions";
import { useAnalytics } from "@/hooks/useAnalytics";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const { trackEvent } = useAnalytics();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: LoginValues) =>
      apiClient<{ user: User; token: string }>("/api/auth/login", { body: values }),
    onSuccess: async (data) => {
      setUser(data.user);
      await setAuthSession(data.user, data.token);
      trackEvent('LOGIN_SUCCESS', { userId: data.user.id });
      router.push("/dashboard");
      router.refresh();
    },
    onError: (err: Error) => {
      setError(err.message || "Login failed. Please check your credentials.");
    },
  });

  function onSubmit(values: LoginValues) {
    setError(null);
    mutation.mutate(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/40 font-sans">
      <Card className="w-full max-w-md border-border/50 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-primary">RAP</CardTitle>
          <CardDescription className="text-base">
            Log in to manage your investments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="investor@example.com" 
                        className="h-11 bg-muted/30 focus-visible:ring-primary/30" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="h-11 bg-muted/30 focus-visible:ring-primary/30" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20 animate-in fade-in zoom-in duration-300">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full h-11 text-base font-semibold shadow-md transition-all hover:shadow-lg active:scale-[0.98]" disabled={mutation.isPending}>
                {mutation.isPending ? "Authenticating..." : "Sign In"}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Create one now
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
