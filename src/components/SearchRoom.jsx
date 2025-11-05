import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";

export default function SearchRoom() {
    const [roomType, setRoomType] = useState("DELUXE");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(addDays(new Date(), 1));

    return (
        <div className="mb-[1em] flex gap-5 flex-wrap justify-center">
            <span>
                <Label htmlFor="start" className="p-1">
                    Check-in:
                </Label>
                <DatePicker
                    id="start"
                    className="mb-2 border-solid border-2 rounded-md mr-2 w-33"
                    showIcon
                    selected={start}
                    minDate={new Date()}
                    onChange={(start) => setStart(start)}
                    dateFormat={"dd/MM/yyyy"}
                />
            </span>
            <span>
                <Label htmlFor="end" className="p-1">
                    Check-out:
                </Label>
                <DatePicker
                    id="end"
                    className="mb-2 border-solid border-2 rounded-md w-33"
                    showIcon
                    selected={end}
                    minDate={Math.max(new Date(), addDays(start, 1))}
                    onChange={(end) => setEnd(end)}
                    dateFormat={"dd/MM/yyyy"}
                />
            </span>
            <span>
                <Label htmlFor="room-type" className="p-1">
                    Room Type:
                </Label>
                <Select
                    id="room-type"
                    value={roomType}
                    onValueChange={(roomType) => setRoomType(roomType)}
                >
                    <SelectTrigger className="w-[180px] !bg-[var(--background)] !border-[var(--border)] !border-2">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="DELUXE">Deluxe</SelectItem>
                        <SelectItem value="DOUBLE">Double</SelectItem>
                        <SelectItem value="SINGLE">Single</SelectItem>
                    </SelectContent>
                </Select>
            </span>
            <span>
                <Button className="mt-[calc(1rem+5px)]">
                    <Link
                        className="!text-white flex gap-1"
                        to={`/book/${start.toISOString().substring(0, 10)}/${end.toISOString().substring(0, 10)}/${roomType}`}
                    >
                        <span>Find</span>
                        <IoMdSearch className="relative top-[3px]" />
                    </Link>
                </Button>
            </span>
        </div>
    );
}
