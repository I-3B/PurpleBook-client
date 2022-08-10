import { useParams } from "react-router-dom";
import useListLoading from "../hooks/useListLoading";
import { UserWithStateI } from "../interfaces/User";
import { FriendCard } from "./FriendComponents";
import Loading from "./Loading";
import "./style/LikesPage.scss";
interface LikesPageProps {}
function LikesPage({}: LikesPageProps) {
    const { postId, commentId } = useParams();
    let route = `posts/${postId}`;
    if (commentId) route += `/comments/${commentId}`;
    route += "/likes";

    const { list, isLoading, isThereMoreFromList, loadMoreFromList } =
        useListLoading<UserWithStateI>(10, route, "users");
    return (
        <section className="likes-page">
            {list.map((user) => {
                return <FriendCard friend={user} key={user._id} />;
            })}
            {isLoading && <Loading />}
            {isThereMoreFromList && !isLoading && (
                <button onClick={loadMoreFromList}>Show more</button>
            )}
        </section>
    );
}
export default LikesPage;
