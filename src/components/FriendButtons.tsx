import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/fetchAPI";
import "./style/FriendButtons.scss";
interface Props {
    friendId: string;
    initialFriendState: string;
}
enum FS {
    NOT_FRIEND,
    FRIEND,
    FRIEND_REQUEST_SENT,
    FRIEND_REQUEST_RECEIVED,
}
const userId = localStorage.getItem("userId");
function FriendButtons({ friendId, initialFriendState }: Props) {
    const [friendState, setFriendState] = useState<FS>(FS[initialFriendState as keyof typeof FS]);
    const [text, setText] = useState("");
    const [hover, setHover] = useState(false);
    const [defaultText, setDefaultText] = useState("");
    const [hoverText, setHoverText] = useState("");
    const [enableRemoveReceivedFR, setEnableRemoveReceivedFR] = useState(false);
    const onHover = () => {
        setHover(true);
    };
    const unHover = () => {
        setHover(false);
    };
    const changeFriendState = async () => {
        const friendRoute = `users/${friendId}`;
        const userRoute = `users/${userId}`;
        switch (friendState) {
            case FS.NOT_FRIEND:
                setFriendState(FS.FRIEND_REQUEST_SENT);
                fetchAPI(`${friendRoute}/friend_requests`, "POST");
                break;
            case FS.FRIEND:
                setFriendState(FS.NOT_FRIEND);
                fetchAPI(`${userRoute}/friends/${friendId}`, "DELETE");
                break;
            case FS.FRIEND_REQUEST_SENT:
                setFriendState(FS.NOT_FRIEND);
                fetchAPI(`${userRoute}/sent_friend_requests/${friendId}`, "DELETE");
                break;
            case FS.FRIEND_REQUEST_RECEIVED:
                setFriendState(FS.FRIEND);
                setEnableRemoveReceivedFR(false);
                fetchAPI(`${userRoute}/friends/${friendId}`, "POST");
                break;
        }
    };
    const removeReceivedFR = async () => {
        setFriendState(FS.NOT_FRIEND);
        setEnableRemoveReceivedFR(false);
        fetchAPI(`users/${userId}/friend_requests/${friendId}`, "DELETE");
    };
    useEffect(() => {
        switch (friendState) {
            case FS.NOT_FRIEND:
                setDefaultText("Add friend");
                setHoverText("Add friend");
                break;
            case FS.FRIEND:
                setDefaultText("friends");
                setHoverText("unfriend");
                break;
            case FS.FRIEND_REQUEST_SENT:
                setDefaultText("request sent");
                setHoverText("cancel request");
                break;
            case FS.FRIEND_REQUEST_RECEIVED:
                setEnableRemoveReceivedFR(true);
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
        <div className="friend-buttons">
            <button
                className="friend-button"
                onMouseEnter={onHover}
                onMouseLeave={unHover}
                onClick={changeFriendState}
            >
                {text}
            </button>
            {enableRemoveReceivedFR && (
                <button className="remove-fr" onClick={removeReceivedFR}>
                    remove request
                </button>
            )}
        </div>
    );
}
export default FriendButtons;
