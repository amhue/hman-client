import { useOutletContext } from "react-router-dom";

function forCurrentUser() {
    return <div className="mt-4">Hello</div>;
}

export default function Dashboard() {
    const userContext = useOutletContext();
    return (
        <div className="flex !justify-center w-screen wrap">
            <div className="mt-18 w-screen max-w-[50em] h-screen pl-[2em] pr-[2em]">
                <h2 className="text-4xl text-center font-semibold text-wrap wrap-break-word">
                    {userContext.user != null &&
                    userContext.user.id === userContext.userFromId.id
                        ? "Welcome, "
                        : ""}
                    {userContext.userFromId.name}
                </h2>
                {forCurrentUser()}
            </div>
        </div>
    );
}
