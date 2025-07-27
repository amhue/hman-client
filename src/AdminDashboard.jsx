export default function AdminDashboard({ user }) {
    return (
        <h1 className="!text-[2em] font-medium text-center relative w-screen min-h-screen top-5">
            Welcome, {user.name}!
        </h1>
    );
}
