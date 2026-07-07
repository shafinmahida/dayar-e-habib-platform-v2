"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldAlert, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Simulate mock login delay
    setTimeout(() => {
      if (email.trim() === "" || password.trim() === "") {
        setErrorMsg("Please enter both email and password.");
        setIsLoading(false);
        return;
      }
      
      // Simple mock authentication success redirect to dashboard
      router.push("/admin");
    }, 850);
  };

  return (
    <div className="w-full max-w-md bg-[#FCFAF5] border border-stone-200/80 rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-200">
      {/* Brand Header */}
      <div className="text-center space-y-1.5">
        <span className="text-[10px] font-extrabold tracking-[0.25em] text-stone-400 uppercase">
          DAYARE E HABIB
        </span>
        <h1 className="text-xl font-bold text-stone-900 tracking-tight">
          Control Center Gateway
        </h1>
        <p className="text-xs text-stone-500">
          Enter credentials to manage your pilgrimage platform.
        </p>
      </div>

      {/* Error Alert Box */}
      {errorMsg && (
        <div className="flex items-center space-x-2.5 p-3 rounded-lg border border-red-200 bg-red-50/50 text-red-700 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
          <ShieldAlert className="h-4 w-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-stone-600">
            Administrator Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              id="email"
              type="email"
              placeholder="admin@dayarehabib.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent text-stone-900 placeholder-stone-400"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-stone-600">
            Security Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent text-stone-900 placeholder-stone-400"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Submit Action */}
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 py-2.5 bg-stone-900 hover:bg-stone-850 active:bg-stone-950 text-white text-xs font-semibold rounded-lg transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Access Control Center</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
