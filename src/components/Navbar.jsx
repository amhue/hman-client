import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { IoLogIn } from "react-icons/io5";

export default function Navbar({ user }) {
    const navItems = [
        { label: "Home", href: "/" },
        { label: "Rooms", href: "/book" },
        { label: "Restaurant", href: "/table" },
        { label: "Contact", href: "#contact" },
        // { label: "Item Five" },
    ];

    return (
        <NavigationMenu className="w-screen z-50 fixed top-0">
            <NavigationMenuList className="flex w-screen text-white hover:text-white focus:text-white justify-around bg-black/95 h-13">
                {navItems.map((item) => (
                    <NavigationMenuItem
                        key={item.href}
                        className="text-center duration-300 ease-out hover:bg-white/10 w-full h-full grid !content-center !rounded-xl"
                    >
                        <Link
                            to={item.href}
                            className="!text-white hover:opacity-75 focus:opacity-75 duration-300 ease-out w-full h-full"
                        >
                            {item.label}
                        </Link>
                    </NavigationMenuItem>
                ))}
                <NavigationMenuItem className="text-center duration-300 ease-out hover:bg-white/10 w-full h-full grid !content-center !rounded-xl w-60">
                    <Link
                        title={
                            user !== null && user.id !== null
                                ? user.email
                                : "Login"
                        }
                        className="w-full h-full flex place-items-center justify-center"
                        to={
                            user !== null && user.id != null
                                ? `/user`
                                : "/login"
                        }
                    >
                        {user !== null && user.id != null ? (
                            <UserCircle className="text-white" />
                        ) : (
                            <IoLogIn className="text-white" size="30" />
                        )}
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
