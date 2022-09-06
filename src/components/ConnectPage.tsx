import { useEffect } from "react";
import useListLoading from "../hooks/useListLoading";
import { friendRequestI, RecommendI } from "../interfaces/User";
import { fetchAPI } from "../utils/fetchAPI";
import { FriendRecommendCard, FriendRequestCard } from "./FriendComponents";
import { HeaderRefI } from "./Header";
import Loading from "./Loading";
import "./style/ConnectPage.scss";
import WithEmptyMessage from "./WithEmptyMessage";
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
    // FRC friend recommendation
    const {
        list: FRC,
        isLoading: FRCIsLoading,
        isThereMoreFromList: isThereMoreFRC,
        loadMoreFromList: loadMoreFRC,
    } = useListLoading<RecommendI>(
        5,
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
                <WithEmptyMessage show={!FRQ.length && !FRQIsLoading} message="Wow, such empty ⚆_⚆">
                    {FRQ.map((friendRequest) => {
                        return (
                            <FriendRequestCard
                                friendRequest={friendRequest}
                                key={friendRequest.user._id}
                            />
                        );
                    })}
                    {FRQIsLoading && <Loading />}
                </WithEmptyMessage>
            </section>
            <section className="friend-recommendation">
                <header>Friend recommendations</header>
                <WithEmptyMessage show={!FRC.length && !FRCIsLoading} message="Wow, such empty ⚆_⚆">
                    {FRC.map((FRC) => {
                        return <FriendRecommendCard friendRecommendation={FRC} key={FRC._id} />;
                    })}
                    {FRCIsLoading && <Loading />}
                    {isThereMoreFRC && !FRCIsLoading && (
                        <button onClick={loadMoreFRC}>Show more recommendations</button>
                    )}
                </WithEmptyMessage>
            </section>
        </div>
    );
}
export default ConnectPage;
