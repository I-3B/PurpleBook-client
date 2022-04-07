import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./style/Header.scss";

function Header() {
    const { authed } = useAuth();
    return (
        <header className="page-header">
            <nav>
                <ul>
                    <li className="li-logo">
                        <Link to={"/"}>OdinBook</Link>
                    </li>
                    {authed && (
                        <li>
                            <Link to={"/logout"}>Logout</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
export default Header;
