import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useListLoading from "../hooks/useListLoading";
import PostI from "../interfaces/Post";
import Loading from "./Loading";
import PostCard from "./PostCard";
import PostedAt from "./PostedAt";
function ActivityPosts() {
    const { userId } = useParams();
    const route = `users/${userId}/posts`;
    const [posts, setPosts] = useState<Array<PostI>>([]);
    const {
        list,
        isLoading,
        isThereMoreFromList: isThereMorePosts,
        loadMoreFromList,
    } = useListLoading<PostI>(10, route, "posts");

    const postDeletedCallback = (postId: string) => {
        setPosts((posts) => {
            return posts.filter((post) => {
                return post._id !== postId;
            });
        });
    };
    useEffect(() => {
        setPosts(list);
    }, [list]);

    return (
        <section className="posts">
            {posts.map((post) => {
                return (
                    <PostCard
                        linkToPost={true}
                        key={post._id}
                        post={post}
                        postDeleted={postDeletedCallback}
                        author={userId}
                    >
                        <header>
                            <PostedAt createdAt={post.createdAt} />
                        </header>
                    </PostCard>
                );
            })}
            {isThereMorePosts && !isLoading && (
                <button className="load-more" onClick={loadMoreFromList}>
                    Show more posts
                </button>
            )}
            {isLoading && <Loading />}
        </section>
    );
}
export default ActivityPosts;
