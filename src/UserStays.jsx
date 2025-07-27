import { useEffect, useState } from "react";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function UserStays() {
    const [stays, setStays] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/past`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((stays) => {
                setStays(stays);
                setLoaded(true);
            })
            .catch((err) => setErr(err));
    }, []);

    if (err != null) {
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

    return (
        <div className="min-h-screen relative pt-20 w-screen flex flex-col gap-10">
            <div className="grid justify-items-center gap-4">
                <h2 className="text-2xl font-medium w-full max-w-[47rem] pl-15 pr-15">
                    Past Stays
                </h2>
                <div className="w-screen flex flex-wrap flex-cols justify-center max-w-200">
                    {stays == null || stays.length <= 0 ? (
                        <Card className="w-full max-w-[40em] ml-15 mr-15 h-[7em] flex justify-center">
                            <CardHeader>
                                <CardTitle className="text-xl text-center">
                                    No past bookings!
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    ) : (
                        ""
                    )}
                    {stays.map((stay) => (
                        <Card
                            className="max-w-[40em] w-full mr-15 ml-15 mb-4"
                            key={stay.id}
                        >
                            <CardHeader>
                                <CardTitle>Room {stay.roomNo}</CardTitle>
                                <CardDescription>
                                    From{" "}
                                    {new Date(stay.start).toLocaleDateString()}
                                    <br />
                                    To {new Date(stay.end).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
