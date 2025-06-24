import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { IoIosSettings, IoIosRestaurant } from "react-icons/io";
import { MdDashboard, MdOutlinePayment, MdNightsStay } from "react-icons/md";
import { IoTimer } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { Link } from "react-router-dom";

const items = [
    {
        title: "Dashboard",
        icon: MdDashboard,
        link: "",
    },
    {
        title: "Bookings",
        icon: MdNightsStay,
        link: "bookings",
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
];

const footer = [{ title: "Logout", icon: CgLogOut }];

export default function AppSidebar() {
    return (
        <Sidebar className="mt-13">
            <SidebarContent className="bg-black/95">
                <SidebarGroupLabel className="text-white text-lg pt-2 mb-2 ml-2 hidden">
                    Hotel
                </SidebarGroupLabel>
                <SidebarGroupContent className="mt-3">
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton>
                                    <Link to={item.link} className="flex gap-1">
                                        <item.icon className="text-white mt-1" />
                                        <span className="text-white">
                                            {item.title}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>
            <SidebarFooter className="bg-black/95 min-[766px]:pb-16 pb-3 pl-0 pr-0">
                <SidebarMenu>
                    {footer.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                onClick={() => {
                                    fetch("http://localhost:8080/logout", {
                                        method: "POST",
                                        credentials: "include",
                                    }).then(() => (window.location.href = "/"));
                                }}
                            >
                                <item.icon className="text-white" />
                                <span className="text-white">{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
