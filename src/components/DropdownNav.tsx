import { useRef } from "react";
import "./style/DropdownNav.scss";

interface Props {
    buttonContent: React.ReactNode;
    children: React.ReactNode;
}
function DropdownNav({ children, buttonContent }: Props) {
    const linksRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    return (
        <div className="dropdown-nav">
                <button
                    className="dropbtn"
                    onClick={() => {
                        linksRef.current.classList.toggle("show");
                    }}
                >
                    {buttonContent}
                </button>
                <div className="dropdown-content" ref={linksRef}>
                    {children}
                </div>
        </div>
    );
}
export default DropdownNav;
