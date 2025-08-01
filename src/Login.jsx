import { FcGoogle } from "react-icons/fc";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./components/ui/button";

export default function Login() {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Card className="w-100 text-center">
                <CardHeader>
                    <CardTitle className="text-4xl text-center">
                        Welcome to The Grand Oasis
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Login to continue
                    </CardDescription>
                    {
                        // <CardAction>Card Action</CardAction>
                    }
                </CardHeader>
                <CardContent>
                    <Button
                        className="h-13 !text-md"
                        onClick={() => {
                            window.location.href = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/google`;
                        }}
                    >
                        <FcGoogle /> Continue with Google
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
