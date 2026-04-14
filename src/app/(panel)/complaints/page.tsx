"use client";

import React from "react";
import { Search, Filter, MessageSquare, Clock, CheckCircle2, AlertCircle, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyles = {
  "Open": "bg-rose-100 text-rose-700 border-rose-200",
  "In Progress": "bg-amber-100 text-amber-700 border-amber-200",
  "Resolved": "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export default function ComplaintsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Complaints</h1>
          <p className="text-slate-500 text-sm">Manage and track resident issues.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-2xl border border-slate-200 flex shadow-sm">
             <button className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-md shadow-primary/20">All</button>
             <button className="px-4 py-2 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold">Pending</button>
             <button className="px-4 py-2 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all">Resolved</button>
          </div>
        </div>
      </div>

      {/* Stats Summary for Complaints */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Total Received", value: 48, icon: MessageSquare, color: "text-blue-500" },
          { label: "Pending Resolution", value: 12, icon: AlertCircle, color: "text-rose-500" },
          { label: "Resolved This Month", value: 36, icon: CheckCircle2, color: "text-emerald-500" }
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft flex items-center gap-4">
            <div className={cn("p-3 rounded-2xl bg-slate-50", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <h4 className="text-xl font-bold text-slate-900">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest pl-8">Ticket</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Resident</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Issue</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right pr-8">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: "#C-2041", name: "Amit Kumar", flat: "A-502", issue: "Leaking pipe in bathroom", date: "2 hours ago", status: "Open" },
                { id: "#C-2039", name: "Sita Devi", flat: "B-101", issue: "Elevator not working", date: "5 hours ago", status: "In Progress" },
                { id: "#C-2038", name: "Rajesh Singh", flat: "C-1204", issue: "Garbage collection missed", date: "Yesterday", status: "Resolved" },
                { id: "#C-2037", name: "Meera Nair", flat: "D-302", issue: "Parking light fused", date: "2 days ago", status: "Resolved" },
              ].map((complaint) => (
                <tr key={complaint.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5 pl-8">
                     <span className="text-xs font-bold text-slate-400">{complaint.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{complaint.name}</p>
                      <p className="text-[11px] text-slate-500 font-medium">Flat {complaint.flat}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-slate-700 max-w-xs truncate">{complaint.issue}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      {complaint.date}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold border", statusStyles[complaint.status as keyof typeof statusStyles])}>
                      {complaint.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right pr-8">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Edit Complaint">
                         <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Delete Complaint">
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
