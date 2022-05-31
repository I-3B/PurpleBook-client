import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { fetchAPI } from "../utils/fetchAPI";
import DropdownNav from "./DropdownNav";
import ImageBfr from "./ImageBfr";
import "./style/Header.scss";

function Header() {
    const { authed, logout } = useAuth();
    const [userData, setUserData] = useState<profile>();
    const getUserData = async () => {
        const res = await fetchAPI("users/profile");
        setUserData(res.body.user);
    };
    const logoutClicked = () => {
        logout();
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
                                <DropdownNav
                                    buttonContent={
                                        <>
                                            <span>{userData?.firstName}</span>
                                            <ImageBfr image={userData?.imageMini} type="profile" />
                                        </>
                                    }
                                >
                                    <Link to={"/users/" + userData?._id}>Profile</Link>
                                    <Link to={`/users/${userData?._id}/edit`}>Edit user</Link>
                                    <button onClick={logoutClicked}>Logout</button>
                                </DropdownNav>
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
