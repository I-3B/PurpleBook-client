import { useEffect, useState } from "react";
import Post from "../interfaces/Post";
import { fetchAPI } from "../utils/fetchAPI";
import Image from "./Image";
import Loading from "./Loading";
import "./style/Feed.scss";
function Feed() {
    const [posts, setPosts] = useState<Array<Post>>([]);
    const getFeed = async () => {
        const res = await fetchAPI("/posts/feed");
        setPosts(res.body.posts);
    };
    useEffect(() => {
        getFeed();
    }, []);
    if (!posts.length) return <Loading />;
    return (
        <section className="feed">
            {posts.map((post) => {
                return (
                    <article key={post._id} id={post._id}>
                        <header>
                            <address className="author">
                                <a rel="author" href={"/users/" + post.author._id}>
                                    <Image image={post.author.imageMini} type="profile"></Image>
                                    <span>
                                        {post.author.firstName + " " + post.author.lastName}
                                    </span>
                                </a>
                            </address>
                            <time
                                dateTime={post.updatedAt.toString()}
                                title={post.updatedAt.toLocaleString()}
                            >
                                {post.updatedAt.toString()}
                            </time>
                        </header>
                        <div className="content">{post.content}</div>
                        <Image image={post.image} type="post" />
                        <div>
                            <span>
                                {post.likesCount}
                                {" likes"}
                            </span>
                            <span>
                                {post.commentsCount}
                                {" comments"}
                            </span>
                        </div>
                        <div>
                            <button>like</button>
                            <button>comment</button>
                            <button>copy link</button>
                        </div>
                    </article>
                );
            })}
        </section>
    );
}
export default Feed;
