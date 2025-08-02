import { parseISO, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookCard from "./components/BookCard";
import SearchRoom from "./components/SearchRoom";

export default function Book({ user }) {
    const [json, setJson] = useState(null);
    const [err, setErr] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const params = useParams();

    useEffect(() => {
        const req = {};
        if (params.start && params.end && params.type) {
            req.roomType = params.type;
            req.start = params.start;
            req.end = params.end;
        }

        fetch(`${import.meta.env.VITE_SERVER_URL}/api/rooms/search`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
        })
            .then((res) => res.json())
            .then((json) => {
                setJson(json);
                setLoaded(true);
            })
            .catch((err) => setErr(err));
    }, [params]);

    if (err != null) {
        return (
            <div className="text-2xl h-[calc(100vh-8rem)] pl-3">
                Could not load bookings...
            </div>
        );
    } else if (!loaded) {
        return (
            <div className="text-2xl h-[calc(100vh-8rem)] pl-3">
                Loading data...
            </div>
        );
    } else if (!Array.isArray(json) || json.length === 0) {
        return (
            <div className="grid justify-items-center w-screen mt-[4em] h-[calc(100vh-6rem)]">
                <SearchRoom />
                <div className="text-4xl font-bold text-center w-screen -mt-[6rem]">
                    Sorry, No rooms are available!
                </div>
            </div>
        );
    }

    return (
        <div className="grid justify-items-center w-screen mt-[4em]">
            <SearchRoom />
            <div className="flex flex-wrap !justify-center max-w-[80em] min-h-[calc(100vh-9rem)] gap-x-10">
                {json.map((el) => (
                    <div key={el.id} className="w-max">
                        <BookCard
                            el={el}
                            user={user}
                            bookedIntervals={el.booking.map((e) => ({
                                start: parseISO(e.startDate),
                                end: subDays(parseISO(e.endDate), 1),
                            }))}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
