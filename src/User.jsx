import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";

import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function User({ user }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <SidebarProvider
                open={open}
                onOpenChange={setOpen}
                className="absolute"
            >
                <AppSidebar />
                <main>
                    <SidebarTrigger className="text-white hover:text-white/70 ml-2 fixed z-50 top-15" />
                </main>
            </SidebarProvider>
            <Outlet context={{ user }} />
        </div>
    );
}
