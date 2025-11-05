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

export default function RoomManagement() {
    const [rooms, setRooms] = useState([]);
    const [selectValue, setSelectValue] = useState(null);
    const [inputValue, setInputValue] = useState("");

    async function getRooms(occupied = null, roomNo = null) {
        const params = new URLSearchParams();
        if (occupied !== null) params.append("occupied", occupied);
        if (roomNo) params.append("roomNo", roomNo);

        const data = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/admin/rooms?${params.toString()}`,
            { credentials: "include" },
        ).then((res) => res.json());

        setRooms(data);
    }

    useEffect(() => {
        getRooms();
    }, []);

    return (
        <div className="min-h-screen p-8 w-screen">
            <h1 className="text-center text-4xl font-semibold tracking-tight mb-8 text-gray-800 dark:text-gray-100">
                Room Management
            </h1>

            <Card className="mx-auto max-w-5xl p-6 shadow-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/80 backdrop-blur">
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mb-4">
                    <Input
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        placeholder="Search by Room Number..."
                        className="min-w-[240px] md:w-1/4"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />

                    <Select onValueChange={setSelectValue}>
                        <SelectTrigger className="min-w-[180px]">
                            <SelectValue placeholder="Select Occupancy" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="occupied">Occupied</SelectItem>
                            <SelectItem value="unoccupied">Unoccupied</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        onClick={() =>
                            getRooms(
                                selectValue === null
                                    ? null
                                    : selectValue === "occupied",
                                inputValue,
                            )
                        }
                        className="flex items-center gap-2"
                    >
                        <IoMdSearch className="text-lg" />
                        Search
                    </Button>

                    <AddRoomDialog />
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 mt-6">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100 dark:bg-gray-800">
                                <TableHead className="w-[25%] font-semibold">
                                    Room Number
                                </TableHead>
                                <TableHead className="w-[25%] font-semibold">
                                    Room Type
                                </TableHead>
                                <TableHead className="w-[25%] font-semibold">
                                    Occupied
                                </TableHead>
                                <TableHead className="w-[25%] font-semibold">
                                    Bookings
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rooms.length > 0 ? (
                                rooms.map((room) => (
                                    <TableRow
                                        key={room.roomNo}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                                    >
                                        <TableCell>{room.roomNo}</TableCell>
                                        <TableCell>{room.roomType}</TableCell>
                                        <TableCell>
                                            {room.occupied ? (
                                                <span className="text-green-600 font-medium">
                                                    Yes
                                                </span>
                                            ) : (
                                                <span className="text-red-500 font-medium">
                                                    No
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>{room.bookings}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center py-6 text-gray-500 dark:text-gray-400"
                                    >
                                        No rooms found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
