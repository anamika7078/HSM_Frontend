"use client";

import React, { useState } from "react";
import {
  Settings,
  Building2,
  ShieldCheck,
  Bell,
  Globe,
  Lock,
  Save,
  Camera
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type SettingTab = "society" | "security" | "payments" | "notifications";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingTab>("society");

  const tabs = [
    { id: "society", label: "Society Profile", icon: Building2 },
    { id: "security", label: "Security & Access", icon: ShieldCheck },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-2xl">
            <Settings className="w-8 h-8 text-slate-600" />
          </div>
          System Settings
        </h1>
        <p className="text-slate-500 mt-1">Configure your society&apos;s global preferences and security protocols.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-soft p-3 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingTab)}
                className={cn(
                  "w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all group",
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-white" : "text-slate-400 group-hover:text-primary")} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Setting Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === "society" && (
              <motion.div
                key="society-tab"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden"
              >
                <div className="p-8 border-b border-slate-50">
                  <h3 className="text-xl font-bold text-slate-900">Society Profile</h3>
                  <p className="text-sm text-slate-400 font-medium">Public details that appear on resident apps and bills.</p>
                </div>

                <div className="p-10 space-y-8">
                  {/* Logo Upload */}
                  <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-slate-50">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                        <Building2 className="w-12 h-12 text-slate-200" />
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl shadow-lg hover:scale-110 transition-transform">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2 text-center md:text-left">
                      <h4 className="font-bold text-slate-900">Society Logo</h4>
                      <p className="text-xs text-slate-400 max-w-[200px]">JPG or PNG. Max size 2MB. Recommendation 512x512px.</p>
                      <div className="flex gap-2">
                        <button className="text-xs font-bold text-primary hover:underline">Upload New</button>
                        <span className="text-xs text-slate-300">|</span>
                        <button className="text-xs font-bold text-rose-500 hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Society Name</label>
                      <input
                        type="text"
                        defaultValue="Sunrise Garden Heights"
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Registration No</label>
                      <input
                        type="text"
                        defaultValue="MH-PN-2023-A-1234"
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Full Address</label>
                      <textarea
                        rows={3}
                        defaultValue="Plot No 42-45, Sector 18, Kharghar, Navi Mumbai, Maharashtra 410210"
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Official Email</label>
                      <input
                        type="email"
                        defaultValue="admin@sunrisegarden.com"
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Helpline Number</label>
                      <input
                        type="text"
                        defaultValue="+91 22 2345 6789"
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex justify-end gap-3">
                  <button className="px-6 py-3 text-slate-500 font-bold text-sm hover:text-slate-700 transition-all">Discard Changes</button>
                  <button className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                    <Save className="w-4 h-4" />
                    Update Profile
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                key="security-tab"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Visitor Protocols</h3>
                      <p className="text-sm text-slate-400 font-medium">Standardize how visitors are processed at gates.</p>
                    </div>
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: "Require OTP for Visitors", desc: "Sent to resident's mobile for verification", active: true },
                      { title: "Vehicle Photo at Entry", desc: "Capture number plate image automatically", active: true },
                      { title: "Delivery Hub Drop-off", desc: "Require delivery agents to leave parcels at hub", active: false },
                      { title: "Allow Pre-invited Guests", desc: "Residents can generate QR codes for friends", active: true },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[1.5rem] hover:bg-slate-100/50 transition-all group">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{item.title}</h4>
                          <p className="text-xs text-slate-400 font-medium mt-0.5">{item.desc}</p>
                        </div>
                        <div className={cn(
                          "w-12 h-6 rounded-full p-1 cursor-pointer transition-all",
                          item.active ? "bg-primary" : "bg-slate-300"
                        )}>
                          <div className={cn(
                            "w-4 h-4 rounded-full bg-white shadow-sm transition-all trasform",
                            item.active ? "translate-x-6" : "translate-x-0"
                          )} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-8">Access Control</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border border-slate-100 rounded-3xl space-y-4 hover:border-primary/20 transition-all group">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <Lock className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-slate-900">Gate Pass Validity</h4>
                      <select className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold text-slate-700">
                        <option>4 Hours</option>
                        <option>8 Hours</option>
                        <option>24 Hours</option>
                      </select>
                    </div>
                    <div className="p-6 border border-slate-100 rounded-3xl space-y-4 hover:border-primary/20 transition-all group">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                        <Globe className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-slate-900">Default Region</h4>
                      <select className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold text-slate-700">
                        <option>Maharashtra (IST)</option>
                        <option>Gujarat (IST)</option>
                        <option>Delhi (IST)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
