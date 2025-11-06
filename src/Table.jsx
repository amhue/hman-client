import { addHours } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableCard from "./components/TableCard";
import TableSearch from "./components/TableSearch";

export default function Table() {
    const [user, setUser] = useState(null);
    const [tables, setTables] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [err, setErr] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const params = useParams();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/auth`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then(setUser)
            .catch(setErr);
    }, []);

    useEffect(() => {
        Promise.all([
            fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/current`, {
                credentials: "include",
            }).then((res) => res.json()),
            fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/upcoming`, {
                credentials: "include",
            }).then((res) => res.json()),
        ])
            .then(([current, upcoming]) =>
                setBookings([...current, ...upcoming]),
            )
            .catch(setErr);
    }, []);

    useEffect(() => {
        if (!params.start || !params.capacity) return;

        const endTime = addHours(new Date(params.start + "Z"), 3)
            .toISOString()
            .substring(0, 16);

        fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/table/search?start=${params.start}&end=${endTime}&capacity=${params.capacity}`,
        )
            .then((res) => res.json())
            .then((data) => {
                setTables(data.sort((a, b) => a.tableNumber - b.tableNumber));
                setLoaded(true);
            })
            .catch(setErr);
    }, [params]);

    useEffect(() => {
        if (err) console.error(err);
    }, [err]);

    if (err) {
        return (
            <div className="text-2xl h-[calc(100vh-8rem)] pl-3 pt-20">
                Could not load data...
            </div>
        );
    }

    if (!params.start || !params.capacity) {
        return (
            <div className="grid justify-items-center w-screen h-screen">
                <TableSearch />
                <div className="text-4xl font-bold text-center w-screen -mt-[6rem]">
                    Search for tables to reserve
                </div>
            </div>
        );
    }

    if (!loaded) {
        return (
            <div className="text-2xl h-[calc(100vh-8rem)] pl-3 pt-20">
                Loading data...
            </div>
        );
    }

    if (!user || bookings.length === 0) {
        return (
            <div className="text-4xl font-bold text-center w-screen pt-20">
                You don’t have any bookings!
                <br />
                Book a room to continue.
            </div>
        );
    }

    if (!tables || tables.length === 0) {
        return (
            <div className="grid justify-items-center w-screen h-screen">
                <TableSearch />
                <div className="text-4xl font-bold text-center w-screen -mt-[6rem]">
                    Sorry, No tables are available!
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-screen place-items-center min-h-screen">
            <TableSearch />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4 pb-10">
                {tables.map((table) => (
                    <TableCard
                        table={table}
                        key={table.id}
                        bookings={bookings}
                    />
                ))}
            </div>
        </div>
    );
}
