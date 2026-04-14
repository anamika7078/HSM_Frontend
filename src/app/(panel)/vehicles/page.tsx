"use client";

import React, { useState } from "react";
import { 
  Car, 
  Search, 
  Filter, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft,
  Calendar,
  MoreVertical,
  ChevronDown,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  History,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import StatsCard from "@/components/cards/stats-card";

type VehicleTab = "active" | "all";

const mockVehicles = [
  { id: "1", vehicleNo: "MH 12 AB 1234", type: "4 WHEELER", flat: "A-101", owner: "Amit Sharma", entryTime: "10:30 AM", exitTime: null, status: "INSIDE", mode: "RESIDENT" },
  { id: "2", vehicleNo: "MH 14 XY 5678", type: "2 WHEELER", flat: "B-402", owner: "Priya Patel", entryTime: "09:15 AM", exitTime: "11:45 AM", status: "EXITED", mode: "RESIDENT" },
  { id: "3", vehicleNo: "KA 01 MJ 4567", type: "4 WHEELER", flat: "C-205", owner: "Sujeet Kumar", entryTime: "11:20 AM", exitTime: null, status: "INSIDE", mode: "VISITOR" },
  { id: "4", vehicleNo: "DL 02 BQ 9999", type: "4 WHEELER", flat: "A-501", owner: "Vikram Singh", entryTime: "08:00 AM", exitTime: "02:30 PM", status: "EXITED", mode: "RESIDENT" },
  { id: "5", vehicleNo: "MH 01 CC 7777", type: "2 WHEELER", flat: "D-303", owner: "Anand Gupta", entryTime: "01:10 PM", exitTime: null, status: "INSIDE", mode: "RESIDENT" },
  { id: "6", vehicleNo: "UP 16 TD 4444", type: "4 WHEELER", flat: "B-202", owner: "Guest (Raj)", entryTime: "12:45 PM", exitTime: null, status: "INSIDE", mode: "VISITOR" },
];

export default function VehicleLogPage() {
  const [activeTab, setActiveTab] = useState<VehicleTab>("active");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVehicles = mockVehicles.filter(v => 
    (activeTab === "all" || v.status === "INSIDE") &&
    (v.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
     v.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
     v.flat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-2xl">
              <Car className="w-8 h-8 text-emerald-600" />
            </div>
            Vehicle Log
          </h1>
          <p className="text-slate-500 mt-1">Monitor all incoming and outgoing vehicle traffic in real-time.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold shadow-sm hover:bg-slate-50 transition-all">
            <History className="w-4.5 h-4.5" />
            Full History
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            <Plus className="w-4.5 h-4.5" />
            Log New Entry
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Inside Society" 
          value="42" 
          icon={Car} 
          color="bg-emerald-100 text-emerald-600"
          badge={{ text: "Live", variant: "live" }}
        />
        <StatsCard 
          title="Today's Total Entries" 
          value="128" 
          icon={ArrowDownLeft} 
          color="bg-blue-100 text-blue-600"
          badge={{ text: "+12%", variant: "new" }}
        />
        <StatsCard 
          title="Resident Vehicles" 
          value="31" 
          icon={MapPin} 
          color="bg-indigo-100 text-indigo-600"
        />
        <StatsCard 
          title="Visitor Vehicles" 
          value="11" 
          icon={Info} 
          color="bg-amber-100 text-amber-600"
          badge={{ text: "Active", variant: "pending" }}
        />
      </div>

      {/* Navigation and Controls */}
      <div className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-soft flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex p-1.5 bg-slate-100 rounded-[1.5rem] w-fit">
          <button 
            onClick={() => setActiveTab("active")}
            className={cn(
              "px-8 py-3 rounded-[1.2rem] text-sm font-bold transition-all flex items-center gap-2",
              activeTab === "active" ? "bg-white text-primary shadow-md" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active Inside
          </button>
          <button 
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-8 py-3 rounded-[1.2rem] text-sm font-bold transition-all flex items-center gap-2",
              activeTab === "all" ? "bg-white text-primary shadow-md" : "text-slate-500 hover:text-slate-700"
            )}
          >
            All Logs
          </button>
        </div>

        <div className="flex flex-1 items-center gap-4 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search vehicle no, flat or resident..." 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-3.5 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Vehicle Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="text-left bg-slate-50/50">
                <th className="px-10 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-12">Vehicle Details</th>
                <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Assigned Flat</th>
                <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Entry Time</th>
                <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Exit Time</th>
                <th className="px-10 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] text-right pr-12">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
               {filteredVehicles.map((vehicle) => (
                 <tr key={vehicle.id} className="group hover:bg-slate-50/30 transition-all cursor-pointer">
                   <td className="px-10 py-7 pl-12">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl border border-slate-100 bg-white flex flex-col items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                          <Car className={cn("w-6 h-6", vehicle.type === '4 WHEELER' ? 'text-blue-500' : 'text-emerald-500')} />
                          <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase">{vehicle.type.split(' ')[0]}W</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-lg tracking-tight uppercase">{vehicle.vehicleNo}</p>
                          <div className="flex items-center gap-2 mt-1">
                             <span className={cn(
                               "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-tight",
                               vehicle.mode === 'RESIDENT' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                             )}>
                               {vehicle.mode}
                             </span>
                             <span className="text-xs text-slate-400 font-medium">Owned by: {vehicle.owner}</span>
                          </div>
                        </div>
                      </div>
                   </td>
                   <td className="px-8 py-7 text-center">
                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl">
                       <MapPin className="w-3.5 h-3.5 text-slate-400" />
                       <span className="text-sm font-bold text-slate-700">{vehicle.flat}</span>
                     </div>
                   </td>
                   <td className="px-8 py-7 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                           <Clock className="w-3.5 h-3.5 text-emerald-500" />
                           {vehicle.entryTime}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium tracking-wide">ENTRY IN</span>
                      </div>
                   </td>
                   <td className="px-8 py-7 text-center">
                      {vehicle.exitTime ? (
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-500">
                             <Clock className="w-3.5 h-3.5 text-rose-500" />
                             {vehicle.exitTime}
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium tracking-wide">EXITED OUT</span>
                        </div>
                      ) : (
                        <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-lg dashed-border">STILL INSIDE</span>
                      )}
                   </td>
                   <td className="px-10 py-7 text-right pr-12">
                      <div className="flex items-center justify-end gap-3">
                        <span className={cn(
                          "px-4 py-2 rounded-full text-[10px] font-bold border flex items-center gap-2",
                          vehicle.status === 'INSIDE' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"
                        )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full", vehicle.status === 'INSIDE' ? "bg-emerald-500" : "bg-slate-300")} />
                          {vehicle.status}
                        </span>
                        {!vehicle.exitTime && (
                          <button className="p-2 text-primary hover:bg-primary/5 rounded-xl transition-all font-bold text-xs flex items-center gap-1 border border-primary/20">
                            Mark Exit
                          </button>
                        )}
                      </div>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-10 border-t border-slate-50 flex items-center justify-between">
           <div className="flex gap-6">
              <p className="text-sm font-bold text-slate-400">Average Stay: <span className="text-slate-900 tracking-tight">2h 45m</span></p>
              <p className="text-sm font-bold text-slate-400">Peak Time: <span className="text-slate-900 tracking-tight">09:00 AM</span></p>
           </div>
           <div className="flex items-center gap-2">
              <button className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors" disabled>Previous</button>
              {[1].map(p => (
                <div key={p} className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20">{p}</div>
              ))}
              <button className="px-6 py-2.5 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}
