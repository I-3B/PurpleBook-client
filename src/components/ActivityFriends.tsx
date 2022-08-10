import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useListLoading from "../hooks/useListLoading";
import { UserWithStateI } from "../interfaces/User";
import { FriendCard } from "./FriendComponents";
import Loading from "./Loading";

function ActivityFriends() {
    const [friends, setFriends] = useState<Array<UserWithStateI>>([]);
    const { userId } = useParams();
    const route = `users/${userId}/friends`;
    const { list, isLoading } = useListLoading<UserWithStateI>(0, route, "friends");

    useEffect(() => {
        setFriends(list);
    }, [list]);
    return (
        <section className="friends">
            {friends.map((friend) => {
                return <FriendCard friend={friend} key={friend._id} />;
            })}

            {isLoading && <Loading />}
        </section>
    );
}
export default ActivityFriends;
