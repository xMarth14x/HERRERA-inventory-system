"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail } from "lucide-react";

import { apiFetch, ApiError } from "@/lib/api";
import { setAccessToken, type LoginResponse } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// =w1920 pulls the largest version this CDN actually stores (1365x746 — it
// caps there regardless of the requested width) instead of the ~512x280
// thumbnail the bare URL serves, which was being stretched full-screen.
const BACKGROUND_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB-UYGgtTx1_pvdV-7aj-0k6mVEtpf6SdroEUgalhxzR7H03zpk0RkDisFeWpPALPl42F02ScSb-WQKvLee0-hu0mG0XGXCEDDuV1bS0YKSTFZSNRZf3O8Mui_vKMkYCRUAasoXS9zMziB4pw4_YTxb0JCkNU4WkPLj6tSs8f39QtSlgWhFkakp5txv8nSZasilxqJNY3JgvPEf-akrcw3_Lw5E2qfP6-y1O5CEiC3XQyLUTeeWzQxiVI-cWHeVs2TYUA8=w1920";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0c1a3a] p-4 text-gray-800 sm:p-8">
      {/* Background photo, slow Ken Burns zoom */}
      <div
        aria-hidden
        className="animate-ken-burns absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${BACKGROUND_IMAGE_URL}')` }}
      />
      {/* Top/bottom darken for header and footer legibility */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/60" />
      {/* Vignette to focus attention on the card */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,26,58,0.05),rgba(6,13,32,0.6)_115%)]"
      />

      <main className="relative z-10 flex w-full max-w-md flex-col items-center justify-center">
        <section
          key={shake}
          className={`relative w-full animate-fade-in-up overflow-hidden rounded-2xl border border-white/20 bg-[#062e7e]/90 p-8 shadow-[0_25px_70px_rgba(6,13,32,0.55)] backdrop-blur-md lg:p-12 ${shake ? "animate-shake" : ""}`}
        >
          <div className="relative z-10">
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="flex size-16 items-center justify-center overflow-hidden rounded-lg shadow-sm">
                <Image src="/bigstop-logo.png" alt="BigStop logo" width={64} height={64} className="size-full object-cover" priority />
              </div>
              <div className="text-left">
                <h1 className="text-2xl leading-tight font-bold text-white">BigStop</h1>
                <p className="text-xs font-medium text-blue-100/80">Inventory Management</p>
              </div>
            </div>

            <div className="mb-10 text-center">
              <h3 className="mb-2 text-3xl font-bold text-white">Welcome back!</h3>
              <p className="text-base text-blue-100/80">Sign in to continue to your account</p>
            </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-blue-50">
                Email address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="size-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  aria-invalid={!!errors.email}
                  className="block w-full rounded-lg border border-gray-300 bg-white/90 py-3.5 pr-3 pl-12 text-base shadow-sm outline-none transition-all duration-300 focus:border-[#1e3a8a] focus:shadow-md focus:ring-2 focus:ring-[#1e3a8a]/20 aria-invalid:border-[#ef4444] aria-invalid:focus:ring-[#ef4444]/20"
                  {...register("email")}
                />
              </div>
              {errors.email ? <p className="mt-1.5 text-xs text-[#ef4444]">{errors.email.message}</p> : null}
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-blue-50">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="size-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                  className="block w-full rounded-lg border border-gray-300 bg-white/90 py-3.5 pr-12 pl-12 text-base shadow-sm outline-none transition-all duration-300 focus:border-[#1e3a8a] focus:shadow-md focus:ring-2 focus:ring-[#1e3a8a]/20 aria-invalid:border-[#ef4444] aria-invalid:focus:ring-[#ef4444]/20"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors hover:text-gray-500 focus:text-gray-500 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
              {errors.password ? <p className="mt-1.5 text-xs text-[#ef4444]">{errors.password.message}</p> : null}
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => toast.info("Password reset isn't available yet.")}
                className="text-sm font-medium text-[#ef4444] transition-colors hover:text-red-500"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-transparent bg-[#ffd21f] px-4 py-3.5 text-base font-semibold text-[#09245d] shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-[#ffc400] hover:shadow-md focus:ring-2 focus:ring-[#ffd21f] focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Signing in...
                </>
              ) : (
                <>
                  <LogIn className="size-4" /> Log in
                </>
              )}
            </button>
          </form>
          </div>
        </section>

        <p className="relative z-10 mt-6 text-xs text-white/90 drop-shadow-md">
          © {new Date().getFullYear()} Herrera Technologies. All rights reserved.
        </p>
      </main>
    </div>
  );
}
