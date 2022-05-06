import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { fetchAPI } from "../utils/fetchAPI";
import ImageBfr from "./ImageBfr";
import "./style/Header.scss";

function Header() {
    const { authed } = useAuth();
    const [userData, setUserData] = useState<profile>();
    const getUserData = async () => {
        const res = await fetchAPI("users/profile");
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
                        <Link to="/">OdinBook</Link>
                    </li>
                    {authed && (
                        <>
                            <li>
                                <Link to="/notifications" className="number-in-icon">
                                    <img src="/assets/bell.png" alt="bell" />
                                    {userData?.notificationsCount !== 0 && (
                                        <span>{userData?.notificationsCount}</span>
                                    )}
                                </Link>
                            </li>
                            <li>
                                <Link to="/friends" className="number-in-icon">
                                    <img src="/assets/friends.png" alt="friends" />
                                    {userData?.friendRequestsCount !== 0 && (
                                        <span>{userData?.friendRequestsCount}</span>
                                    )}
                                </Link>
                            </li>
                            <li className="profile">
                                <Link to={"/users/" + userData?._id}>
                                    <span>{userData?.firstName}</span>
                                    <ImageBfr image={userData?.imageMini} type="profile" />
                                </Link>
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
