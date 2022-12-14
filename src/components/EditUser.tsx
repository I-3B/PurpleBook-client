import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { responseError } from "../interfaces/responseError";
import { BufferData } from "../interfaces/User";
import { fetchAPI, fetchAPIMultiPart } from "../utils/fetchAPI";
import { isString } from "../utils/isString";
import { HeaderRefI } from "./Header";
import ImageBfr from "./ImageBfr";
import Loading from "./Loading";
import "./style/Form.scss";
interface editData {
    firstName?: string;
    lastName?: string;
    imageFull?: BufferData;
}
interface EditUserProps {
    HeaderRef: React.RefObject<HeaderRefI>;
}
function EditUser({ HeaderRef }: EditUserProps) {
    const { logout } = useAuth();
    const [formData, setFormData] = useState<editData>({ firstName: "", lastName: "" });
    const [formLoading, setFormLoading] = useState<ReactElement<any, any>>();
    const [formErrors, setFormErrors] = useState<editUserFormErrors | null>(null);
    const { userId } = useParams();
    const route = `users/${userId}`;
    const navigate = useNavigate();
    const loadUserData = async () => {
        const res = await fetchAPI(`${route}/edit_data`);
        if (res.status === 200) {
            setFormData(res.body.user);
        } else {
            NotificationManager.error(`${res.status} ${isString(res.body)}`);
        }
    };
    const formSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormLoading(<Loading />);
        setFormErrors(null);
        const formData = new FormData(e.currentTarget);
        const res = await fetchAPIMultiPart(`${route}`, "PATCH", formData);

        if (res.status === 400) {
            readErrorMessages(res.body.errors, setFormErrors);
        } else if (res.status !== 200) {
            NotificationManager.error(res.body, res.status);
        } else {
            HeaderRef.current?.updateUserData();
            return navigate("/" + route);
        }
        setFormLoading(<></>);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        if (name === "firstName") setFormData({ ...formData, firstName: value });
        else if (name === "lastName") setFormData({ ...formData, lastName: value });
    };
    const deleteUser = async () => {
        const confirmed = window.confirm("Delete this account?");
        if (confirmed) {
            const deletedRes = await fetchAPI(route, "DELETE");
            if (deletedRes.status === 200) {
                if (userId === localStorage.getItem("userId")) {
                    logout();
                    navigate("/login");
                } else {
                    NotificationManager.success(`${deletedRes.status} ${deletedRes.body}`);
                }
            } else {
                NotificationManager.error(`${deletedRes.status} ${deletedRes.body}`);
            }
        }
    };
    useEffect(() => {
        loadUserData();
    }, []);
    return (
        <form className="form" onSubmit={formSubmitted}>
            <header>Edit user:</header>

            <label htmlFor="firstName">First name:</label>
            <input
                id="firstName"
                type="text"
                placeholder="john"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
            ></input>
            {formErrors?.firstName}

            <label htmlFor="lastName">Last name:</label>
            <input
                id="lastName"
                type="text"
                placeholder="john"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
            ></input>
            {formErrors?.lastName}

            <label htmlFor="image">Current profile image:</label>
            <ImageBfr image={formData.imageFull} type="profile" />
            <label htmlFor="image">Update image:</label>
            <input id="image" type="file" name="image" accept=".jpg, .jpeg, .png"></input>
            {formLoading}
            <div className="buttons">
                <input type="submit" value="Save update"></input>
                <button type="button" className="delete" onClick={deleteUser}>
                    Delete account
                </button>
            </div>
        </form>
    );
}
interface editUserFormErrors {
    firstName: ReactElement<any, any>;
    lastName: ReactElement<any, any>;
}
const readErrorMessages = (
    errors: Array<responseError>,
    setErrors: Dispatch<SetStateAction<any>>
) => {
    const errorMsgs: { [key: string]: Array<string> } = {
        firstName: [],
        lastName: [],
    };
    const errorElements: { [key: string]: ReactElement<any, any> } = {
        firstName: <></>,
        lastName: <></>,
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

export default EditUser;
