import { useEffect, useState } from "react";
import Post from "../interfaces/Post";
import { fetchAPI } from "../utils/fetchAPI";
import "./style/Feed.scss";
function Feed() {
    const [posts, setPosts] = useState<Array<Post>>([]);
    const getFeed = async () => {
        const response = await fetchAPI("/posts/feed", "GET");
        setPosts(response.body.posts);
    };
    useEffect(() => {
        getFeed();
    }, []);
    return (
        <section className="feed">
            {posts.map((post) => {
                return (
                    <article key={post._id} id={post._id}>
                        <a href={`posts/${post._id}`}>{post.content}</a>
                    </article>
                );
            })}
        </section>
    );
}
export default Feed;
