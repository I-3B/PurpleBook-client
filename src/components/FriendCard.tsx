import { FriendI } from "../interfaces/User";
import FriendButtons from "./FriendButtons";
import "./style/FriendCard.scss";
import UserAddress from "./UserAddress";
interface friendCardProps {
    friend: FriendI;
}
function FriendCard({ friend }: friendCardProps) {
    return (
        <article className="friend-card">
            <UserAddress user={friend} />
            <FriendButtons
                friendId={friend._id}
                initialFriendState={friend.friendState}
            ></FriendButtons>
        </article>
    );
}

export default FriendCard;
