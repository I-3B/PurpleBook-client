import { NotificationManager } from "react-notifications";
import { LinkSvg } from "./SVG";
interface Props {
    link: string;
}
function LinkButton({ link }: Props) {
    const linkClicked = () => {
        navigator.clipboard.writeText(document.location.origin + link).then(() => {
            NotificationManager.success("copied to clipboard", "", 1000);
        });
    };
    return (
        <button onClick={linkClicked}>
            <LinkSvg />
        </button>
    );
}
export default LinkButton;
