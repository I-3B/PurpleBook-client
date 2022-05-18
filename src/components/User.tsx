import { Link } from "react-router-dom";
import { UserMini } from "../interfaces/User";
import ImageBfr from "./ImageBfr";
import "./style/Author.scss";
interface Props {
    user: UserMini;
}
function User({ user }: Props) {
    return (
        <address className="author">
            <Link rel="author" to={"/users/" + user._id}>
                <ImageBfr image={user.imageMini} type="profile"></ImageBfr>
                <span>{user.firstName + " " + user.lastName}</span>
            </Link>
        </address>
    );
}

export default User;
