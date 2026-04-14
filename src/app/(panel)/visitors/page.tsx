"use client";

import React from "react";
import { Users, Search, Filter, ArrowUpRight, ArrowDownLeft, Clock, Edit2, Trash2 } from "lucide-react";

export default function VisitorLogPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Visitor Log</h1>
          <p className="text-slate-500 text-sm">Real-time tracking of entries and exits.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-2xl border border-slate-200 flex shadow-sm">
             <button className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold">Today</button>
             <button className="px-4 py-2 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold">Week</button>
             <button className="px-4 py-2 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all">Month</button>
          </div>
        </div>
      </div>

      {/* Visitor Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Entries", value: 142, icon: ArrowDownLeft, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Currently Inside", value: 18, icon: Users, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Expected Today", value: 24, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Frequent Visitors", value: 8, icon: ArrowUpRight, color: "text-purple-500", bg: "bg-purple-50" }
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft">
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
               <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <h4 className="text-2xl font-bold text-slate-900">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Visitor Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
           <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search visitors..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" />
           </div>
           <button className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors">
              <Filter className="w-4 h-4" /> Filter
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 text-left">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-8">Visitor Detail</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Purpose</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">To Meet</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entry Time</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Exit Time</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: "Rahul Singh", type: "Guest", purpose: "Personal Visit", host: "A-402", entry: "11:30 AM", exit: "-", status: "Inside" },
                { name: "Zomato Delivery", type: "Delivery", purpose: "Food Delivery", host: "C-102", entry: "11:15 AM", exit: "11:25 AM", status: "Exited" },
                { name: "Urban Company", type: "Service", purpose: "AC Service", host: "B-501", entry: "10:00 AM", exit: "-", status: "Inside" },
                { name: "Daily Maid", type: "Staff", purpose: "House Help", host: "Multiple", entry: "08:30 AM", exit: "10:30 AM", status: "Exited" },
              ].map((log, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 pl-8">
                    <div className="flex items-center gap-3">
                       <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${log.status === 'Inside' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                          {log.name.charAt(0)}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-900">{log.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium">{log.type}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-600">{log.purpose}</td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-700">{log.host}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                       <Clock className="w-3.5 h-3.5" /> {log.entry}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                       {log.exit !== '-' && <Clock className="w-3.5 h-3.5 text-rose-400" />} {log.exit}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${log.status === 'Inside' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right pr-8">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Edit Log">
                          <Edit2 className="w-4 h-4" />
                       </button>
                       <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Delete Log">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
