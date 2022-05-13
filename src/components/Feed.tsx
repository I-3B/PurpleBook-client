import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useListLoading from "../hooks/useListLoading";
import PostI from "../interfaces/Post";
import Author from "./Author";
import Loading from "./Loading";
import PostCard from "./PostCard";
import PostedAt from "./PostedAt";
import "./style/Feed.scss";
function Feed() {
    const [posts, setPosts] = useState<Array<PostI>>([]);
    const {
        list,
        isThereMoreFromList: isThereMorePosts,
        loadMoreFromList,
    } = useListLoading(10, "/posts/feed", "posts");

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

    if (!posts.length) return <Loading />;
    return (
        <section className="feed">
            <Link to="/new-post">Add post</Link>
            {posts.map((post) => {
                return (
                    <PostCard
                        linkToPost={true}
                        key={post._id}
                        post={post}
                        postDeleted={postDeletedCallback}
                    >
                        <header>
                            <Author author={post.author} />
                            <PostedAt createdAt={post.createdAt} />
                        </header>
                    </PostCard>
                );
            })}
            {isThereMorePosts && <button onClick={loadMoreFromList}>Show more posts</button>}
        </section>
    );
}
export default Feed;
