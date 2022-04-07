import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

function RequireAuth() {
    const { authed } = useAuth();
    if (authed === true) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
}
export default RequireAuth;
