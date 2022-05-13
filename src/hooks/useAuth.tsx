import React, { useState } from "react";
import UserI from "../interfaces/User";
import { fetchAPIForm } from "../utils/fetchAPI";

const authContext = React.createContext<any>(null);
interface Props {
    children: React.ReactNode;
}
function useAuth() {
    let tokenExists: Boolean = false;
    const token = localStorage.getItem("token");
    if (token !== null) tokenExists = true;
    const [authed, setAuthed] = useState<Boolean>(tokenExists);
    return {
        authed,
        login: async (form: UserI) => {
            const res = await fetchAPIForm("auth/login", "POST", form);
            if (res.status === 200) {
                localStorage.setItem("token", res.body.token);
                res.body.isAdmin && localStorage.setItem("isAdmin", res.body.isAdmin);
                setAuthed(true);
            } else {
                setAuthed(false);
            }
            return res;
        },
        logout: () => {
            localStorage.clear();
            setAuthed(false);
            return;
        },
    };
}
export function AuthProvider({ children }: Props) {
    const auth = useAuth();

    if (React.Children.count(children)) {
        return (
            <authContext.Provider value={auth}>
                {React.Children.map(children, (child) => (
                    <> {child}</>
                ))}
            </authContext.Provider>
        );
    }
    return <authContext.Provider value={auth}></authContext.Provider>;
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}
