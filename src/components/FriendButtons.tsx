import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
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
function FriendButtons({ friendId, initialFriendState }: Props) {
    const [friendState, setFriendState] = useState<FS>(FS[initialFriendState as keyof typeof FS]);
    const [text, setText] = useState("");
    const [hover, setHover] = useState(false);
    const [defaultText, setDefaultText] = useState("");
    const [hoverText, setHoverText] = useState("");
    const [enableRemoveReceivedFR, setEnableRemoveReceivedFR] = useState(false);
    const userId = localStorage.gtItem("userId");
    const onHover = () => {
        setHover(true);
    };
    const unHover = () => {
        setHover(false);
    };
    const changeFriendState = async () => {
        const friendRoute = `users/${friendId}`;
        const userRoute = `users/${userId}`;
        let route: string, method: string;
        switch (friendState) {
            case FS.NOT_FRIEND:
                setFriendState(FS.FRIEND_REQUEST_SENT);
                route = `${friendRoute}/friend_requests`;
                method = "POST";
                break;
            case FS.FRIEND:
                setFriendState(FS.NOT_FRIEND);
                route = `${userRoute}/friends/${friendId}`;
                method = "DELETE";
                break;
            case FS.FRIEND_REQUEST_SENT:
                setFriendState(FS.NOT_FRIEND);
                route = `${userRoute}/sent_friend_requests/${friendId}`;
                method = "DELETE";
                break;
            case FS.FRIEND_REQUEST_RECEIVED:
                setFriendState(FS.FRIEND);
                setEnableRemoveReceivedFR(false);
                route = `${userRoute}/friends/${friendId}`;
                method = "POST";
                break;
        }
        const res = await fetchAPI(route, method);
        if (res.status !== 200) {
            const error = res.body.error ? res.body.error : res.body;
            NotificationManager.error(error, res.status);
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
