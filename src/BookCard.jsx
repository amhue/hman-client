import { useState } from "react";
import DatePicker from "react-datepicker";

import { toast } from "react-toastify";

import "react-datepicker/dist/react-datepicker.css";
import { addDays, isWithinInterval } from "date-fns";
import singleRoomImg from "./assets/single.png";
import doubleRoomImg from "./assets/double.jpg";
import deluxeRoomImg from "./assets/deluxe.jpg";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
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

export default function BookCard({ el, user, bookedIntervals }) {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(addDays(new Date(), 1));
    const [booked, setBooked] = useState(bookedIntervals);

    function bookRoom(room, start, end) {
        if (start >= end) {
            toast.error("Check-in date should be before check-out!", {});
            return;
        } else if (
            (() => {
                booked.forEach((e) => {
                    if (
                        isWithinInterval(start, e) ||
                        isWithinInterval(end, e)
                    ) {
                        return true;
                    }
                });
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

            fetch("http://localhost:8080/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req),
            })
                .then((res) => {
                    if (!res.ok) {
                        console.error("Error: ", res.statusText);
                    }
                    toast.dismiss();
                    toast.success("Booked room successfully!");
                    setBooked([...booked, { start: start, end: end }]);
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("The room is already booked on these days!");
                });
        }
    }

    return (
        <>
            <Card className="w-[26vw] max-w-[20em] mb-[2em]">
                <CardHeader>
                    <img
                        className="rounded-md"
                        src={
                            el.roomType === "SINGLE"
                                ? singleRoomImg
                                : el.roomType === "DOUBLE"
                                  ? doubleRoomImg
                                  : el.roomType === "DELUXE"
                                    ? deluxeRoomImg
                                    : null
                        }
                    />
                    <CardTitle className="mt-2">Room {el.roomNumber}</CardTitle>
                    <p>{el.roomType} Room</p>
                </CardHeader>
                <CardContent>
                    <Dialog>
                        <DialogTrigger className="text-white">
                            Book
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="mb-4">
                                    Room {el.roomNumber}
                                </DialogTitle>
                                <DialogDescription>
                                    <Label
                                        htmlFor={`${el.roomNumber}start`}
                                        className="mb-1"
                                    >
                                        Check-in
                                    </Label>
                                    <DatePicker
                                        className="mb-2 border-solid border-2 rounded-md"
                                        id={`${el.roomNumber}start`}
                                        showIcon
                                        selected={start}
                                        minDate={new Date()}
                                        onChange={(start) => setStart(start)}
                                        dateFormat={"dd/MM/yyyy"}
                                        excludeDateIntervals={booked}
                                        placeholderText={`${new Date().toLocaleDateString(
                                            "en-UK",
                                        )}`}
                                    />
                                    <Label
                                        htmlFor={`${el.roomNumber}end`}
                                        className="mb-1"
                                    >
                                        Check-out
                                    </Label>
                                    <DatePicker
                                        className="mb-2 border-solid border-2 rounded-md"
                                        id={`${el.roomNumber}end`}
                                        showIcon
                                        selected={end}
                                        minDate={Math.max(
                                            new Date(),
                                            addDays(start, 1),
                                        )}
                                        placeholderText={`${addDays(
                                            new Date(),
                                            1,
                                        ).toLocaleDateString("en-UK")}`}
                                        onChange={(end) => setEnd(end)}
                                        dateFormat={"dd/MM/yyyy"}
                                        excludeDateIntervals={booked}
                                    />
                                </DialogDescription>
                                <Link
                                    className="!text-white"
                                    to={
                                        user == null || user.id == null
                                            ? "/login"
                                            : ""
                                    }
                                >
                                    <Button
                                        className="w-20"
                                        onClick={
                                            user != null && user.id != null
                                                ? () => bookRoom(el, start, end)
                                                : () => {}
                                        }
                                    >
                                        Book
                                    </Button>
                                </Link>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </>
    );
}
