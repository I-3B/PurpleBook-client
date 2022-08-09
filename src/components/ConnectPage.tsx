import { useEffect } from "react";
import useListLoading from "../hooks/useListLoading";
import { friendRequestI, RecommendI } from "../interfaces/User";
import { fetchAPI } from "../utils/fetchAPI";
import { FriendRecommendCard, FriendRequestCard } from "./FriendComponents";
import { HeaderRefI } from "./Header";
import Loading from "./Loading";
import "./style/ConnectPage.scss";
interface ConnectPageI {
    HeaderRef: React.RefObject<HeaderRefI>;
}
function ConnectPage({ HeaderRef }: ConnectPageI) {
    const userId = localStorage.getItem("userId");
    const route = `users/${userId}/friend_requests`;

    // FRQ friend request
    const { list: FRQ, isLoading: FRQIsLoading } = useListLoading<friendRequestI>(
        0,
        route,
        "friendRequests"
    );
    //TODO put 15 for production
    // FRC friend recommendation
    const {
        list: FRC,
        isLoading: FRCIsLoading,
        isThereMoreFromList: isThereMoreFRC,
        loadMoreFromList: loadMoreFRC,
    } = useListLoading<RecommendI>(
        2,
        `/users/${userId}/friend_recommendation`,
        "friendRecommendation"
    );
    useEffect(() => {
        if (FRQ.length) {
            fetchAPI(route, "PATCH");
            HeaderRef.current?.emptyFriendRequests();
        }
    }, [FRQ, route, HeaderRef]);
    return (
        <div className="connect-page">
            <section className="friend-requests">
                <header>Friend requests</header>
                {FRQ.map((friendRequest) => {
                    return (
                        <FriendRequestCard
                            friendRequest={friendRequest}
                            key={friendRequest.user._id}
                        />
                    );
                })}
                {FRQIsLoading && <Loading />}
            </section>
            <section className="friend-recommendation">
                <header>Friend recommendation</header>
                {FRC.map((FRC) => {
                    return <FriendRecommendCard friendRecommendation={FRC} key={FRC._id} />;
                })}
                {FRCIsLoading && <Loading />}
                {isThereMoreFRC && !FRCIsLoading && (
                    <button onClick={loadMoreFRC}>Show more recommendation</button>
                )}
            </section>
        </div>
    );
}
export default ConnectPage;
