import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useListLoading from "../hooks/useListLoading";
import { UserMini } from "../interfaces/User";
import FriendList from "./FriendList";
import Loading from "./Loading";

function ActivityFriends() {
    const [friends, setFriends] = useState<Array<UserMini>>();
    const { userId } = useParams();
    const route = `users/${userId}/friends`;
    const {
        list,
        isThereMoreFromList: isThereMoreFriends,
        loadMoreFromList,
    } = useListLoading<UserMini>(10, route, "friends");

    useEffect(() => {
        setFriends(list);
    }, [list]);
    if (!friends) return <Loading />;
    return (
        <section className="friends">
            <FriendList friends={friends} />
            {isThereMoreFriends && (
                <button className="load-more" onClick={loadMoreFromList}>
                    Load more friends
                </button>
            )}
        </section>
    );
}
export default ActivityFriends;
