import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";

export default function EditProfilePage({ user }) {
    const [name, setName] = useState(user != null ? user.name : "");
    const [doc, setDoc] = useState(null);
    const [phone, setPhone] = useState(user != null ? user.phone : "");

    if (user == null) {
        return (
            <div className="h-screen text-2xl pl-13 pt-14">Loading data...</div>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("Name is required");
            return;
        }

        if (!phone || phone.length < 10) {
            toast.error("Enter a valid phone number");
            return;
        }

        if (doc && doc.type !== "application/pdf") {
            toast.error("Only PDF files are allowed");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);

        if (doc) {
            formData.append("document", doc);
        }

        try {
            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/profile`, {
                method: "POST",
                body: formData,
                // headers: { "Content-Type": "multipart/form-data" },
                credentials: "include",
            }).then(toast.success("Saved changes!"));
        } catch (e) {
            toast.error("Could not save changes!");
            console.error(e);
        }
    }

    return (
        <div className="p-6 mx-auto space-y-6 relative flex place-items-center justify-center w-screen min-h-screen">
            <div className="w-[30rem]">
                <h2 className="text-3xl font-bold mb-3">Edit Profile</h2>
                <Card>
                    <form>
                        <CardContent className="space-y-4 flex flex-col justify-end">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Your name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    disabled
                                    value={user.email}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone number:</Label>
                                <PhoneInput
                                    className="border-solid border-2 border-sky-200 rounded-md h-9"
                                    required
                                    id="phone"
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={setPhone}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="document">Add Document</Label>
                                <Input
                                    id="document"
                                    type="file"
                                    accept="application/pdf"
                                    onClick={(e) => (e.target.value = null)}
                                    onChange={(e) => {
                                        setDoc(e.target.files[0]);
                                    }}
                                />
                            </div>
                            <Button onClick={handleSubmit}>Save Changes</Button>
                        </CardContent>
                    </form>
                </Card>
            </div>
        </div>
    );
}
