import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { fetchAPI } from "../utils/fetchAPI";
import Image from "./Image";
import "./style/Header.scss";

function Header() {
    const { authed } = useAuth();
    const [userData, setUserData] = useState<profile>();
    const getUserData = async () => {
        const res = await fetchAPI("/users/profile");
        setUserData(res.body.user);
    };
    useEffect(() => {
        if (authed) getUserData();
    }, [authed]);
    return (
        <header className="page-header">
            <nav>
                <ul>
                    <li className="li-logo">
                        <Link to={"/"}>OdinBook</Link>
                    </li>
                    {authed && (
                        <>
                            <li>n:{userData?.notificationsCount}</li>
                            <li>fr:{userData?.friendRequestsCount}</li>
                            <li></li>
                            <li>
                                <Link to={"/users/" + userData?._id}>{userData?.firstName}</Link>
                            </li>
                            <li>
                                <Image image={userData?.imageMini} type="profile" />
                            </li>
                            <li>
                                <Link to={"/logout"}>Logout</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
interface profile {
    _id: string;
    firstName: string;
    lastName: string;
    friendRequestsCount: number;
    notificationsCount: number;
    imageMini: { data: Buffer; contentType: string };
}
export default Header;
