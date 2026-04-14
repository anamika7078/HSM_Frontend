"use client";

import React from "react";
import { ShieldCheck, Plus, UserCircle, Phone, Clock, MapPin, Trash2 } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Security & Guards</h1>
          <p className="text-slate-500 text-sm">Manage security personnel and shift schedules.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" />
          <span>Add New Guard</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[
          { name: "Suresh Patil", shift: "Day (8 AM - 8 PM)", contact: "+91 91234 56789", gate: "Main Gate", status: "On Duty" },
          { name: "Ramesh Pawar", shift: "Day (8 AM - 8 PM)", contact: "+91 91234 56788", gate: "Back Gate", status: "On Duty" },
          { name: "Mahesh Singh", shift: "Night (8 PM - 8 AM)", contact: "+91 91234 56787", gate: "Club House", status: "Off Duty" },
        ].map((guard, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
               <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  <UserCircle className="w-10 h-10" />
               </div>
               <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${guard.status === 'On Duty' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                 {guard.status.toUpperCase()}
               </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-1">{guard.name}</h3>
            <p className="text-xs font-medium text-primary mb-6">Security Head</p>

            <div className="space-y-3 pt-4 border-t border-slate-50">
               <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{guard.shift}</span>
               </div>
               <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{guard.gate}</span>
               </div>
               <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{guard.contact}</span>
               </div>
            </div>

            <div className="mt-6 flex gap-2">
               <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all">
                  Edit Profile
               </button>
                <button className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all" title="Delete Guard">
                   <Trash2 className="w-5 h-5" />
                </button>
            </div>

            <ShieldCheck className="absolute -right-4 -top-4 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}
