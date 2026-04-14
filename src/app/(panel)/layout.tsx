"use client";

import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import BottomNav from "@/components/dashboard/bottom-nav";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col pl-0 lg:pl-72 transition-all duration-300">
        <Header />
        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8 animate-in fade-in duration-500">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

