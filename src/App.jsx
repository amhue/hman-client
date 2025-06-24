import { BrowserRouter, Route, Routes } from "react-router-dom";
import Book from "./Book";
import Login from "./Login";
import { ToastContainer, Flip } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./Home";
import { useState, useEffect } from "react";
import User from "./User";
import Dashboard from "./Dashboard";
import Table from "./Table";
import UserBookings from "./UserBookings";
import UserTables from "./UserTables";
import UserStays from "./UserStays";
import UserPayments from "./UserPayments";

export default function App() {
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(null);

    function fetchUser() {
        fetch("http://localhost:8080/api/users/auth", {
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

    return (
        <>
            <BrowserRouter>
                <Navbar user={user} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/book/:start?/:end?/:type?"
                        element={<Book user={user} />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/user" element={<User user={user} />}>
                        <Route index element={<Dashboard />} />
                        <Route
                            path="/user/bookings"
                            element={<UserBookings />}
                        />
                        <Route path="/user/table" element={<UserTables />} />
                        <Route path="/user/stays" element={<UserStays />} />
                        <Route
                            path="/user/payments"
                            element={<UserPayments />}
                        />
                    </Route>
                    <Route
                        path="table/:start?/:capacity?"
                        element={<Table />}
                    />
                </Routes>
            </BrowserRouter>
            <ToastContainer transition={Flip} autoClose={3000} />
        </>
    );
}
