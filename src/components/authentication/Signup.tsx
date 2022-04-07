import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { fetchAPIMultiPart } from "../../utils/fetchAPI";
import Loading from "../utils/Loading";
import "../utils/style/Form.scss";

function Signup() {
    const [formLoading, setFormLoading] = useState<ReactElement<any, any>>();
    const [formErrors, setFormErrors] = useState<signupFormErrors>();
    const { authed, login } = useAuth();
    const [loggedIn, setLoggedIn] = useState(authed);

    const formSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormLoading(<Loading />);
        setFormErrors(undefined);
        const formData = new FormData(e.currentTarget);
        const response = await fetchAPIMultiPart("auth/signup", "POST", formData);

        if (response.status !== 201) {
            return readErrorMessages(response.body.errors, setFormErrors);
        }

        setFormLoading(<></>);

        const email = formData.get("email");
        const password = formData.get("password");
        const loginResponse = await login({ email, password });
        if (loginResponse.status === 200) setLoggedIn(true);
    };

    if (loggedIn) return <Navigate to="/" />;
    return (
        <form className="form" onSubmit={formSubmitted}>
            <header>Sign up</header>

            <label htmlFor="firstName">First name:</label>
            <input id="firstName" type="text" placeholder="john" name="firstName" required></input>
            {formErrors?.firstName}

            <label htmlFor="lastName">Last name:</label>
            <input id="lastName" type="text" placeholder="john" name="lastName" required></input>
            {formErrors?.lastName}

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

            <label htmlFor="image">Profile image:</label>
            <input id="image" type="file" name="image" accept=".jpg, .jpeg, .png"></input>
            {formLoading}
            <input type="submit" value="Signup"></input>
        </form>
    );
}
interface signupFormErrors {
    firstName: ReactElement<any, any>;
    lastName: ReactElement<any, any>;
    email: ReactElement<any, any>;
    password: ReactElement<any, any>;
}
interface responseError {
    location: string;
    msg: string;
    param: string;
    value: string;
}
const readErrorMessages = (
    errors: Array<responseError>,
    setErrors: Dispatch<SetStateAction<any>>
) => {
    const errorMsgs: { [key: string]: Array<string> } = {
        firstName: [],
        lastName: [],
        email: [],
        password: [],
    };
    const errorElements: { [key: string]: ReactElement<any, any> } = {
        firstName: <></>,
        lastName: <></>,
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

export default Signup;
