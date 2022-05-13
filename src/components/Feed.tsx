import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostI from "../interfaces/Post";
import { fetchAPI } from "../utils/fetchAPI";
import Author from "./Author";
import Loading from "./Loading";
import PostCard from "./PostCard";
import PostedAt from "./PostedAt";
import "./style/Feed.scss";
function Feed() {
    const [posts, setPosts] = useState<Array<PostI>>([]);
    const [skip, setSkip] = useState(0);
    const [isThereMorePosts, setIsThereMorePosts] = useState(true);
    const limit = 10;
    const getFeed = async (skip: number) => {
        const res = await fetchAPI(`posts/feed/?skip=${skip}&limit=${limit}`);
        setPosts((posts) => {
            return [...posts, ...res.body.posts];
        });
        if (res.body.posts.length < limit) {
            setIsThereMorePosts(false);
        }
    };
    const postDeletedCallback = (postId: string) => {
        setPosts((posts) => {
            return posts.filter((post) => {
                return post._id !== postId;
            });
        });
    };
    const loadMorePosts = () => {
        setSkip((skip) => {
            return skip + limit;
        });
    };
    useEffect(() => {
        getFeed(skip);
    }, [skip]);
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
            {isThereMorePosts && <button onClick={loadMorePosts}>Show more posts</button>}
        </section>
    );
}
export default Feed;
