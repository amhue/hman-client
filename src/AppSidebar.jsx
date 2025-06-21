import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
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

const items = [
    {
        title: "Dashboard",
        icon: MdDashboard,
    },
    {
        title: "Bookings",
        icon: MdNightsStay,
    },
    {
        title: "Your Reservations",
        icon: IoIosRestaurant,
    },
    {
        title: "Payments",
        icon: MdOutlinePayment,
    },
    {
        title: "Previous Stays",
        icon: IoTimer,
    },
    {
        title: "Settings",
        icon: IoIosSettings,
    },
];

const footer = [{ title: "Logout", icon: CgLogOut }];

export default function AppSidebar() {
    return (
        <Sidebar className="mt-13 z-0">
            <SidebarContent className="bg-black/95">
                <SidebarGroupLabel className="text-white text-lg pt-2 mb-2 ml-2 hidden">
                    Hotel
                </SidebarGroupLabel>
                <SidebarGroupContent className="mt-3">
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton>
                                    <item.icon className="text-white" />
                                    <span className="text-white">
                                        {item.title}
                                    </span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>
            <SidebarFooter className="bg-black/95 pb-16 pl-0 pr-0">
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
