import { useEffect, useState } from "react";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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

    if (err != null) {
        console.error(err);
        return (
            <div className="text-2xl pl-13 pt-14 h-screen">
                Could not load bookings...
            </div>
        );
    } else if (loaded !== true) {
        return (
            <div className="h-screen text-2xl pl-13 pt-14">Loading data...</div>
        );
    }

    console.log(tables);

    return (
        <div className="min-h-screen relative pt-20 w-screen flex flex-col gap-10">
            <div className="grid justify-items-center gap-4">
                <h2 className="text-2xl font-medium w-full max-w-[47rem] pl-15 pr-15">
                    Current Reservations:
                </h2>
                <div className="w-screen flex flex-wrap flex-cols justify-center">
                    {tables == null || tables.length <= 0 ? (
                        <Card className="w-full max-w-[40em] ml-15 mr-15 h-[7em] flex justify-center">
                            <CardHeader>
                                <CardTitle className="text-xl text-center">
                                    No reservations!
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    ) : (
                        ""
                    )}
                    {tables.map((table) => (
                        <Card
                            className="max-w-[40em] w-full mr-15 ml-15 mb-4"
                            key={table.id}
                        >
                            <CardHeader>
                                <CardTitle>Table {table.tableNumber}</CardTitle>
                                <CardDescription>
                                    {"At " +
                                        new Date(
                                            table.startTime + "Z",
                                        ).toLocaleString()}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
