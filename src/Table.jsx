import { useEffect, useState } from "react";
import TableCard from "./TableCard";

export default function Table() {
    const [user, setUser] = useState(null);
    const [json, setJson] = useState(null);
    const [err, setErr] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/auth`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((user) => setUser(user))
            .catch((err) => setErr(err));

        Promise.all([
            fetch(`http://localhost:8080/api/users/current`, {
                credentials: "include",
            }).then((res) => res.json()),

            fetch(`http://localhost:8080/api/users/upcoming`, {
                credentials: "include",
            }).then((res) => res.json()),
        ])
            .then(([current, upcoming]) =>
                setBookings([...current, ...upcoming]),
            )
            .catch((err) => setErr(err));

        fetch(`http://localhost:8080/api/table`)
            .then((res) => res.json())
            .then((json) => {
                setJson(json);
                json = json.sort((a, b) => a.tableNumber - b.tableNumber);
                setLoaded(true);
            })
            .catch((err) => setErr(err));
    }, []);

    useEffect(() => {
        if (err !== null) console.error(err);
    }, [err]);

    if (!loaded) {
        return (
            <div className="text-2xl h-[calc(100vh-8rem)] pl-3">
                Loading data...
            </div>
        );
    } else if (!(user && user.id && bookings.length > 0)) {
        return (
            <div className="text-4xl font-bold text-center w-screen">
                You don't have any Bookings!
                <br /> Book a room to continue!
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-9rem)] w-screen grid justify-items-center">
            <div className="w-screen max-w-[80em] flex flex-wrap gap-10 justify-center h-fit mt-15 mb-5">
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
