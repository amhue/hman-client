import { useEffect, useState } from "react";

import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserPayments() {
    const [bills, setBills] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/bills`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((bills) => {
                setBills(bills);
                setLoaded(true);
            })
            .catch((err) => setErr(err));
    }, []);

    if (err != null) {
        return (
            <div className="text-2xl pl-13 pt-14 h-screen">
                Could not load bills...
            </div>
        );
    } else if (loaded !== true) {
        return (
            <div className="h-screen text-2xl pl-13 pt-14">Loading data...</div>
        );
    }
    console.log(bills);
    return (
        <div className="min-h-screen relative pt-20 w-screen flex flex-col gap-10">
            <div className="grid justify-items-center gap-4">
                <h2 className="text-2xl font-medium w-full max-w-[47rem] pl-15 pr-15">
                    Your Bills:
                </h2>
                <div className="w-screen flex flex-wrap flex-cols justify-center">
                    {bills == null || bills.length <= 0 ? (
                        <Card className="w-full max-w-[40em] ml-15 mr-15 h-[7em] flex justify-center">
                            <CardHeader>
                                <CardTitle className="text-xl text-center">
                                    No bills!
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    ) : (
                        ""
                    )}
                    {bills.map((bill) => (
                        <Card
                            className="max-w-[40em] w-full mr-15 ml-15 mb-4"
                            key={bill.id}
                        >
                            <CardHeader>
                                <CardTitle>Room {bill.billType}: </CardTitle>
                                <CardAction>${bill.amount}</CardAction>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
