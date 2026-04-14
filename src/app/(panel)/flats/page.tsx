"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Layers, 
  Home, 
  Search, 
  Filter, 
  Plus, 
  ChevronRight,
  CheckCircle2,
  MoreHorizontal,
  Edit2,
  Trash2,
  LayoutGrid,
  List,
  ArrowUpRight,
  ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import StatsCard from "@/components/cards/stats-card";

type Tab = "wings" | "flats";
type ViewMode = "grid" | "list";

const mockWings = [
  { id: "A", name: "Wing A", floors: 12, totalFlats: 48, occupied: 42, type: "Residential" },
  { id: "B", name: "Wing B", floors: 12, totalFlats: 48, occupied: 38, type: "Residential" },
  { id: "C", name: "Wing C", floors: 10, totalFlats: 40, occupied: 40, type: "Residential" },
  { id: "D", name: "Wing D", floors: 15, totalFlats: 60, occupied: 52, type: "Residential" },
];

const mockFlats = [
  { id: "f1", unit: "101", wing: "A", floor: 1, type: "2BHK", status: "OCCUPIED", owner: "Amit Sharma" },
  { id: "f2", unit: "102", wing: "A", floor: 1, type: "3BHK", status: "VACANT", owner: "-" },
  { id: "f3", unit: "402", wing: "B", floor: 4, type: "2BHK", status: "OCCUPIED", owner: "Priya Patel" },
  { id: "f4", unit: "205", wing: "C", floor: 2, type: "1BHK", status: "PENDING", owner: "Rajesh Kumar" },
  { id: "f5", unit: "501", wing: "D", floor: 5, type: "3BHK", status: "OCCUPIED", owner: "Vikram Singh" },
  { id: "f6", unit: "303", wing: "A", floor: 3, type: "2BHK", status: "OCCUPIED", owner: "Anjali Gupta" },
];

export default function FlatsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("flats");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFlats = mockFlats.filter(flat => 
    flat.unit.includes(searchQuery) || 
    flat.wing.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flat.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-2xl">
              <Building2 className="w-8 h-8 text-amber-600" />
            </div>
            Flats & Wings
          </h1>
          <p className="text-slate-500 mt-1">Manage society infrastructure, residential units and building structure.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold shadow-sm hover:bg-slate-50 transition-all">
            <Layers className="w-4.5 h-4.5" />
            Add Wing
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            <Plus className="w-4.5 h-4.5" />
            Add Flat
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Wings" 
          value="04" 
          icon={Layers} 
          color="bg-indigo-100 text-indigo-600"
          badge={{ text: "Active", variant: "live" }}
        />
        <StatsCard 
          title="Total Units" 
          value="196" 
          icon={Home} 
          color="bg-amber-100 text-amber-600"
        />
        <StatsCard 
          title="Occupied" 
          value="172" 
          icon={CheckCircle2} 
          color="bg-emerald-100 text-emerald-600"
          badge={{ text: "88%", variant: "new" }}
        />
        <StatsCard 
          title="Vacant Units" 
          value="24" 
          icon={ShieldAlert} 
          color="bg-rose-100 text-rose-600"
          badge={{ text: "Available", variant: "pending" }}
        />
      </div>

      {/* Navigation and Controls */}
      <div className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-soft flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex p-1.5 bg-slate-100 rounded-[1.5rem] w-fit">
          <button 
            onClick={() => setActiveTab("flats")}
            className={cn(
              "px-8 py-3 rounded-[1rem] text-sm font-bold transition-all flex items-center gap-2",
              activeTab === "flats" ? "bg-white text-primary shadow-md" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Home className="w-4 h-4" />
            All Flats
          </button>
          <button 
            onClick={() => setActiveTab("wings")}
            className={cn(
              "px-8 py-3 rounded-[1rem] text-sm font-bold transition-all flex items-center gap-2",
              activeTab === "wings" ? "bg-white text-primary shadow-md" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Layers className="w-4 h-4" />
            Wings
          </button>
        </div>

        <div className="flex flex-1 items-center gap-4 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input 
              type="text" 
              placeholder={activeTab === 'flats' ? "Search unit, wing or owner..." : "Search wing name..."}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-3.5 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">
            <Filter className="w-5 h-5" />
          </button>
          <div className="h-10 w-px bg-slate-100 mx-2 hidden md:block" />
          <div className="flex bg-slate-50 p-1 rounded-xl">
             <button 
              onClick={() => setViewMode("list")}
              className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-white text-primary shadow-sm" : "text-slate-400")}
             >
                <List className="w-4.5 h-4.5" />
             </button>
             <button 
              onClick={() => setViewMode("grid")}
              className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-white text-primary shadow-sm" : "text-slate-400")}
             >
                <LayoutGrid className="w-4.5 h-4.5" />
             </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === "wings" ? (
          <motion.div 
            key="wings-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {mockWings.map((wing) => (
              <div key={wing.id} className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-soft hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl group-hover:scale-110 transition-transform">
                    {wing.id}
                  </div>
                  <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{wing.name}</h3>
                <p className="text-slate-400 text-sm font-medium mb-6">{wing.type}</p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-500">Occupancy</span>
                    <span className="text-primary">{Math.round((wing.occupied/wing.totalFlats)*100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(wing.occupied/wing.totalFlats)*100}%` }}
                      className="h-full bg-primary rounded-full shadow-[0_0_12px_rgba(37,99,235,0.3)]" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">Floors</p>
                      <p className="text-lg font-bold text-slate-900">{wing.floors}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">Total Flats</p>
                      <p className="text-lg font-bold text-slate-900">{wing.totalFlats}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-2 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  View Wing Map <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
            
            {/* Add New Wing Card */}
            <button className="h-full min-h-[300px] border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all group">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Plus className="w-8 h-8 text-slate-300 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-slate-900 font-bold text-lg">Add New Wing</p>
                <p className="text-slate-400 text-sm">Expand society structure</p>
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="flats-table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="text-left bg-slate-50/50">
                    <th className="px-10 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-12">Unit & Floor</th>
                    <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Type</th>
                    <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                    <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Primary Resident / Owner</th>
                    <th className="px-10 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] text-right pr-12">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredFlats.map((flat) => (
                    <tr key={flat.id} className="group hover:bg-indigo-50/30 transition-all cursor-pointer">
                      <td className="px-10 py-6 pl-12">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                            <Home className="w-6 h-6 text-slate-400 group-hover:text-primary" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-lg">{flat.unit}</p>
                            <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase">
                              <Layers className="w-3 h-3" />
                              Wing {flat.wing} • Floor {flat.floor}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="px-4 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                          {flat.type}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="flex justify-center">
                          <span className={cn(
                            "px-4 py-2 rounded-full text-[10px] font-bold border flex items-center gap-2",
                            flat.status === 'OCCUPIED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                            flat.status === 'PENDING' ? "bg-amber-50 text-amber-600 border-amber-100" :
                            "bg-slate-50 text-slate-500 border-slate-100"
                          )}>
                            <div className={cn("w-1.5 h-1.5 rounded-full", 
                              flat.status === 'OCCUPIED' ? "bg-emerald-500" :
                              flat.status === 'PENDING' ? "bg-amber-500" : "bg-slate-400"
                            )} />
                            {flat.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                            {flat.owner !== "-" ? flat.owner.charAt(0) : "?"}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{flat.owner}</p>
                            {flat.owner !== "-" && <p className="text-[11px] font-medium text-primary hover:underline">View Profile</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right pr-12">
                        <div className="flex items-center justify-end gap-2">
                           <button className="p-3 text-slate-400 hover:text-primary hover:bg-white hover:shadow-sm rounded-xl transition-all">
                             <Edit2 className="w-4.5 h-4.5" />
                           </button>
                           <button className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                             <Trash2 className="w-4.5 h-4.5" />
                           </button>
                           <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                             <ArrowUpRight className="w-4.5 h-4.5" />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="p-8 border-t border-slate-50 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-400">Showing <span className="text-slate-900 font-bold">1-10</span> of 196 units</span>
              <div className="flex gap-2">
                <button className="p-2 border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-50" disabled>
                   <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-soft">1</button>
                <button className="px-4 py-2 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50">2</button>
                <button className="px-4 py-2 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50">3</button>
                <button className="p-2 border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-50">
                   <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
