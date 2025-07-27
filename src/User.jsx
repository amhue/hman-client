import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";

import { FaUsers } from "react-icons/fa";
import { IoIosRestaurant, IoIosSettings } from "react-icons/io";
import { IoTimer } from "react-icons/io5";
import {
    MdDashboard,
    MdHouseSiding,
    MdNightsStay,
    MdOutlinePayment,
} from "react-icons/md";
import { PiPicnicTableBold } from "react-icons/pi";

import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function User({ user }) {
    const [open, setOpen] = useState(false);

    const items =
        user.mgmt == false
            ? [
                  {
                      title: "Bookings",
                      icon: MdNightsStay,
                      link: "",
                  },
                  {
                      title: "Your Reservations",
                      icon: IoIosRestaurant,
                      link: "table",
                  },
                  {
                      title: "Payments",
                      icon: MdOutlinePayment,
                      link: "payments",
                  },
                  {
                      title: "Previous Stays",
                      icon: IoTimer,
                      link: "stays",
                  },
                  {
                      title: "Settings",
                      icon: IoIosSettings,
                      link: "settings",
                  },
              ]
            : [
                  {
                      title: "Users",
                      link: "",
                      icon: FaUsers,
                  },
                  {
                      title: "Rooms",
                      icon: MdHouseSiding,
                      link: "rooms",
                  },
                  {
                      title: "Tables",
                      icon: PiPicnicTableBold,
                      link: "tables",
                  },
              ];
    return (
        <div>
            <SidebarProvider
                open={open}
                onOpenChange={setOpen}
                className="absolute"
            >
                <AppSidebar items={items} user={user} />
                <main>
                    <SidebarTrigger
                        className={`text-white hover:text-white/70 ml-2 fixed z-50 ${user.mgmt ? "top-3" : "top-15"}`}
                    />
                </main>
            </SidebarProvider>
            <Outlet context={{ user }} />
        </div>
    );
}
