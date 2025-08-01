import { useEffect, useState } from "react";

import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { MdCancel } from "react-icons/md";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function UserBookings() {
    const [current, setCurrent] = useState(null);
    const [upcoming, setUpcoming] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [err, setErr] = useState(null);

    function deleteBooking(id) {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/booking/${id}`, {
            credentials: "include",
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((upcoming) => setUpcoming(upcoming));
    }

    useEffect(() => {
        Promise.all([
            fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/current`, {
                credentials: "include",
            }).then((res) => res.json()),

            fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/upcoming`, {
                credentials: "include",
            }).then((res) => res.json()),
        ])
            .then(([current, upcoming]) => {
                setCurrent(current);
                setUpcoming(upcoming);
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
                    Current Bookings:
                </h2>
                <div className="w-screen flex flex-wrap flex-cols justify-center">
                    {current == null || current.length <= 0 ? (
                        <Card className="w-full max-w-[40em] ml-15 mr-15 h-[7em] flex justify-center">
                            <CardHeader>
                                <CardTitle className="text-xl text-center">
                                    No current bookings!
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    ) : (
                        ""
                    )}
                    {current.map((currentItem) => (
                        <Card
                            className="max-w-[40em] w-full mr-15 ml-15 mb-4"
                            key={currentItem.id}
                        >
                            <CardHeader>
                                <CardTitle>Room {currentItem.roomNo}</CardTitle>
                                <CardDescription>
                                    From{" "}
                                    {new Date(
                                        currentItem.start,
                                    ).toLocaleDateString()}
                                    <br />
                                    To{" "}
                                    {new Date(
                                        currentItem.end,
                                    ).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="grid justify-items-center gap-4">
                <h2 className="text-2xl font-medium w-full max-w-[47rem] pl-15 pr-15">
                    Upcoming Bookings:
                </h2>
                <div className="w-screen flex flex-wrap flex-cols justify-center">
                    {upcoming == null || upcoming.length <= 0 ? (
                        <Card className="w-full max-w-[40em] ml-15 mr-15 h-[7em] flex justify-center">
                            <CardHeader>
                                <CardTitle className="text-xl text-center">
                                    No upcoming bookings!
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    ) : (
                        ""
                    )}
                    {upcoming.map((upcomingItem) => (
                        <Card
                            className="max-w-[40em] w-full mr-15 ml-15 mb-4"
                            key={upcomingItem.id}
                        >
                            <CardHeader>
                                <CardTitle>
                                    Room {upcomingItem.roomNo}
                                </CardTitle>
                                <CardDescription>
                                    From{" "}
                                    {new Date(
                                        upcomingItem.start,
                                    ).toLocaleDateString()}
                                    <br />
                                    To{" "}
                                    {new Date(
                                        upcomingItem.end,
                                    ).toLocaleDateString()}
                                </CardDescription>
                                <CardAction>
                                    <AlertDialog>
                                        <AlertDialogTrigger className="text-white !bg-red-600">
                                            Cancel{" "}
                                            <MdCancel className="inline" />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will delete your
                                                    booking along with all your
                                                    reservations! You will be
                                                    refunded only 60% of your
                                                    Booking fees!
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="text-white hover:text-white">
                                                    No!
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="!bg-red-600"
                                                    onClick={() =>
                                                        deleteBooking(
                                                            upcomingItem.id,
                                                        )
                                                    }
                                                >
                                                    Yes! I'm sure!
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </CardAction>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
