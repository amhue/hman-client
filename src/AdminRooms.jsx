import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";
import AddRoomDialog from "./components/AddRoomDialog";

export default function () {
    const [rooms, setRooms] = useState([]);
    const [selectValue, setSelectValue] = useState(null);
    const [inputValue, setInputValue] = useState("");

    async function getRooms(occupied = null, roomNo = null) {
        const params = new URLSearchParams();

        if (occupied !== null) {
            params.append("occupied", occupied);
        }
        if (roomNo != null) {
            params.append("roomNo", roomNo);
        }

        setRooms(
            await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/admin/rooms?${params.toString()}`,
                {
                    credentials: "include",
                },
            ).then((res) => res.json()),
        );
    }

    useEffect(() => {
        getRooms();
    }, []);

    return (
        <div className="relative min-h-screen pt-6">
            <h1 className="w-screen text-center !text-4xl font-medium mb-6">
                Room Management
            </h1>
            <div className="flex flex-col items-center justify-center">
                <Card className="ml-12 mr-12 p-2 w-full max-w-180">
                    <div className="w-full flex justify-around gap-[1%] flex-wrap">
                        <Input
                            type="text"
                            inputMode="numeric"
                            pattern="\d*"
                            placeholder="Search Rooms..."
                            className="min-w-[25%] w-fit"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                            }}
                        />
                        <Select onValueChange={setSelectValue}>
                            <SelectTrigger className="min-w-[25%] w-fit">
                                <SelectValue placeholder="Occupancy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="occupied">
                                    Occupied
                                </SelectItem>
                                <SelectItem value="unoccupied">
                                    Unoccupied
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={() =>
                                getRooms(
                                    selectValue === null
                                        ? null
                                        : selectValue == "occupied"
                                          ? true
                                          : false,
                                    inputValue,
                                )
                            }
                        >
                            Search <IoMdSearch />
                        </Button>
                        <AddRoomDialog />
                    </div>
                </Card>
                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[25%]">
                                Room Number
                            </TableHead>
                            <TableHead className="w-[25%]">Room Type</TableHead>
                            <TableHead className="w-[25%]">Occupied</TableHead>
                            <TableHead className="w-[25%]">Bookings</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rooms.map((room) => (
                            <TableRow key={room.roomNo}>
                                <TableCell>{room.roomNo}</TableCell>
                                <TableCell>{room.roomType}</TableCell>
                                <TableCell>
                                    {room.occupied ? "Yes" : "No"}
                                </TableCell>
                                <TableCell>{room.bookings}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
