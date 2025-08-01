import { addHours } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableCard from "./components/TableCard";
import TableSearch from "./components/TableSearch";

export default function Table() {
    const [user, setUser] = useState(null);
    const [json, setJson] = useState(null);
    const [err, setErr] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [bookings, setBookings] = useState([]);
    const params = useParams();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/auth`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((user) => setUser(user))
            .catch((err) => setErr(err));

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
            .catch((err) => setErr(err));

        if (params.start && params.capacity) {
            fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/table/search?start=${params.start}&end=${addHours(
                    new Date(params.start + "Z"),
                    3,
                )
                    .toISOString()
                    .substring(0, 16)}&capacity=${params.capacity}`,
            )
                .then((res) => res.json())
                .then((json) => {
                    setJson(json);
                    json = json.sort((a, b) => a.tableNumber - b.tableNumber);
                    setLoaded(true);
                })
                .catch((err) => setErr(err));
        }
    }, [params]);

    useEffect(() => {
        if (err !== null) console.error(err);
    }, [err]);

    if (!loaded && !(!params.start || !params.capacity)) {
        return (
            <div className="text-2xl h-[calc(100vh-8rem)] pl-3 pt-20">
                Loading data...
            </div>
        );
    } else if (!(user && user.id && bookings.length > 0)) {
        return (
            <div className="text-4xl font-bold text-center w-screen pt-20">
                You don't have any Bookings!
                <br /> Book a room to continue!
            </div>
        );
    } else if (!params.start || !params.capacity) {
        return (
            <div className="grid w-screen justify-items-center pt-20">
                <div className="absolute top-0 ">
                    <TableSearch />
                </div>
                <div className="text-4xl font-bold text-center w-screen -mt-[6rem] absolute top-[50%]">
                    Search for tables to reserve
                </div>
            </div>
        );
    } else if (json == null || json.length <= 0) {
        return (
            <div className="grid w-screen justify-items-center pt-20">
                <div className="absolute top-0 ">
                    <TableSearch />
                </div>
                <div className="text-4xl font-bold text-center w-screen -mt-[6rem] absolute top-[50%]">
                    Sorry, No tables are available!
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-screen place-items-center h-screen">
            <TableSearch />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 grid-cols-1 mt-4">
                {json.map((table) => (
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
