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

import { CgLogOut } from "react-icons/cg";
import { Link } from "react-router-dom";

const footer = [{ title: "Logout", icon: CgLogOut }];

export default function AppSidebar({ items, user }) {
    return (
        <Sidebar className={user.mgmt ? "" : "mt-13"}>
            <SidebarContent className="bg-black/95">
                <SidebarGroupLabel
                    className={`text-white text-lg pt-2 ml-2 ${user.mgmt ? "" : "hidden mb-2"}`}
                >
                    Hotel Grand Oasis
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
            <SidebarFooter
                className={`bg-black/95 pb-3 pl-0 pr-0 ${user.mgmt ? "" : "min-[766px]:pb-16"}`}
            >
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
