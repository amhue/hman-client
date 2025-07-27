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
            `http://localhost:8080/api/admin/users${params && params.userSearch ? "?userString=" + params.userSearch : ""}`,
            {
                credentials: "include",
            },
        )
            .then((res) => res.json())
            .then((users) => {
                setUsers(users);
                setLoaded(true);
            })
            .catch((err) => setErr(err));
    }, [params]);

    if (err != null) {
        return (
            <div className="text-2xl h-[calc(100vh-8rem)] pl-3">
                Could not load users!...
            </div>
        );
    } else if (!loaded) {
        return (
            <div className="text-2xl h-[calc(100vh-8rem)] pl-3">
                Loading data...
            </div>
        );
    } else if (users.length <= 0) {
        return (
            <div className="grid justify-items-center w-screen min-h-screen">
                <div className="flex w-screen justify-center gap-3 mt-6 relative">
                    <Input
                        className="w-50"
                        placeholder="Search for customers..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                    />
                    <Link to={`/users/${userSearch}`}>
                        <Button>
                            <IoMdSearch />
                            Search
                        </Button>
                    </Link>
                </div>
                <div className="text-4xl font-bold text-center w-screen">
                    No users found!
                </div>
            </div>
        );
    }

    return (
        <div className="pt-6 min-h-screen w-screen">
            <h1 className="w-screen text-center !text-4xl font-medium mb-6">
                Customers
            </h1>
            <div className="flex w-screen justify-center gap-3 mb-4 relative">
                <Input
                    className="w-50"
                    placeholder="Search for customers..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                />
                <Link to={`/users/${userSearch}`}>
                    <Button>
                        <IoMdSearch />
                        Search
                    </Button>
                </Link>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Document</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {user.phone ? user.phone : "N/A"}
                            </TableCell>
                            <TableCell>
                                {user.docName ? (
                                    <span className="flex w-full justify-center">
                                        <FaFilePdf className="mt-0.75" />
                                        {user.docName}
                                    </span>
                                ) : (
                                    "N/A"
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
