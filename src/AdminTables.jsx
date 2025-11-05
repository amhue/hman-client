import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AddTableDialog from "@/components/AddTableDialog";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

export default function AdminTables() {
    const [tables, setTables] = useState([]);
    const [input, setInput] = useState("");
    const [select, setSelect] = useState(null);

    async function getTables(occupied = null, tableNumber = null) {
        const params = new URLSearchParams();
        if (occupied !== null) params.append("occupied", occupied);
        if (tableNumber !== null && tableNumber !== "")
            params.append("tableNo", tableNumber);

        const res = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/admin/tables?${params}`,
            {
                credentials: "include",
            },
        ).then((res) => res.json());
        setTables(res);
    }

    useEffect(() => {
        getTables();
    }, []);

    return (
        <div className="min-h-screen w-screen py-8">
            <h1 className="text-center text-4xl font-semibold tracking-tight mb-8 text-gray-800 dark:text-gray-100">
                Tables Management
            </h1>

            <Card className="w-[95vw] mx-auto p-6 shadow-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/80 backdrop-blur">
                {/* Search & Add Controls */}
                <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 mb-6">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        placeholder="Search by Table Number..."
                        className="w-64 md:w-80"
                    />
                    <Select onValueChange={setSelect}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Occupancy" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="occupied">Occupied</SelectItem>
                            <SelectItem value="unoccupied">
                                Unoccupied
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        onClick={() =>
                            getTables(
                                select === null
                                    ? null
                                    : select === "occupied"
                                    ? true
                                    : false,
                                input,
                            )
                        }
                        className="flex items-center gap-2"
                    >
                        <IoMdSearch className="text-lg" />
                        Search
                    </Button>

                    <AddTableDialog />
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow className="bg-gray-100 dark:bg-gray-800">
                                <TableHead className="font-semibold w-[20%]">
                                    Table Number
                                </TableHead>
                                <TableHead className="font-semibold w-[20%]">
                                    Capacity
                                </TableHead>
                                <TableHead className="font-semibold w-[20%]">
                                    Amount
                                </TableHead>
                                <TableHead className="font-semibold w-[20%]">
                                    Occupied
                                </TableHead>
                                <TableHead className="font-semibold w-[20%]">
                                    Bookings
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {tables.length > 0 ? (
                                tables.map((table) => (
                                    <TableRow
                                        key={table.tableNo}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                                    >
                                        <TableCell>{table.tableNo}</TableCell>
                                        <TableCell>
                                            {table.tableCapacity}
                                        </TableCell>
                                        <TableCell>{table.amount}</TableCell>
                                        <TableCell>
                                            {table.occupied ? (
                                                <span className="text-green-600 font-medium">
                                                    Yes
                                                </span>
                                            ) : (
                                                <span className="text-red-500 font-medium">
                                                    No
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>{table.bookings}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center py-6 text-gray-500 dark:text-gray-400"
                                    >
                                        No tables found
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
