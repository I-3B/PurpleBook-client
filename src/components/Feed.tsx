import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useListLoading from "../hooks/useListLoading";
import PostI from "../interfaces/Post";
import Loading from "./Loading";
import PostCard from "./PostCard";
import PostedAt from "./PostedAt";
import "./style/Feed.scss";
import UserAddress from "./UserAddress";
import WithEmptyMessage from "./WithEmptyMessage";
function Feed() {
    const [posts, setPosts] = useState<Array<PostI>>([]);
    const {
        list,
        isLoading,
        isThereMoreFromList: isThereMorePosts,
        loadMoreFromList,
    } = useListLoading<PostI>(10, "/posts/feed", "posts");

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
        <section className="feed">
            <Link to="/new-post">Add post</Link>
            <WithEmptyMessage
                show={!posts.length && !isLoading}
                message="No posts in your feed, try posting or adding friends."
            >
                {posts.map((post) => {
                    return (
                        <PostCard
                            linkToPost={true}
                            key={post._id}
                            post={post}
                            postDeleted={postDeletedCallback}
                        >
                            <header>
                                <UserAddress user={post.author} />
                                <PostedAt createdAt={post.createdAt} />
                            </header>
                        </PostCard>
                    );
                })}
            </WithEmptyMessage>
            {isLoading && <Loading />}
            {isThereMorePosts && !isLoading && (
                <button onClick={loadMoreFromList}>Show more posts</button>
            )}
        </section>
    );
}
export default Feed;
