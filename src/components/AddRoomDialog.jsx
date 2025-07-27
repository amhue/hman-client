import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { IoMdAdd } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddRoomDialog() {
    const [roomNumber, setRoomNumber] = useState("");
    const [roomType, setRoomType] = useState(null);

    async function addRoom() {
        const req = {
            roomNumber: roomNumber,
            roomType: roomType.toUpperCase(),
        };

        try {
            let res = await fetch("http://localhost:8080/api/rooms/add", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req),
            });

            if (!res.ok) {
                throw new Error();
            }
            toast.success("Room has been saved!");
        } catch (e) {
            toast.error("The room already exists!");
            console.error(e);
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="text-white !p-1 flex !pl-3 !pr-3">
                Add Room <IoMdAdd className="mt-1" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-2">Add a new room:</DialogTitle>
                    <span className="flex gap-3 justify-between">
                        <Label htmlFor="room-no">Room Number: </Label>
                        <Input
                            value={roomNumber}
                            onChange={(e) => {
                                setRoomNumber(e.target.value);
                            }}
                            id="room-no"
                            className="w-[50%]"
                            inputMode="numeric"
                            pattern="\d*"
                        ></Input>
                    </span>
                    <span className="flex gap-3 justify-between">
                        <Label htmlFor="room-type">Room type: </Label>
                        <Select id="room-type" onValueChange={setRoomType}>
                            <SelectTrigger className="w-[50%]">
                                <SelectValue placeholder="Room type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="double">Double</SelectItem>
                                <SelectItem value="deluxe">Deluxe</SelectItem>
                            </SelectContent>
                        </Select>
                    </span>
                    <DialogFooter className="w-full mt-2 flex !justify-center">
                        <Button onClick={addRoom}>Ok</Button>
                        <DialogClose className="!pt-1 !pb-1 text-white">
                            Cancel
                        </DialogClose>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
