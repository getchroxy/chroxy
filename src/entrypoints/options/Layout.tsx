import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router";

const Layout: React.FC = () => {
  // return <h1>Hello</h1>;
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="bg-sidebar flex h-16 items-center gap-1 p-1">
          <SidebarTrigger />
          <h1
            id="subtitle"
            className="plex-1 text-lg font-semibold text-slate-900"
          >
            Chroxy
          </h1>
        </div>
        <div className="p-3">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
