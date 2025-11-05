import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { UserCircle } from "lucide-react";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../assets/icon_sm.png";

export default function Navbar({ user }) {
    const navItems = [
        { label: "Home", href: "/" },
        { label: "Rooms", href: "/book" },
        { label: "Restaurant", href: "/table" },
    ];

    return (
        <NavigationMenu
            className="w-screen fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md shadow-md"
        >
            <div className="w-screen mx-auto px-6">
                <NavigationMenuList className="flex items-center justify-between h-13 text-white">
                    {/* Logo */}
                    <NavigationMenuItem className="flex-shrink-0">
                        <Link
                            to="/"
                            title="Grand Oasis"
                            className="!text-white flex items-center gap-3"
                        >
                            <img
                                src={logo}
                                alt="Grand Oasis Logo"
                                className="w-10 h-10 rounded-3xl"
                            />
                            <span className="font-semibold text-xl select-none">
                                Grand Oasis
                            </span>
                        </Link>
                    </NavigationMenuItem>

                    {/* Navigation Links */}
                    <nav className="flex space-x-8 flex-grow justify-center">
                        {navItems.map((item) => (
                            <NavigationMenuItem key={item.href}>
                                <Link
                                    to={item.href}
                                    className="!text-white px-3 py-2 rounded-md hover:bg-white/20 transition-colors duration-300"
                                >
                                    {item.label}
                                </Link>
                            </NavigationMenuItem>
                        ))}
                        <NavigationMenuItem>
                            <a
                                href="#contact"
                                className="!text-white px-3 py-2 rounded-md hover:bg-white/20 transition-colors duration-300"
                            >
                                Contacts
                            </a>
                        </NavigationMenuItem>
                    </nav>

                    {/* User/Login */}
                    <NavigationMenuItem className="flex-shrink-0">
                        <Link
                            to={user && user.id ? "/user" : "/login"}
                            title={user && user.email ? user.email : "Login"}
                            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/20 transition-colors duration-300"
                        >
                            {user && user.id ? (
                                <UserCircle className="w-8 h-8 text-white" />
                            ) : (
                                <IoLogIn className="w-8 h-8 text-white" />
                            )}
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </div>
        </NavigationMenu>
    );
}
