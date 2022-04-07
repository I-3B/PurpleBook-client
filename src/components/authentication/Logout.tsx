import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

function Logout() {
    const { logout } = useAuth();
    logout();
    return <Navigate to="/login" />;
}
export default Logout;
