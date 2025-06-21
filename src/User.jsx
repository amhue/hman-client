import { useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

export default function User({ user }) {
    const [open, setOpen] = useState(false);

    const params = useParams();

    const [userFromId, setUserFromId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${params.id}`)
            .then((res) => res.json())
            .then((userFromId) => {
                setUserFromId(userFromId);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    if (loading) {
        return <div className="text-lg h-screen pt-18">Loading...</div>;
    }

    return (
        <>
            <Outlet context={{ user, userFromId }} />
            {user && user.id && user.id === userFromId.id ? (
                <SidebarProvider
                    className="mt-15"
                    open={open}
                    onOpenChange={setOpen}
                >
                    <AppSidebar />
                    <main>
                        <SidebarTrigger className="text-white hover:text-white/70 fixed ml-2 top-15" />
                    </main>
                </SidebarProvider>
            ) : (
                ""
            )}
        </>
    );
}
