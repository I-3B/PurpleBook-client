import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useListLoading from "../hooks/useListLoading";
import { UserWithStateI } from "../interfaces/User";
import { FriendCard } from "./FriendComponents";
import Loading from "./Loading";
import WithEmptyMessage from "./WithEmptyMessage";

function ActivityFriends() {
    const [friends, setFriends] = useState<Array<UserWithStateI>>([]);
    const { userId } = useParams();
    const route = `users/${userId}/friends`;
    const { list, isLoading, isThereMoreFromList, loadMoreFromList } =
        useListLoading<UserWithStateI>(5, route, "friends");

    useEffect(() => {
        setFriends(list);
    }, [list]);
    return (
        <section className="friends">
            <WithEmptyMessage show={!friends.length && !isLoading} message="No friends ಥ_ಥ">
                {friends.map((friend) => {
                    return <FriendCard friend={friend} key={friend._id} />;
                })}
                {isThereMoreFromList && !isLoading && (
                    <button className="load-more" onClick={loadMoreFromList}>
                        Show more friends
                    </button>
                )}
                {isLoading && <Loading />}
            </WithEmptyMessage>
        </section>
    );
}
export default ActivityFriends;
