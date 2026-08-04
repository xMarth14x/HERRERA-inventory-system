"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Box, CheckCircle2, CircleHelp, Loader2, Lock, LogIn, User, Warehouse } from "lucide-react";

import { apiFetch, ApiError } from "@/lib/api";
import { setAccessToken, type LoginResponse } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsSubmitting(true);
    try {
      const data = await apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      });
      setAccessToken(data.accessToken);
      toast.success(`Welcome back, ${data.user.name}`);
      router.push("/dashboard");
    } catch (error) {
      const message = error instanceof ApiError && error.status === 401
        ? "Invalid email or password"
        : "Something went wrong. Please try again.";
      toast.error(message);
      setShake((current) => current + 1);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen bg-[#f4f7fb] text-[#10172a] lg:grid-cols-[minmax(360px,0.82fr)_minmax(520px,1.18fr)]">
      <aside className="relative hidden overflow-hidden bg-gradient-to-b from-[#0b47bd] via-[#073b9f] to-[#062e7e] text-white lg:flex lg:flex-col">
        <div className="flex h-28 items-center gap-3 bg-gradient-to-br from-[#f21934] to-[#df1229] px-8 shadow-lg">
          <span className="flex size-12 items-center justify-center rounded-xl border-2 border-white/85 bg-white/10">
            <Box className="size-7" />
          </span>
          <div>
            <p className="text-2xl font-extrabold tracking-tight">HERRERA</p>
            <p className="text-xs text-white/85">Inventory Management</p>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-center px-10 py-12 xl:px-16">
          <span className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#ffd21f] text-[#09245d] shadow-lg">
            <Warehouse className="size-7" />
          </span>
          <h1 className="max-w-md text-4xl font-extrabold leading-tight tracking-tight">
            Complete visibility across every item and location.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-blue-100/85">
            Control purchasing, receiving, stock movement, counting, alerts, reporting, and approvals from one secure workspace.
          </p>
          <div className="mt-8 grid max-w-md gap-3 sm:grid-cols-2">
            {["Real-time stock control", "Approval workflows", "Operational reporting", "Immutable audit trail"].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/90">
                <CheckCircle2 className="size-4 text-[#ffd21f]" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div aria-hidden className="absolute -right-24 -bottom-20 size-80 rounded-full border-[42px] border-white/5" />
        <div aria-hidden className="absolute right-24 bottom-24 size-24 rounded-full bg-[#ed1b2f]/25 blur-2xl" />
      </aside>

      <main className="flex min-h-screen flex-col">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="flex size-10 items-center justify-center rounded-lg bg-[#ed1b2f] text-white"><Box className="size-5" /></span>
            <div><p className="font-extrabold">HERRERA</p><p className="text-[10px] text-muted-foreground">Inventory Management</p></div>
          </div>
          <p className="hidden text-sm text-muted-foreground lg:block">Secure inventory operations portal</p>
          <button type="button" aria-label="Help" onClick={() => toast.info("Contact your system administrator for access support.")} className="flex size-9 items-center justify-center rounded-full text-[#0a43b8] hover:bg-blue-50">
            <CircleHelp className="size-5" />
          </button>
        </header>

        <div className="relative flex flex-1 items-center justify-center overflow-hidden p-5 md:p-10">
          <div aria-hidden className="absolute top-10 right-10 size-72 rounded-full bg-blue-100/50 blur-3xl" />
          <div aria-hidden className="absolute bottom-0 left-0 size-64 rounded-full bg-yellow-100/50 blur-3xl" />

          <section key={shake} className={`relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(22,44,84,0.13)] md:p-9 ${shake ? "animate-shake" : ""}`}>
            <div className="mb-8">
              <span className="mb-5 flex size-12 items-center justify-center rounded-full bg-red-50 text-[#ed1b2f]"><Lock className="size-5" /></span>
              <h1 className="text-3xl font-extrabold tracking-tight">Welcome back</h1>
              <p className="mt-2 text-sm text-muted-foreground">Sign in to Herrera Inventory Management.</p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">Email address</label>
                <div className="relative">
                  <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input id="email" type="email" autoComplete="email" placeholder="you@herrera.local" aria-invalid={!!errors.email} className="h-11 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-10 text-sm outline-none transition focus:border-[#0a43b8] focus:ring-3 focus:ring-blue-100 aria-invalid:border-[#ed1b2f]" {...register("email")} />
                </div>
                {errors.email ? <p className="mt-1.5 text-xs text-[#ed1b2f]">{errors.email.message}</p> : null}
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold">Password</label>
                  <button type="button" onClick={() => toast.info("Password reset isn't available yet.")} className="text-xs font-semibold text-[#0a43b8] hover:underline">Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input id="password" type="password" autoComplete="current-password" placeholder="Enter your password" aria-invalid={!!errors.password} className="h-11 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-10 text-sm outline-none transition focus:border-[#0a43b8] focus:ring-3 focus:ring-blue-100 aria-invalid:border-[#ed1b2f]" {...register("password")} />
                </div>
                {errors.password ? <p className="mt-1.5 text-xs text-[#ed1b2f]">{errors.password.message}</p> : null}
              </div>

              <button type="submit" disabled={isSubmitting} className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ed1b2f] to-[#df1229] text-sm font-bold text-white shadow-md transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? <><Loader2 className="size-4 animate-spin" /> Signing in...</> : <><LogIn className="size-4" /> Sign in</>}
              </button>
            </form>
          </section>
        </div>

        <footer className="border-t border-slate-200 bg-white px-5 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Herrera Technologies. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
