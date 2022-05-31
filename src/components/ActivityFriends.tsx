import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useListLoading from "../hooks/useListLoading";
import { FriendI } from "../interfaces/User";
import FriendCard from "./FriendCard";
import Loading from "./Loading";

function ActivityFriends() {
    const [friends, setFriends] = useState<Array<FriendI>>();
    const { userId } = useParams();
    const route = `users/${userId}/friends`;
    const {
        list,
        isThereMoreFromList: isThereMoreFriends,
        loadMoreFromList,
    } = useListLoading<FriendI>(10, route, "friends");

    useEffect(() => {
        setFriends(list);
    }, [list]);
    if (!friends) return <Loading />;
    return (
        <section className="friends">
            {friends.map((friend) => {
                return <FriendCard friend={friend} key={friend._id} />;
            })}
            {isThereMoreFriends && (
                <button className="load-more" onClick={loadMoreFromList}>
                    Load more friends
                </button>
            )}
        </section>
    );
}
export default ActivityFriends;
