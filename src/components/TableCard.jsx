import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addHours } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";

function bookTable(amount, date, tableNumber, booking) {
    if (new Date(date).getHours() < 7 || new Date(date).getHours() >= 23) {
        toast.error("Table can be only booked from 7:00 AM to 10:30 PM!");
        return;
    }

    const req = {
        amount: amount,
        startTime: date.slice(0, -1),
        endTime: addHours(new Date(date), 3).toISOString().slice(0, -1),
        bookingID: booking,
        tableNumber: tableNumber,
    };
    console.log(req);

    fetch("http://localhost:8080/api/table-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
    })
        .then(() => toast.success("Booked table successfully!"))
        .catch((err) => {
            console.error(err);
            toast.error("Table is already booked at this time!");
        });
}

export default function TableCard({ table, bookings }) {
    const [value, setValue] = useState(`${bookings[0].id}`);

    return (
        <Card className="w-[21em] h-fit">
            <CardHeader>
                <CardTitle>Table {table.tableNumber}</CardTitle>
                <CardDescription>For {table.capacity} people</CardDescription>
                <CardAction>
                    <Button
                        onClick={() => {
                            bookTable(
                                table.amount,
                                JSON.parse(localStorage.getItem("date")),
                                table.tableNumber,
                                Number(value),
                            );
                        }}
                    >
                        Book Table
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Label htmlFor={table.tableNumber} className="mb-2">
                    Select Booking:
                </Label>
                <Select
                    id={table.tableNumber}
                    value={value}
                    onValueChange={(value) => {
                        setValue(value);
                    }}
                >
                    <SelectTrigger className="w-full !bg-white !bg-white border-2 !border-sky-200 !font-normal">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {bookings.map((booking) => (
                            <SelectItem
                                key={`${booking.id}`}
                                value={`${booking.id}`}
                            >
                                {`Room ${booking.roomNo}, ${new Date(booking.start).toLocaleDateString()} - ${new Date(booking.end).toLocaleDateString()}`}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    );
}
