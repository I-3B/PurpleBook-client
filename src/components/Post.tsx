import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../interfaces/Comment";
import Post from "../interfaces/Post";
import { fetchAPI } from "../utils/fetchAPI";
import Loading from "./Loading";
import Message from "./Message";
import "./style/Feed.scss";
function Feed() {
    const [post, setPost] = useState<Post>();
    const [comments, setComments] = useState<Array<Comment>>();
    const [error, setError] = useState("");
    const { postId } = useParams();
    const getPost = async () => {
        const res = await fetchAPI(`/posts/${postId}`);
        if (res.status === 404) {
            setError(res.status + " " + res.body);
        } else {
            setPost(res.body.post);
        }
    };
    const getComments = async () => {
        const res = await fetchAPI(`/posts/${postId}/comments`);
        if (res.status !== 404) {
            setComments(res.body.comments);
        } else {
        }
    };
    useEffect(() => {
        getPost();
        getComments();
    }, []);
    if (error)
        return (
            <Message>
                <p>{error}</p>
            </Message>
        );
    if (!post) return <Loading />;
    return (
        <>
            <article key={post._id} id={post._id}>
                <p>{post.author.firstName + " " + post.author.lastName}</p>

                <p>{post.content}</p>
            </article>
            <section>
                {(() => {
                    if (!comments) return <Loading />;
                    return comments.map((comment) => {
                        return (
                            <article key={comment._id} id={comment._id}>
                                <p>{comment.author.firstName + " " + comment.author.lastName}</p>
                                <p>{comment.content}</p>
                            </article>
                        );
                    });
                })()}
            </section>
        </>
    );
}
export default Feed;
