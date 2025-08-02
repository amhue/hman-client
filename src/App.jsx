import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import AdminRooms from "./AdminRooms";
import AdminTables from "./AdminTables";
import AdminUsers from "./AdminUsers";
import Book from "./Book";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Payment from "./components/Payment";
import Home from "./Home";
import Login from "./Login";
import Table from "./Table";
import User from "./User";
import UserBookings from "./UserBookings";
import UserPayments from "./UserPayments";
import UserSettings from "./UserSettings";
import UserStays from "./UserStays";
import UserTables from "./UserTables";

export default function App() {
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(null);

    function fetchUser() {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/auth`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((user) => {
                setUser(user);
            })
            .catch((err) => setErr(err));
    }

    useEffect(() => fetchUser(), []);

    useEffect(() => {
        if (err !== null) {
            console.error("Could not login!", err);
        }
    }, [err]);

    if (user != null && user.mgmt) {
        return (
            <div className="min-h-screen flex flex-col overflow-x-hidden">
                <BrowserRouter>
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<User user={user} />}>
                                <Route
                                    path="/:userSearch?"
                                    element={<AdminUsers />}
                                />
                                <Route path="/rooms" element={<AdminRooms />} />
                                <Route
                                    path="/tables"
                                    element={<AdminTables />}
                                />
                            </Route>
                        </Routes>
                    </main>
                    <Footer />
                </BrowserRouter>
                <ToastContainer transition={Flip} autoClose={3000} />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <BrowserRouter>
                <Navbar user={user} />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/book/:start?/:end?/:type?"
                            element={<Book user={user} />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/user" element={<User user={user} />}>
                            <Route index element={<UserBookings />} />
                            <Route
                                path="/user/table"
                                element={<UserTables />}
                            />
                            <Route path="/user/stays" element={<UserStays />} />
                            <Route
                                path="/user/payments"
                                element={<UserPayments />}
                            />
                            <Route
                                path="/user/settings"
                                element={<UserSettings user={user} />}
                            />
                        </Route>
                        <Route
                            path="table/:start?/:capacity?"
                            element={<Table />}
                        />
                        <Route path="pay" element={<Payment />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
            <ToastContainer transition={Flip} autoClose={3000} />
        </div>
    );
}
