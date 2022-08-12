import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { useNavigate, useParams } from "react-router-dom";
import PostI from "../interfaces/Post";
import { fetchAPI } from "../utils/fetchAPI";
import CommentSection from "./CommentSection";
import Loading from "./Loading";
import Message from "./Message";
import PostCard from "./PostCard";
import PostedAt from "./PostedAt";
import "./style/PostPage.scss";
import UserAddress from "./UserAddress";
function PostPage() {
    const [post, setPost] = useState<PostI>();
    const [error, setError] = useState("");
    const { postId } = useParams();
    const navigate = useNavigate();

    const route = `/posts/${postId}`;

    const getPost = async () => {
        const res = await fetchAPI(`posts/${postId}`);
        if (res.status === 404) {
            setError(res.status + " " + res.body);
        } else if (res.status === 200) {
            setPost(res.body.post);
        } else {
            NotificationManager.error(`${res.status} ${res.body}`);
        }
    };

    const postDeletedCallback = () => {
        navigate("/");
    };

    useEffect(() => {
        getPost();
    }, []);

    if (error)
        return (
            <Message>
                <p>{error}</p>
            </Message>
        );
    if (!post) return <Loading />;
    return (
        <div className="post-comments-container">
            <PostCard
                linkToPost={false}
                key={post._id}
                post={post}
                postDeleted={postDeletedCallback}
            >
                <header>
                    <UserAddress user={post.author} />
                    <PostedAt createdAt={post.createdAt} />
                </header>
            </PostCard>
            <CommentSection />
        </div>
    );
}
export default PostPage;
