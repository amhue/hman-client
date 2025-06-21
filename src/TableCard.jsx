import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
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
import { useState } from "react";
import { Label } from "@/components/ui/label";
import DatePicker from "react-datepicker";

export default function TableCard({ table, bookings }) {
    const [value, setValue] = useState(
        `${bookings[0].roomNo}${bookings[0].start}${bookings[0].end}`,
    );

    return (
        <Card className="w-[23em] h-fit">
            <CardHeader>
                <CardTitle>Table {table.tableNumber}</CardTitle>
                <CardDescription>For {table.capacity} people</CardDescription>
                <CardAction>
                    <Button>Book Table</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Label htmlFor={table.tableNumber} className="mb-2">
                    Select Booking:
                </Label>
                <Select
                    id={table.tableNumber}
                    value={value}
                    onValueChange={(value) => setValue(value)}
                >
                    <SelectTrigger className="w-full !bg-white !bg-white border-2 !border-sky-200 !font-normal">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {bookings.map((booking) => (
                            <SelectItem
                                key={`${booking.roomNo}${booking.start}${booking.end}`}
                                value={`${booking.roomNo}${booking.start}${booking.end}`}
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
