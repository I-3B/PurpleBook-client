import React, { useState } from "react";
import User from "../interfaces/User";
import { fetchAPI } from "../utils/fetchAPI";

const authContext = React.createContext<any>(null);
interface Props {
    children: React.ReactNode;
}
function useAuth() {
    let tokenExists: Boolean = false;
    const token = localStorage.getItem("token");
    if (token !== null) tokenExists = true;
    const [authed, setAuthed] = useState<Boolean>(tokenExists);
    //TODO add check token
    return {
        authed,
        login: async (form: User) => {
            const result = await fetchAPI("auth/login", "POST", form);
            if (result.status === 200) {
                localStorage.setItem("token", result.body.token);
                localStorage.setItem("isAdmin", result.body.isAdmin);
                setAuthed(true);
            } else {
                setAuthed(false);
            }
            return result;
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
