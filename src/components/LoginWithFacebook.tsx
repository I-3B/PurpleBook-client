import { Dispatch, ReactElement, SetStateAction } from "react";
import FacebookLogin from "react-facebook-login";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
interface Props {
    setLoading: Dispatch<SetStateAction<ReactElement<any, any> | undefined>>;
}
export default function LoginWithFacebook({ setLoading }: Props) {
    const { loginWithFacebook } = useAuth();
    const navigate = useNavigate();
    const responseFacebook = async (r: any) => {
        setLoading(<Loading />);
        const res = await loginWithFacebook(r.accessToken);
        if (res.status === 200) {
            navigate("/");
        } else {
            setLoading(<></>);
            NotificationManager.error("Something went wrong :(");
        }
    };
    return (
        <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_ID || ""}
            fields="accessToken"
            callback={responseFacebook}
            cssClass="facebook"
            icon="fa-facebook"
        />
    );
}
