"use client";

import React from "react";
import { CreditCard, Download, FileText, Send, Plus, Edit2, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Maintenance & Dues</h1>
          <p className="text-slate-500 text-sm">Manage society billing, payments, and reminders.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-200">
          <Plus className="w-5 h-5" />
          <span>Generate New Bills</span>
        </button>
      </div>

      {/* Finance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
           <div className="relative z-10">
             <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Total Collection (April)</p>
             <h2 className="text-3xl font-bold mb-6">{formatCurrency(458000)}</h2>
             <div className="flex items-center gap-2 text-[11px] font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-md">
               <span className="text-emerald-300">↑ 12.5%</span> than last month
             </div>
           </div>
           <CreditCard className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
           <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Outstanding Amount</p>
           <h2 className="text-3xl font-bold text-slate-900 mb-6">{formatCurrency(124500)}</h2>
           <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 border border-slate-100 w-fit px-3 py-1.5 rounded-full">
             <span className="text-rose-500">24 Residents</span> pending
           </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
           <div>
             <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Upcoming Expenses</p>
             <h2 className="text-2xl font-bold text-slate-900">{formatCurrency(85000)}</h2>
           </div>
           <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-colors">
              <FileText className="w-4 h-4" /> View Expense Report
           </button>
        </div>
      </div>

      {/* Recent Bills Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Recent Transactions</h3>
          <div className="flex gap-2">
             <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-100 hover:bg-slate-100 transition-all">
               <Download className="w-4 h-4" /> Export CSV
             </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/30 text-left">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-8">Bill ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resident</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 pl-8 text-xs font-bold text-slate-500">#INV-882{i}</td>
                  <td className="px-6 py-5">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Vikram Malhotra</p>
                      <p className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Wing A • Flat 1201</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-medium text-slate-600">Maintenance</span>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-slate-900">{formatCurrency(4500)}</td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">PAID</span>
                  </td>
                  <td className="px-6 py-5 text-right pr-8">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Edit Bill">
                           <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Delete Bill">
                           <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-xl transition-all" title="View Bill">
                           <FileText className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-xl transition-all" title="Send Reminder">
                           <Send className="w-4 h-4" />
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
