import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../utils/Loading";
import "../utils/style/Form.scss";

function Login() {
    const [formLoading, setFormLoading] = useState<ReactElement<any, any>>();
    const [formError, setFormError] = useState<loginFormError>();
    const { authed, login } = useAuth();
    const [loggedIn, setLoggedIn] = useState(authed);
    const formSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
        setFormLoading(<Loading />);
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const form = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        const loginResponse = await login(form);
        if (loginResponse.status !== 200) {
            setFormLoading(<></>);
            return readErrorMessage(loginResponse.body.error, setFormError);
        } else {
            setLoggedIn(true);
        }
    };
    if (loggedIn) return <Navigate to="/" />;
    return (
        <form className="form" onSubmit={formSubmitted}>
            <header>Login</header>
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                type="email"
                placeholder="example@mail.com"
                name="email"
                required
            ></input>
            {formError?.email}

            <label htmlFor="password">Password:</label>
            <input id="password" type="password" name="password" required></input>
            {formError?.password}

            {formLoading}
            <input type="submit" value="login"></input>
        </form>
    );
}
interface loginFormError {
    email?: ReactElement<any, any>;
    password?: ReactElement<any, any>;
}
interface responseError {
    location: string;
    msg: string;
    param: string;
    value: string;
}
const readErrorMessage = (error: responseError, setError: Dispatch<SetStateAction<any>>) => {
    let errorMsg;
    if (error.param === "email") {
        errorMsg = {
            email: (
                <p className="error">
                    {"- "}
                    {error.msg}
                </p>
            ),
        };
    } else if (error.param === "password") {
        errorMsg = {
            password: (
                <p className="error">
                    {"- "}
                    {error.msg}
                </p>
            ),
        };
    }
    setError(errorMsg);
};
export default Login;
