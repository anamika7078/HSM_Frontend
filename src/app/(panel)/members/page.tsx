"use client";

import React, { useState } from "react";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Mail, 
  Phone,
  Building2,
  Calendar,
  Edit2,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { membersApi } from "@/services/modules/members";
import { cn } from "@/lib/utils";
import StatsCard from "@/components/cards/stats-card";

type Tab = "requests" | "all";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  flatNumber: string;
  wing: string;
  status: string;
  createdAt: string;
}

const mockMembers = [
  { id: "1", name: "Amit Sharma", email: "amit.s@example.com", phone: "+91 98765 43210", flatNumber: "101", wing: "A", status: "APPROVED", createdAt: "2024-01-15" },
  { id: "2", name: "Priya Patel", email: "priya.p@example.com", phone: "+91 87654 32109", flatNumber: "402", wing: "B", status: "APPROVED", createdAt: "2024-02-10" },
  { id: "3", name: "Suresh Raina", email: "suresh.r@example.com", phone: "+91 76543 21098", flatNumber: "205", wing: "C", status: "APPROVED", createdAt: "2024-03-05" },
  { id: "4", name: "Anjali Gupta", email: "anjali.g@example.com", phone: "+91 65432 10987", flatNumber: "303", wing: "A", status: "APPROVED", createdAt: "2024-03-12" },
  { id: "5", name: "Vikram Singh", email: "vikram.s@example.com", phone: "+91 54321 09876", flatNumber: "501", wing: "D", status: "APPROVED", createdAt: "2024-04-01" },
];

const mockRequests = [
  { id: "req1", name: "Rajesh Kumar", email: "rajesh.k@example.com", phone: "+91 99988 77766", flatNumber: "202", wing: "B", status: "PENDING", createdAt: "2024-04-12" },
  { id: "req2", name: "Sneha Reddy", email: "sneha.r@example.com", phone: "+91 88877 66655", flatNumber: "105", wing: "A", status: "PENDING", createdAt: "2024-04-13" },
];

export default function MembersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      try {
        const response = await membersApi.getAll();
        // Handle different API response structures
        const data = (response as { data?: Member[] }).data || (Array.isArray(response) ? response : []);
        return data.length > 0 ? data : mockMembers;
      } catch (error) {
        console.error("Error fetching members:", error);
        return mockMembers;
      }
    },
    enabled: activeTab === "all"
  });

  const { data: requests, isLoading: isLoadingRequests, refetch: refetchRequests } = useQuery({
    queryKey: ["member-requests"],
    queryFn: async () => {
      try {
        const response = await membersApi.getRequests();
        const data = (response as { data?: Member[] }).data || (Array.isArray(response) ? response : []);
        return data.length > 0 ? data : mockRequests;
      } catch (error) {
        console.error("Error fetching requests:", error);
        return mockRequests;
      }
    },
    enabled: activeTab === "requests"
  });

  const handleApprove = async (id: string) => {
    try {
      await membersApi.approve(id);
      refetchRequests();
    } catch (error) {
      console.error("Error approving member:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await membersApi.reject(id);
      refetchRequests();
    } catch (error) {
      console.error("Error rejecting member:", error);
    }
  };

  const displayData = activeTab === "all" ? members : requests;
  const isLoading = activeTab === "all" ? isLoadingMembers : isLoadingRequests;

  const filteredData = (displayData as Member[])?.filter((item: Member) => 
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.flatNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Member Management</h1>
          <p className="text-slate-500 mt-1">Review registration requests and manage society residents.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            <UserPlus className="w-4 h-4" />
            Add Member
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          title="Total Members" 
          value={members?.length?.toString() || "0"} 
          icon={Users} 
          color="bg-blue-100 text-blue-600"
          badge={{ text: "Active", variant: "live" }}
        />
        <StatsCard 
          title="Pending Requests" 
          value={requests?.length?.toString() || "0"} 
          icon={UserPlus} 
          color="bg-orange-100 text-orange-600"
          badge={{ text: (requests?.length ?? 0) > 0 ? "Action Required" : "Up to date", variant: "pending" }}
        />
        <StatsCard 
          title="Recent Joins" 
          value="12" 
          icon={Calendar} 
          color="bg-emerald-100 text-emerald-600"
          badge={{ text: "This Month", variant: "new" }}
        />
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden">
        {/* Tabs and Filters */}
        <div className="p-6 border-b border-slate-50 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Custom Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
              <button 
                onClick={() => setActiveTab("all")}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                  activeTab === "all" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                All Members
              </button>
              <button 
                onClick={() => setActiveTab("requests")}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                  activeTab === "requests" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Requests
                {requests && requests.length > 0 && (
                  <span className="w-5 h-5 flex items-center justify-center bg-orange-500 text-white text-[10px] rounded-full">
                    {requests.length}
                  </span>
                )}
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by name, flat, or email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>
              <button className="p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="text-left bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-10">Member Details</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Flat/Unit</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Contact</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right pr-10">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-10 py-6">
                        <div className="h-12 bg-slate-100 rounded-2xl w-full" />
                      </td>
                    </tr>
                  ))
                ) : filteredData?.length > 0 ? (
                  filteredData.map((member: Member) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={member.id} 
                      className="group hover:bg-slate-50/50 transition-all cursor-pointer"
                    >
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-indigo-500/10 flex items-center justify-center text-primary font-bold text-lg">
                            {member.name?.charAt(0) || "M"}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{member.name || "N/A"}</p>
                            <p className="text-xs text-slate-400 font-medium">Joined {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : "Recently"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-sm font-bold text-slate-700">{member.wing || "W"} - {member.flatNumber || "000"}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                            <Mail className="w-3.5 h-3.5" />
                            {member.email}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                            <Phone className="w-3.5 h-3.5" />
                            {member.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-center">
                          <span className={cn(
                            "px-3 py-1.5 rounded-full text-[10px] font-bold border",
                            member.status === 'APPROVED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                            member.status === 'PENDING' ? "bg-amber-50 text-amber-600 border-amber-100" :
                            "bg-rose-50 text-rose-600 border-rose-100"
                          )}>
                            {member.status || "UNKNOWN"}
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {activeTab === "requests" ? (
                            <>
                              <button 
                                onClick={() => handleApprove(member.id)}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                                title="Approve"
                              >
                                <CheckCircle2 className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleReject(member.id)}
                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                                title="Reject"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                title="Edit Member"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                title="Delete Member"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-10 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center">
                          <Users className="w-10 h-10 text-slate-200" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-slate-900 font-bold">No members found</p>
                          <p className="text-slate-500 text-sm">We couldn&apos;t find any members matching your criteria.</p>
                        </div>
                        <button 
                          onClick={() => {setSearchQuery(""); setActiveTab("all")}}
                          className="text-primary font-bold text-sm hover:underline"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-8 border-t border-slate-50 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-400">
            Showing <span className="text-slate-900">{filteredData?.length || 0}</span> of <span className="text-slate-900">{displayData?.length || 0}</span> members
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(page => (
                <button 
                  key={page}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all",
                    page === 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:bg-slate-50"
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
