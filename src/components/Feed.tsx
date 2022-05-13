import { useEffect, useState } from "react";
import PostI from "../interfaces/Post";
import { fetchAPI } from "../utils/fetchAPI";
import Author from "./Author";
import Loading from "./Loading";
import PostCard from "./PostCard";
import PostedAt from "./PostedAt";
import "./style/Feed.scss";
function Feed() {
    const [posts, setPosts] = useState<Array<PostI>>([]);

    const getFeed = async () => {
        const res = await fetchAPI("posts/feed");
        setPosts(res.body.posts);
    };
    const postDeletedCallback = (postId: string) => {
        setPosts((posts) => {
            return posts.filter((post) => {
                return post._id !== postId;
            });
        });
    };
    useEffect(() => {
        getFeed();
    }, []);
    if (!posts.length) return <Loading />;
    return (
        <section className="feed">
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
        </section>
    );
}
export default Feed;
