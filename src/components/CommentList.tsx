import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useListLoading from "../hooks/useListLoading";
import CommentI from "../interfaces/Comment";
import { fetchAPI } from "../utils/fetchAPI";
import CommentCard from "./CommentCard";
import Loading from "./Loading";
interface Props {
    commentToEdit: (commentContent: string) => void;
    commentUpdated?: { id: string; content: string };
}
function CommentList({ commentToEdit, commentUpdated }: Props) {
    const { postId, commentId } = useParams();
    const route = `/posts/${postId}`;
    const {
        setList: setCommentList,
        isThereMoreFromList: isThereMoreComments,
        loadMoreFromList: loadMoreComments,
        list,
    } = useListLoading<CommentI>(10, `${route}/comments`, "comments");
    const [comments, setComments] = useState<Array<CommentI>>();
    const location = useLocation().pathname;
    const goToComment = location.includes("comments");
    const editComment = location.includes("edit");
    const [goneToComments, setGoneToComments] = useState(false);
    const getComment = async () => {
        const res = await fetchAPI(`${route}/comments/${commentId}`);
        if (res.status !== 404) {
            setComments([res.body.comment]);
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
    const commentDeleteCallback = (deletedCommentId: string) => {
        setCommentList(() => {
            return list?.filter((comment) => {
                return comment._id !== deletedCommentId;
            });
        });
    };
    useEffect(() => {
        setCommentList((comments) => {
            const editedCommentIndex = comments.findIndex(
                (comment) => comment._id === commentUpdated?.id
            );
            if (editedCommentIndex > -1) {
                comments[editedCommentIndex].content = commentUpdated?.content || "";
            }
            return comments;
        });
    }, [commentUpdated]);
    useEffect(() => {
        if (commentId) getComment();
        else {
            setComments(list);
        }
    }, [commentId, editComment, list]);
    useEffect(() => {
        if (comments && editComment) commentToEdit(comments[0]?.content);
    }, [comments, editComment]);
    useEffect(() => {
        if (goToComment) {
            unHighlightAllComments();
            if (commentId && comments && !editComment) {
                goTo(document.getElementById(commentId));
                highlight(document.getElementById(commentId));
            } else if (!goneToComments) {
                goTo(document.querySelector(".comments"));
                setGoneToComments(true);
            }
        }
    }, [comments, commentId, goToComment, editComment]);

    if (!comments) return <Loading />;
    return (
        <>
            {comments.map((comment) => {
                return (
                    <CommentCard
                        comment={comment}
                        key={comment._id}
                        postId={postId || ""}
                        commentDeleted={commentDeleteCallback}
                    />
                );
            })}
            {isThereMoreComments && !commentId && (
                <button onClick={loadMoreComments}>Show more Comments</button>
            )}
        </>
    );
}
export default CommentList;
