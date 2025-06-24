import { useOutletContext } from "react-router-dom";

export default function Dashboard() {
    const userContext = useOutletContext();

    if (userContext.user == null) {
        return <div className="text-2xl pl-13 pt-14">Loading data...</div>;
    }

    return (
        <div className="flex !justify-center w-screen wrap">
            <div className="pt-18 w-screen max-w-[50em] h-screen pl-[2em] pr-[2em]">
                <h2 className="text-4xl text-center font-semibold text-wrap wrap-break-word">
                    Welcome, {userContext.user.name}
                </h2>
            </div>
        </div>
    );
}
