import { useEffect, useState } from "react";

interface Props {
    friendId: string;
}
enum FS {
    NOT_FRIEND,
    FRIEND,
    FRIEND_REQUEST_SEND,
    FRIEND_REQUEST_RECEIVED,
}
const userId = localStorage.getItem("userId");
function FriendButton({ friendId }: Props) {
    const [friendState, setFriendState] = useState<FS>(FS.NOT_FRIEND);
    const [text, setText] = useState("");
    const [hover, setHover] = useState(false);
    const [defaultText, setDefaultText] = useState("");
    const [hoverText, setHoverText] = useState("");
    useEffect(() => {
        //TODO fetch('/users/userId/friend_state/friendId')
    }, []);
    const onHover = () => {
        setHover(true);
    };
    const unHover = () => {
        setHover(false);
    };
    useEffect(() => {
        switch (friendState) {
            case FS.NOT_FRIEND:
                setDefaultText("Add friend");
                setHoverText("Add");
                break;
            case FS.FRIEND:
                setDefaultText("friends");
                setHoverText("unfriend");
                break;
            case FS.FRIEND_REQUEST_SEND:
                setDefaultText("request sent");
                setHoverText("cancel request");
                break;
            case FS.FRIEND_REQUEST_RECEIVED:
                setDefaultText("Accept request");
                setHoverText("Accept request");
                break;
        }
    }, [friendState]);
    useEffect(() => {
        if (hover) {
            setText(hoverText);
        } else {
            setText(defaultText);
        }
    }, [hover, defaultText, hoverText]);
    if (userId === friendId) return <></>;
    return (
        <button className="toggle-friend" onMouseEnter={onHover} onMouseLeave={unHover}>
            {text}
        </button>
    );
}
export default FriendButton;
