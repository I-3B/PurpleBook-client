import FacebookLogin from "react-facebook-login";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export default function LoginWithFacebook() {
    const { loginWithFacebook } = useAuth();
    const navigate = useNavigate();
    const responseFacebook = async (r: any) => {
        const res = await loginWithFacebook(r.accessToken);
        if (res.status === 200) {
            navigate("/");
        } else {
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
