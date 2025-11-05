import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function UserTables() {
    const [tables, setTables] = useState(null);
    const [_, setBookings] = useState(null);
    const [err, setErr] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/tables`, {
                credentials: "include",
            }).then((res) => res.json()),
            fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/current`, {
                credentials: "include",
            }).then((res) => res.json()),
            fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/upcoming`, {
                credentials: "include",
            }).then((res) => res.json()),
        ])
            .then(([tables, current, upcoming]) => {
                setTables(tables);
                setBookings([...current, ...upcoming]);
                setLoaded(true);
            })
            .catch((err) => setErr(err));
    }, []);

    if (err) {
        console.error(err);
        return (
            <div className="text-2xl pl-12 pt-14 h-screen text-destructive w-screen">
                Could not load bookings...
            </div>
        );
    }

    if (!loaded) {
        return (
            <div className="h-screen text-2xl pl-12 pt-14 text-muted-foreground w-screen">
                Loading data...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground relative pt-20 flex flex-col gap-10 w-screen">
            <div className="grid justify-items-center gap-4">
                <h2 className="text-2xl font-medium w-full max-w-[47rem] px-14">
                    Current Reservations:
                </h2>
                <div className="flex flex-wrap justify-center w-full">
                    {tables == null || tables.length === 0 ? (
                        <Card className="w-full max-w-[40em] h-[7em] flex justify-center items-center mx-auto">
                            <CardTitle className="text-xl text-center font-bold">
                                No reservations!
                            </CardTitle>
                        </Card>
                    ) : (
                        tables.map((table) => (
                            <Card
                                className="max-w-[40em] w-full mx-4 mb-4"
                                key={table.id}
                            >
                                <CardHeader>
                                    <CardTitle>
                                        Table {table.tableNumber}
                                    </CardTitle>
                                    <CardDescription>
                                        {"At " +
                                            new Date(
                                                table.startTime + "Z",
                                            ).toLocaleString()}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
