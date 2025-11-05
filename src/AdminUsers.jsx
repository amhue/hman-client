import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FaFilePdf } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

export default function AdminUsers() {
    const params = useParams();
    const [users, setUsers] = useState([]);
    const [err, setErr] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [userSearch, setUserSearch] = useState("");

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/admin/users${
                params && params.userSearch
                    ? "?userString=" + params.userSearch
                    : ""
            }`,
            { credentials: "include" },
        )
            .then((res) => res.json())
            .then((users) => {
                setUsers(users);
                setLoaded(true);
            })
            .catch((err) => setErr(err));
    }, [params]);

    if (err)
        return (
            <div className="flex items-center justify-center h-[80vh] text-xl text-red-600">
                Could not load users.
            </div>
        );

    if (!loaded)
        return (
            <div className="flex items-center justify-center h-[80vh] text-xl text-gray-500 dark:text-gray-300">
                Loading users...
            </div>
        );

    return (
        <div className="min-h-screen w-screen py-8">
            <h1 className="text-center text-4xl font-semibold tracking-tight mb-8 text-gray-800 dark:text-gray-100">
                Customer Management
            </h1>

            {/* Card now takes full width */}
            <Card className="w-[95vw] mx-auto p-6 shadow-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/80 backdrop-blur">
                {/* Search Section */}
                <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
                    <Input
                        className="w-64 md:w-80"
                        placeholder="Search for customers..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                    />
                    <Link to={`/users/${userSearch}`}>
                        <Button className="flex items-center gap-2">
                            <IoMdSearch className="text-lg" />
                            Search
                        </Button>
                    </Link>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 w-full">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow className="bg-gray-100 dark:bg-gray-800">
                                <TableHead className="font-semibold w-[25%]">
                                    Name
                                </TableHead>
                                <TableHead className="font-semibold w-[25%]">
                                    E-mail
                                </TableHead>
                                <TableHead className="font-semibold w-[20%]">
                                    Phone
                                </TableHead>
                                <TableHead className="font-semibold w-[30%] text-center">
                                    Document
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                                    >
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.phone || (
                                                <span className="text-gray-400">
                                                    N/A
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {user.docName ? (
                                                <a
                                                    href={`${import.meta.env.VITE_SERVER_URL}/uploads/${user.docName}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center gap-2 text-blue-600 hover:underline"
                                                >
                                                    <FaFilePdf className="text-red-600" />
                                                    {user.docName}
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">
                                                    N/A
                                                </span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center py-6 text-gray-500 dark:text-gray-400"
                                    >
                                        No users found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
