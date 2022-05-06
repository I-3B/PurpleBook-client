import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentI from "../interfaces/Comment";
import PostI from "../interfaces/Post";
import { fetchAPI, fetchAPIForm } from "../utils/fetchAPI";
import Author from "./Author";
import Comment from "./Comment";
import Editor from "./Editor";
import Loading from "./Loading";
import Message from "./Message";
import PostCard from "./PostCard";
import PostedAt from "./PostedAt";
import "./style/PostPage.scss";

interface Props {
    goToComment?: boolean;
}
function PostPage({ goToComment }: Props) {
    const editorTextRef = useRef<{ getText: () => string; setText: (value: string) => void }>();
    const [post, setPost] = useState<PostI>();
    const [comments, setComments] = useState<Array<CommentI>>();
    const [error, setError] = useState("");
    const { postId, commentId } = useParams();
    const [commentText, setCommentText] = useState("");
    const navigate = useNavigate();
    const getPost = async () => {
        const res = await fetchAPI(`posts/${postId}`);
        if (res.status === 404) {
            setError(res.status + " " + res.body);
        } else {
            setPost(res.body.post);
        }
    };
    const getComments = async () => {
        const res = await fetchAPI(`posts/${postId}/comments/?`);
        if (res.status !== 404) {
            setComments(res.body.comments);
        }
    };
    const goTo = (element: Element | null) => {
        element?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    const highlight = (element: Element | null) => {
        element?.classList.add("highlight");
    };
    const newComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitButton = e.currentTarget.querySelector(
            "input[type=submit]"
        ) as HTMLInputElement;
        submitButton.disabled = true;
        const editorText = editorTextRef.current?.getText();
        const res = await fetchAPIForm(`posts/${post?._id}/comments`, "POST", {
            content: editorText || "",
        });
        submitButton.disabled = false;
        if (res.status === 400) {
            // setErrors(res.body.errors);
        } else if (res.status === 201) {
            editorTextRef.current?.setText("");
            await getComments();
            navigate(`/posts/${post?._id}/comments/${res.body.commentId}`);
        }
    };
    useEffect(() => {
        getPost();
        getComments();
    }, []);
    useEffect(() => {
        if (goToComment) {
            if (commentId && comments) {
                Array.from(document.querySelectorAll(".comment")).forEach((comment) =>
                    comment.classList.remove("highlight")
                );
                goTo(document.getElementById(commentId));
                highlight(document.getElementById(commentId));
            } else {
                goTo(document.getElementsByClassName("comments")[0]);
            }
        }
    }, [comments, commentId]);
    if (error)
        return (
            <Message>
                <p>{error}</p>
            </Message>
        );
    if (!post) return <Loading />;
    return (
        <div className="post-comments-container">
            <PostCard linkToPost={false} key={post._id} post={post}>
                <header>
                    <Author author={post.author} />
                    <PostedAt createdAt={post.createdAt} />
                </header>
            </PostCard>
            <section className="comments">
                <header>Comments</header>
                {post._id && (
                    <form className="comment-form" onSubmit={newComment}>
                        <header>Add comment</header>
                        <Editor ref={editorTextRef} />
                        <input type="submit" />
                    </form>
                )}
                {(() => {
                    if (!comments) return <Loading />;
                    return comments.map((comment) => {
                        return <Comment comment={comment} key={comment._id} postId={post._id} />;
                    });
                })()}
            </section>
        </div>
    );
}
export default PostPage;
