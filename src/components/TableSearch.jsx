import { Button } from "@/components/ui/button";
import { setHours, setMinutes } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { IoMdSearch } from "react-icons/io";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";

export default function TableSearch() {
    const [date, setDate] = useState(setMinutes(new Date(), 0));
    const [value, setValue] = useState("4");

    localStorage.setItem("date", JSON.stringify(date));

    return (
        <div className="flex gap-5 flex-wrap mt-16 z-100">
            <div>
                <Label htmlFor="date" className="mb-1">
                    Date:
                </Label>
                <DatePicker
                    id="date"
                    className="mb-2 border-solid border-2 rounded-md w-50"
                    showIcon
                    showTimeSelect
                    minTime={setHours(setMinutes(new Date(), 30), 6)}
                    maxTime={setHours(setMinutes(new Date(), 30), 22)}
                    selected={date}
                    minDate={new Date()}
                    onChange={(date) => {
                        setDate(date);
                        window.localStorage.setItem(
                            "date",
                            JSON.stringify(date),
                        );
                    }}
                    dateFormat={"dd/MM/yyyy h:mm aa"}
                />
            </div>
            <div>
                <Select
                    id="cap"
                    value={value}
                    onValueChange={(value) => setValue(value)}
                >
                    <Label htmlFor="cap" className="mb-1">
                        People:
                    </Label>
                    <SelectTrigger className="!bg-white !border-sky-200 !font-normal">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Link
                className="!text-white flex gap-1 place-items-center"
                to={`/table/${date.toISOString().substring(0, 16)}/${value}`}
            >
                <Button className="mt-1">
                    Find <IoMdSearch />
                </Button>
            </Link>
        </div>
    );
}
