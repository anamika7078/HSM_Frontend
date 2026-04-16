"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Sparkles, Building2 } from "lucide-react";
import { authApi } from "@/services/modules/auth";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginValues) => {
    setLoading(true);
    try {
      const response = await authApi.login(data);
      if (response.success && response.data) {
        login(response.data.token, response.data.user);
        toast.success(`Welcome back, ${response.data.user.name}!`);
        router.push("/dashboard");
      } else {
        toast.error(response.message || "Invalid credentials");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0F172A] p-4 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
      
      <div className="w-full max-w-[440px] relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-500/20 mb-6 group transition-transform hover:scale-105 duration-500">
            <Building2 className="w-10 h-10 group-hover:rotate-12 transition-transform duration-500" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 flex items-center justify-center gap-2">
            SocietyConnect <Sparkles className="w-5 h-5 text-amber-400 animate-bounce" />
          </h1>
          <p className="text-slate-400 font-medium">Precision Management for Modern Societies</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl shadow-black/50 overflow-hidden relative group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
            <p className="text-slate-400 text-sm">Please enter your credentials to access the panel</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-blue-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-600 placeholder:font-medium"
                  />
                </div>
                {errors.email && <p className="text-[11px] font-bold text-rose-500 ml-1">{errors.email.message}</p>}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password</label>
                  <button type="button" className="text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-colors">Forgot?</button>
                </div>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-blue-500 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
                {errors.password && <p className="text-[11px] font-bold text-rose-500 ml-1">{errors.password.message}</p>}
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-base uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>SIGN IN <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center px-4">
             <p className="text-[11px] text-slate-500 font-medium">
               By signing in, you agree to our Terms of Service and Privacy Policy.
             </p>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">Need help accessing your account?</p>
            <button className="text-blue-500 hover:text-blue-400 text-sm font-bold mt-1 transition-colors">Contact Society Management</button>
        </div>
      </div>
    </div>
  );
}

