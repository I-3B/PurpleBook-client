import { UserMini } from "../interfaces/User";
import User from "./User";
interface FriendListProps {
    friends: Array<UserMini>;
}
function FriendList({ friends }: FriendListProps) {
    return (
        <>
            {friends.map((friend) => {
                return <FriendCard friend={friend} key={friend._id} />;
            })}
        </>
    );
}
interface friendCardProps {
    friend: UserMini;
}
function FriendCard({ friend }: friendCardProps) {
    return (
        <>
            <article className="friend-card">
                <User user={friend} />
                <button>Add friend</button>
                <button>remove</button>
            </article>
            <article className="friend-card">
                <h3>{friend.firstName + " " + friend.lastName}</h3>
            </article>
            <article className="friend-card">
                <h3>{friend.firstName + " " + friend.lastName}</h3>
            </article>
            <article className="friend-card">
                <h3>{friend.firstName + " " + friend.lastName}</h3>
            </article>
            <article className="friend-card">
                <h3>{friend.firstName + " " + friend.lastName}</h3>
            </article>
            <article className="friend-card">
                <h3>{friend.firstName + " " + friend.lastName}</h3>
            </article>
            <article className="friend-card">
                <h3>{friend.firstName + " " + friend.lastName}</h3>
            </article>
            <article className="friend-card">
                <h3>{friend.firstName + " " + friend.lastName}</h3>
            </article>
        </>
    );
}

export default FriendList;
