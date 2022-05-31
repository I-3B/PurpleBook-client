import { Link } from "react-router-dom";
import { UserMini } from "../interfaces/User";
import ImageBfr from "./ImageBfr";
import "./style/UserAddress.scss";
interface Props {
    user: UserMini;
}
function UserAddress({ user }: Props) {
    return (
        <address className="user-address">
            <Link rel="author" to={"/users/" + user._id}>
                <ImageBfr image={user.imageMini} type="profile"></ImageBfr>
                <span>{user.firstName + " " + user.lastName}</span>
            </Link>
        </address>
    );
}

export default UserAddress;
