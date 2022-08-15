import { useEffect } from "react";
import { NotificationManager } from "react-notifications";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchAPI } from "../utils/fetchAPI";

function Admin() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { userId } = useParams();
    const navigate = useNavigate();
    const revokeFn = async () => {
        const { body, status } = await fetchAPI(
            `users/${userId}/admin?revoke=${searchParams.get("revoke")}`,
            "POST"
        );
        if (status === 200) {
            NotificationManager.success(`${status} ${body}`);
            localStorage.setItem("isAdmin", "false");
            navigate(`/users/${userId}/`);
        } else {
            NotificationManager.error(`${status} ${body}`);
        }
    };
    const grantFn = async () => {
        const { body, status } = await fetchAPI(
            `users/${userId}/admin?grant=${searchParams.get("grant")}`,
            "POST"
        );
        if (status === 200) {
            NotificationManager.success(`${status} ${body}`);
            localStorage.setItem("isAdmin", "true");
            navigate(`/users/${userId}/`);
        } else {
            NotificationManager.error(`${status} ${body}`);
        }
    };

    useEffect(() => {
        if (searchParams.get("revoke")) revokeFn();
        else grantFn();
    });
    return <></>;
}
export default Admin;
