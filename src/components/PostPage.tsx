import he from "he";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommentI from "../interfaces/Comment";
import PostI from "../interfaces/Post";
import { responseError } from "../interfaces/responseError";
import { fetchAPI, fetchAPIForm } from "../utils/fetchAPI";
import Author from "./Author";
import Comment from "./Comment";
import Editor from "./Editor";
import Loading from "./Loading";
import Message from "./Message";
import PostCard from "./PostCard";
import PostedAt from "./PostedAt";
import "./style/PostPage.scss";
function PostPage() {
    const editorTextRef = useRef<{ getText: () => string; setText: (value: string) => void }>();
    const [post, setPost] = useState<PostI>();
    const [comments, setComments] = useState<Array<CommentI>>();
    const [error, setError] = useState("");
    const [commentFormError, setCommentFormError] = useState<Array<responseError>>();
    const { postId, commentId } = useParams();
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const route = `/posts/${postId}`;
    const goToComment = location.includes("comments");
    const editComment = location.includes("edit");

    const getPost = async () => {
        const res = await fetchAPI(`posts/${postId}`);
        if (res.status === 404) {
            setError(res.status + " " + res.body);
        } else {
            setPost(res.body.post);
        }
    };
    const getComment = async () => {
        const res = await fetchAPI(`${route}/comments/${commentId}`);
        if (res.status !== 404) {
            setComments([res.body.comment]);
        }
    };
    const getComments = async () => {
        const res = await fetchAPI(`${route}/comments`);
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
    const unHighlightAllComments = () => {
        Array.from(document.querySelectorAll(".comment")).forEach((comment) =>
            comment.classList.remove("highlight")
        );
    };
    const newCommentSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitButton = e.currentTarget.querySelector(
            "input[type=submit]"
        ) as HTMLInputElement;
        submitButton.disabled = true;
        const editorText = editorTextRef.current?.getText();
        const res = await fetchAPIForm(`${route}/comments`, "POST", {
            content: editorText || "",
        });
        submitButton.disabled = false;
        if (res.status === 400) {
            setCommentFormError(res.body.errors);
        } else if (res.status === 201) {
            setCommentFormError(undefined);
            editorTextRef.current?.setText("");
            setComments(undefined);
            await getComments();
            navigate(`${route}/comments/${res.body.commentId}`);
        }
    };
    const editCommentSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitButton = e.currentTarget.querySelector(
            "input[type=submit]"
        ) as HTMLInputElement;
        submitButton.disabled = true;
        const editorText = editorTextRef.current?.getText();
        const res = await fetchAPIForm(`${route}/comments/${commentId}`, "PATCH", {
            content: editorText || "",
        });
        submitButton.disabled = false;
        if (res.status === 400) {
            setCommentFormError(res.body.errors);
        } else if (res.status === 200) {
            setCommentFormError(undefined);
            editorTextRef.current?.setText("");
            setComments(undefined);
            await getComments();
            navigate(`${route}/comments/${commentId}`);
        }
    };
    const postDeletedCallback = () => {
        navigate("/");
    };
    const commentDeleteCallback = (deletedCommentId: string) => {
        if (commentId) getComments();
        else
            setComments((comments) => {
                return comments?.filter((comment) => {
                    return comment._id !== deletedCommentId;
                });
            });
    };
    useEffect(() => {
        getPost();
    }, []);
    useEffect(() => {
        if (commentId) getComment();
        else getComments();
    }, [commentId]);
    useEffect(() => {
        if (goToComment) {
            if (commentId && comments && !editComment) {
                goTo(document.getElementById(commentId));
                highlight(document.getElementById(commentId));
            } else {
                goTo(document.querySelector(".comments"));
                unHighlightAllComments();
            }
        }
    }, [comments, commentId, goToComment, editComment]);
    useEffect(() => {
        if (editComment && comments) {
            editorTextRef.current?.setText(he.decode(comments[0].content));
        } else {
            editorTextRef.current?.setText("");
        }
    }, [editComment, comments]);
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
                    <Author author={post.author} />
                    <PostedAt createdAt={post.createdAt} />
                </header>
            </PostCard>
            <section className="comments">
                <header>Comments</header>
                {post._id && (
                    <form
                        className="comment-form"
                        onSubmit={editComment ? editCommentSubmitted : newCommentSubmitted}
                    >
                        <header>{editComment ? "Edit comment" : "Add comment"}</header>
                        <Editor ref={editorTextRef} />
                        <input type="submit" value={editComment ? "Edit" : "Add"} />
                        {commentFormError && (
                            <ul>
                                {commentFormError.map((error, index) => {
                                    return (
                                        <li key={index} className="error">
                                            {error.msg};
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </form>
                )}
                {(() => {
                    if (!comments) return <Loading />;
                    return comments.map((comment) => {
                        return (
                            <Comment
                                comment={comment}
                                key={comment._id}
                                postId={post._id}
                                commentDeleted={commentDeleteCallback}
                            />
                        );
                    });
                })()}
            </section>
        </div>
    );
}
export default PostPage;
