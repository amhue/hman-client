import { useState } from "react";
import DatePicker from "react-datepicker";

import { toast } from "react-toastify";

import { addDays, isWithinInterval } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import deluxeRoomImg from "../assets/deluxe.jpg";
import doubleRoomImg from "../assets/double.jpg";
import singleRoomImg from "../assets/single.png";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import Payment from "./Payment";

export default function BookCard({ el, user, bookedIntervals }) {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(addDays(new Date(), 1));
    const [booked, setBooked] = useState(bookedIntervals);

    // Calculate price based on room type
    const price =
        el.roomType === "DELUXE"
            ? 2500
            : el.roomType === "DOUBLE"
              ? 1500
              : 1000;

    function bookRoom(room, start, end) {
        if (start >= end) {
            toast.error("Check-in date should be before check-out!");
            return;
        } else if (
            (() => {
                for (const e of booked) {
                    if (
                        isWithinInterval(start, {
                            start: e.start,
                            end: e.end,
                        }) ||
                        isWithinInterval(end, { start: e.start, end: e.end }) ||
                        (start <= e.start && end >= e.end)
                    ) {
                        return true;
                    }
                }
                return false;
            })()
        ) {
            toast.error("The room is already booked on these days!");
            return;
        } else {
            const req = {
                userID: user.id,
                roomNo: room.roomNumber,
                start: start.toISOString(),
                end: end.toISOString(),
            };

            fetch(`${import.meta.env.VITE_SERVER_URL}/api/booking`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req),
            })
                .then((res) => {
                    if (!res.ok) {
                        console.error("Error: ", res.statusText);
                        toast.error("Failed to book room.");
                        return;
                    }
                    toast.dismiss();
                    toast.success("Booked room successfully!");
                    setBooked([...booked, { start, end }]);
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("The room is already booked on these days!");
                });
        }
    }

    return (
        <Card className="w-[26vw] max-w-[20em] mb-[2em] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center gap-3">
                <img
                    className="rounded-md object-cover w-full h-36"
                    src={
                        el.roomType === "SINGLE"
                            ? singleRoomImg
                            : el.roomType === "DOUBLE"
                              ? doubleRoomImg
                              : el.roomType === "DELUXE"
                                ? deluxeRoomImg
                                : null
                    }
                    alt={`${el.roomType} room`}
                />
                <CardTitle className="text-lg font-semibold">
                    Room {el.roomNumber}
                </CardTitle>
                <p className="text-sm text-gray-600">{el.roomType} Room</p>
                <p className="text-md font-semibold mt-1">₹{price} / night</p>
            </CardHeader>
            <CardContent>
                <Dialog>
                    <DialogTrigger className="btn-primary w-full text-center py-2 rounded-md cursor-pointer">
                        Book Now
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Book Room {el.roomNumber}</DialogTitle>
                            <DialogDescription className="mt-4 space-y-4">
                                <div>
                                    <Label
                                        htmlFor={`${el.roomNumber}start`}
                                        className="mb-1 block font-medium"
                                    >
                                        Check-in
                                    </Label>
                                    <DatePicker
                                        id={`${el.roomNumber}start`}
                                        selected={start}
                                        minDate={new Date()}
                                        onChange={(date) => setStart(date)}
                                        dateFormat={"dd/MM/yyyy"}
                                        excludeDateIntervals={booked}
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        placeholderText={new Date().toLocaleDateString(
                                            "en-UK",
                                        )}
                                        showPopperArrow={false}
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor={`${el.roomNumber}end`}
                                        className="mb-1 block font-medium"
                                    >
                                        Check-out
                                    </Label>
                                    <DatePicker
                                        id={`${el.roomNumber}end`}
                                        selected={end}
                                        minDate={addDays(start, 1)}
                                        onChange={(date) => setEnd(date)}
                                        dateFormat={"dd/MM/yyyy"}
                                        excludeDateIntervals={booked}
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        placeholderText={addDays(
                                            new Date(),
                                            1,
                                        ).toLocaleDateString("en-UK")}
                                        showPopperArrow={false}
                                    />
                                </div>

                                {/* Payment / Login button separated on its own line */}
                                <div className="mt-6">
                                    {user && user.id ? (
                                        <Payment
                                            amount={price * 100}
                                            className="w-full max-w-xs block mx-auto"
                                            callback={() =>
                                                bookRoom(el, start, end)
                                            }
                                        />
                                    ) : (
                                        <Link
                                            to="/login"
                                            className="w-full max-w-xs block mx-auto text-center bg-indigo-600 py-2 rounded hover:bg-indigo-700 transition"
                                        >
                                            Login to Book
                                        </Link>
                                    )}
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
