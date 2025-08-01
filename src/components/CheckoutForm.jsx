import { Button } from "@/components/ui/button";
import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({ className, callback }) {
    const [msg, setMsg] = useState(null);
    const [isProcessing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:5173",
            },
            redirect: "if_required",
        });

        if (error) {
            setMsg(error);
            console.error(msg);
        } else {
            callback();
        }

        setProcessing(false);
    };

    return (
        <>
            <PaymentElement />
            <Button
                disabled={isProcessing}
                onClick={handleSubmit}
                className={className + " mt-3"}
            >
                {isProcessing ? "Processing..." : "Book"}
            </Button>
        </>
    );
}
