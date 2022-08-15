import { friendRequestI, RecommendI, UserWithStateI } from "../interfaces/User";
import FriendButtons from "./FriendButtons";
import "./style/FriendComponents.scss";
import UserAddress from "./UserAddress";
interface friendCardProps {
    friend: UserWithStateI;
    classes?: string;
    children?: React.ReactNode;
}

function FriendCard({ friend, classes, children }: friendCardProps) {
    return (
        <article className={"friend-card " + classes}>
            <UserAddress user={friend} />
            {children}
            <FriendButtons
                friendId={friend._id}
                initialFriendState={friend.friendState}
            ></FriendButtons>
        </article>
    );
}
interface FriendRequestCardProps {
    friendRequest: friendRequestI;
}
function FriendRequestCard({ friendRequest }: FriendRequestCardProps) {
    return (
        <FriendCard
            friend={{ ...friendRequest.user, friendState: "FRIEND_REQUEST_RECEIVED" }}
            classes={friendRequest.viewed ? "" : "not-viewed"}
        ></FriendCard>
    );
}
interface FriendRecommendCardProps {
    friendRecommendation: RecommendI;
}
function FriendRecommendCard({ friendRecommendation }: FriendRecommendCardProps) {
    return (
        <FriendCard friend={friendRecommendation}>
            <div className="mutual-friends">
                {friendRecommendation.mutualFriends} mutual friends
            </div>
        </FriendCard>
    );
}
export { FriendCard, FriendRequestCard, FriendRecommendCard };
