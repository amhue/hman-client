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
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import AddTableDialog from "@/components/AddTableDialog";

export default function AdminTables() {
    const [tables, setTables] = useState([]);
    const [input, setInput] = useState("");
    const [select, setSelect] = useState(null);

    async function getTables(occupied = null, tableNumber = null) {
        const params = new URLSearchParams();

        if (occupied !== null) {
            params.append("occupied", occupied);
        }
        if (tableNumber !== null) {
            params.append("tableNo", tableNumber);
        }

        const res = await fetch(
            `http://localhost:8080/api/admin/tables?${params}`,
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
        <div className="relative min-h-screen pt-6">
            <h1 className="w-screen text-center !text-4xl font-medium mb-6">
                Tables Management
            </h1>
            <div className="flex flex-col items-center justify-center">
                <Card className="ml-12 mr-12 p-2 w-full max-w-180">
                    <div className="w-full flex justify-around gap-[1%] flex-wrap">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type="text"
                            inputMode="numeric"
                            pattern="\d*"
                            placeholder="Search Tables..."
                            className="min-w-[25%] w-fit"
                        />
                        <Select
                            onValueChange={setSelect}
                            className="min-w-[25%] w-fit"
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Occupancy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="occupied">
                                    Occupied
                                </SelectItem>
                                <SelectItem value="unoccpied">
                                    Unoccupied
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={() =>
                                getTables(
                                    select === "occupied" ? true : false,
                                    input,
                                )
                            }
                        >
                            Search <IoMdSearch />
                        </Button>
                        <AddTableDialog />
                    </div>
                </Card>
                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[20%]">
                                Table Number
                            </TableHead>
                            <TableHead className="w-[20%]">
                                Table Capacity
                            </TableHead>
                            <TableHead className="w-[20%]">Amount</TableHead>
                            <TableHead className="w-[20%]">
                                Booked Today
                            </TableHead>
                            <TableHead className="w-[20%]">Bookings</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tables.map((table) => (
                            <TableRow key={table.tableNo}>
                                <TableCell>{table.tableNo}</TableCell>
                                <TableCell>{table.tableCapacity}</TableCell>
                                <TableCell>{table.amount}</TableCell>
                                <TableCell>
                                    {table.occupied ? "Yes" : "No"}
                                </TableCell>
                                <TableCell>{table.bookings}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
