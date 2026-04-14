"use client";

import React from "react";
import { 
  Users, 
  IndianRupee, 
  MessageCircleWarning, 
  UserSquare2,
  FileText,
  CreditCard,
  PlusSquare,
  BellRing,
  ShieldCheck,
  AlertTriangle,
  FileDown,
  ArrowRight,
  Edit2,
  Trash2
} from "lucide-react";
import StatsCard from "@/components/cards/stats-card";
import { cn } from "@/lib/utils";

const quickActions = [
  { label: "Post Notice", icon: FileText, color: "bg-blue-50 text-blue-600", href: "/notices" },
  { label: "Generate Bills", icon: CreditCard, color: "bg-emerald-50 text-emerald-600", href: "/billing" },
  { label: "Add Flat/Wing", icon: PlusSquare, color: "bg-amber-50 text-amber-600", href: "/flats" },
  { label: "Send Reminder", icon: BellRing, color: "bg-purple-50 text-purple-600", href: "/reminders" },
  { label: "Manage Guards", icon: ShieldCheck, color: "bg-indigo-50 text-indigo-600", href: "/security" },
  { label: "Log Complaint", icon: MessageCircleWarning, color: "bg-rose-50 text-rose-600", href: "/complaints" },
  { label: "Download Report", icon: FileDown, color: "bg-cyan-50 text-cyan-600", href: "/reports" },
  { label: "Emergency Alert", icon: AlertTriangle, color: "bg-red-50 text-red-600", href: "/emergency" },
];

export default function DashboardPage() {
  const [greeting, setGreeting] = React.useState("Good Morning");
  
  React.useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17) setGreeting("Good Evening");
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{greeting}, Admin</h1>
        <p className="text-slate-500 mt-1">Here's what's happening in <span className="text-primary font-semibold">SocietyConnect</span> today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Approved Members" 
          value="1,248" 
          icon={Users} 
          color="bg-blue-100 text-blue-600"
          badge={{ text: "Live", variant: "live" }}
        />
        <StatsCard 
          title="Dues Pending" 
          value="₹ 45,200" 
          icon={IndianRupee} 
          color="bg-amber-100 text-amber-600"
          badge={{ text: "New", variant: "new" }}
        />
        <StatsCard 
          title="Complaints" 
          value="12" 
          icon={MessageCircleWarning} 
          color="bg-rose-100 text-rose-600"
          badge={{ text: "Open", variant: "open" }}
        />
        <StatsCard 
          title="Today's Visitors" 
          value="84" 
          icon={UserSquare2} 
          color="bg-indigo-100 text-indigo-600"
          badge={{ text: "Pending", variant: "pending" }}
        />
      </div>

      {/* Quick Actions Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
          <button className="text-sm font-semibold text-primary hover:underline">Customize Actions</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center justify-center gap-3 p-5 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 hover:-translate-y-1 transition-all group"
            >
              <div className={cn("p-3 rounded-2xl transition-all group-hover:scale-110", action.color)}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-[12px] font-bold text-slate-600 group-hover:text-slate-900 text-center leading-tight">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Bottom Grid: Recent Activity & Visitor Logs */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-soft">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">Recent Notices</h2>
            <button className="flex items-center gap-2 text-sm font-semibold text-primary group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs flex-col">
                  <span>14</span>
                  <span className="uppercase text-[10px]">Apr</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">Water Supply Interruption Notice</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">Maintenance work scheduled for Wing A and B from 10 AM to 2 PM this Sunday.</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">IMPORTANT</span>
                    <span className="text-[10px] text-slate-400 font-medium tracking-wide">POSTED BY: CHAIRPERSON</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visitor Log Summary */}
        <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-soft">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">Live Visitor Log</h2>
            <button className="flex items-center gap-2 text-sm font-semibold text-primary group">
              Full Log <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Visitor</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Flat</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Entry</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Entry</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-4 pl-2">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                           <Users className="w-4 h-4" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-900">Rahul Sharma</p>
                            <p className="text-[10px] text-slate-500 font-medium">Delivery (Zomato)</p>
                         </div>
                       </div>
                    </td>
                    <td className="py-4 text-sm font-semibold text-slate-600">A-402</td>
                    <td className="py-4 text-sm font-medium text-slate-500 text-[12px]">10:45 AM</td>
                    <td className="py-4 text-right">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">INSIDE</span>
                    </td>
                    <td className="py-4 text-right pr-2">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
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
    </div>
  );
}
