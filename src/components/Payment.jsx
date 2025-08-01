import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

export default function Payment({ amount, callback, className }) {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: amount,
                currency: "usd",
            }),
        })
            .then((res) => res.json())
            .then((json) => setClientSecret(json.client_secret))
            .catch((err) => console.error(err));
        setStripePromise(
            loadStripe(
                "pk_test_51RdaUoIMBe7ql1rzz11Vew4sTggGr1HUg1pOvSjr7BuoiNKVDQk3Lgoedr3FsuALxoi2PqtIAHKaEJ5f4EGHKgY900VwbLpCI2",
            ),
        );
        console.log(clientSecret);
    }, []);
    if (!clientSecret || clientSecret.length <= 0) {
        return <></>;
    }
    return (
        <>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm callback={callback} className={className} />
            </Elements>
        </>
    );
}
