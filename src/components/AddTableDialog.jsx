import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";

export default function () {
    const [tableNumber, setTableNumber] = useState("");
    const [tableAmount, setTableAmount] = useState("");
    const [capacity, setCapacity] = useState(null);

    async function addTable() {
        const req = {
            tableNumber: tableNumber,
            amount: tableAmount,
            capacity: capacity,
        };

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/table/add`, {
                credentials: "include",
                body: JSON.stringify(req),
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                throw new Error();
            }

            toast.success("The table was added successfully!");
        } catch (e) {
            toast.error("The table alrealdy exists!");
            console.error(e);
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="text-white flex !pt-1 !pb-1">
                Add Table <IoMdAdd className="mt-0.75" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-2">Add a new table:</DialogTitle>
                    <span className="flex gap-3 justify-between">
                        <Label htmlFor="table-no">Table Number: </Label>
                        <Input
                            value={tableNumber}
                            onChange={(e) => {
                                setTableNumber(e.target.value);
                            }}
                            id="table-no"
                            className="w-[50%]"
                            inputMode="numeric"
                            pattern="\d*"
                        ></Input>
                    </span>
                    <span className="flex gap-3 justify-between">
                        <Label htmlFor="table-amt">Table Amount: </Label>
                        <Input
                            value={tableAmount}
                            onChange={(e) => {
                                setTableAmount(e.target.value);
                            }}
                            id="table-amt"
                            className="w-[50%]"
                            inputMode="numeric"
                            pattern="\d*"
                        ></Input>
                    </span>
                    <span className="flex gap-3 justify-between">
                        <Label htmlFor="table-cap">Table capacity: </Label>
                        <Select id="table-cap" onValueChange={setCapacity}>
                            <SelectTrigger className="w-[50%]">
                                <SelectValue placeholder="Table type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="6">6</SelectItem>
                                <SelectItem value="8">8</SelectItem>
                            </SelectContent>
                        </Select>
                    </span>
                    <DialogFooter className="w-full mt-2 flex !justify-center">
                        <Button onClick={addTable}>Ok</Button>
                        <DialogClose className="!pt-1 !pb-1 text-white">
                            Cancel
                        </DialogClose>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
