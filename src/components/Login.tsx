import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { responseError } from "../interfaces/responseError";
import Loading from "./Loading";
import LoginWithFacebook from "./LoginWithFacebook";
import "./style/Form.scss";
function Login() {
    const [formLoading, setFormLoading] = useState<ReactElement<any, any>>();
    const [formErrors, setFormErrors] = useState<loginFormError>();
    const { authed, login } = useAuth();
    const [loggedIn, setLoggedIn] = useState(authed);

    const formSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormLoading(<Loading />);
        const formData = new FormData(e.currentTarget);
        const formAsJSON = JSON.parse(JSON.stringify(Object.fromEntries(formData)));
        const res = await login(formAsJSON);
        setFormLoading(<></>);
        if (res.status === 400 || res.status === 404) {
            readErrorMessages(res.body.errors, setFormErrors);
        } else if (res.status === 200) {
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
            {formErrors?.email}

            <label htmlFor="password">Password:</label>
            <input id="password" type="password" name="password" required></input>
            {formErrors?.password}

            {formLoading}
            <input type="submit" value="login"></input>
            <p>
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
            <div className="or">
                <hr></hr>
                <p>or</p>
                <hr></hr>
            </div>
            <LoginWithFacebook setLoading={setFormLoading} />
        </form>
    );
}
interface loginFormError {
    email?: ReactElement<any, any>;
    password?: ReactElement<any, any>;
}

const readErrorMessages = (
    errors: Array<responseError>,
    setErrors: Dispatch<SetStateAction<any>>
) => {
    const errorMsgs: { [key: string]: Array<string> } = {
        email: [],
        password: [],
    };
    const errorElements: { [key: string]: ReactElement<any, any> } = {
        email: <></>,
        password: <></>,
    };
    errors.forEach((err) => {
        errorMsgs[err.param].push(err.msg);
    });
    Object.keys(errorElements).forEach((param) => {
        errorElements[param] = (
            <ul className="error">
                {errorMsgs[param].map((msg) => (
                    <li key={msg}>{msg}</li>
                ))}
            </ul>
        );
    });
    setErrors(errorElements);
};

export default Login;
