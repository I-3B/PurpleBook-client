import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { fetchAPI } from "../utils/fetchAPI";
import DropdownNav from "./DropdownNav";
import ImageBfr from "./ImageBfr";
import "./style/Header.scss";
export interface HeaderRefI {
    updateUserData: () => void;
    emptyNotifications: () => void;
    emptyFriendRequests: () => void;
}
const Header = forwardRef((_undefined, _ref) => {
    const { authed, logout } = useAuth();
    const [userData, setUserData] = useState<profile>();
    const getUserData = async () => {
        const res = await fetchAPI("users/profile");
        if (!res.body.user) {
            return logout();
        }
        setUserData(res.body.user);
    };
    const logoutClicked = () => {
        logout();
    };
    useImperativeHandle(_ref, () => ({
        updateUserData: () => {
            getUserData();
        },
        emptyNotifications: () => {
            setUserData((userData) => {
                if (userData) {
                    userData.notificationsCount = 0;
                    return { ...userData };
                }
            });
        },
        emptyFriendRequests: () => {
            setUserData((userData) => {
                if (userData) {
                    userData.friendRequestsCount = 0;
                    return { ...userData };
                }
            });
        },
    }));
    useEffect(() => {
        setUserData(undefined);
        if (authed) getUserData();
    }, [authed]);
    return (
        <header className="page-header">
            <nav>
                <ul>
                    <li className="li-logo">
                        <Link to="/">PurpleBook</Link>
                    </li>
                    {authed && (
                        <>
                            <li>
                                <Link to="/notifications" className="number-in-icon">
                                    <img src="/assets/bell.png" alt="bell" />
                                    {userData?.notificationsCount !== undefined &&
                                        userData?.notificationsCount !== 0 && (
                                            <span>{userData?.notificationsCount}</span>
                                        )}
                                </Link>
                            </li>
                            <li>
                                <Link to="/connect" className="number-in-icon">
                                    <img src="/assets/friends.png" alt="friends" />
                                    {userData?.friendRequestsCount !== undefined &&
                                        userData.friendRequestsCount !== 0 && (
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
});
interface profile {
    _id: string;
    firstName: string;
    lastName: string;
    friendRequestsCount: number;
    notificationsCount: number;
    imageMini: { data: Buffer; contentType: string };
}
export default Header;
