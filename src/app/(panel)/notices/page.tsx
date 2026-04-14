"use client";

import React from "react";
import { Plus, Search, Calendar, User, Eye, Edit2, Trash2 } from "lucide-react";

export default function NoticesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notice Board</h1>
          <p className="text-slate-500 text-sm">Announcements and important updates for residents.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" />
          <span>Create Notice</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-soft flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search notices by title or content..." className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/20">
            <option>All Categories</option>
            <option>Maintenance</option>
            <option>Event</option>
            <option>Security</option>
            <option>General</option>
          </select>
        </div>
      </div>

      {/* Notices List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                Maintenance
              </span>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">Emergency Power Cut Scheduled</h3>
            <p className="text-slate-500 text-sm line-clamp-2 mb-6">
              Please be informed that there will be a scheduled power cut for maintenance from 10:00 AM to 2:00 PM on Sunday, 20th April.
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>14 Apr, 2024</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <User className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-300">#N-102{i}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
