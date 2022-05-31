import { useRef } from "react";
import "./style/DropdownNav.scss";

interface Props {
    buttonContent: React.ReactNode;
    children: React.ReactNode;
}
function DropdownNav({ children, buttonContent }: Props) {
    const contentRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const toggleShow = () => {
        contentRef.current.classList.toggle("show");
    };
    return (
        <div className="dropdown-nav">
            <button className="dropbtn" onClick={toggleShow}>
                {buttonContent}
            </button>
            <div className="dropdown-content" ref={contentRef} onClick={toggleShow}>
                {children}
            </div>
        </div>
    );
}
export default DropdownNav;
