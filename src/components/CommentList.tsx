import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { useLocation, useParams } from "react-router-dom";
import useListLoading from "../hooks/useListLoading";
import CommentI from "../interfaces/Comment";
import { fetchAPI } from "../utils/fetchAPI";
import { isString } from "../utils/isString";
import CommentCard from "./CommentCard";
import Loading from "./Loading";
import WithEmptyMessage from "./WithEmptyMessage";
interface Props {
    commentToEdit: (commentContent: string) => void;
    commentUpdated?: { id: string; content: string };
    sortBy: string;
}
function CommentList({ commentToEdit, commentUpdated, sortBy }: Props) {
    const { postId, commentId } = useParams();
    const route = `posts/${postId}/comments`;
    const [commentsRoute, setCommentsRoute] = useState("");
    const [localIsLoading, setLocalIsLoading] = useState(false);
    const {
        setList: setCommentList,
        isThereMoreFromList: isThereMoreComments,
        loadMoreFromList: loadMoreComments,
        isLoading,
        list,
    } = useListLoading<CommentI>(10, commentsRoute, "comments", sortBy);
    const [comments, setComments] = useState<Array<CommentI>>([]);

    const location = useLocation().pathname;
    const goToComment = location.includes("comments");
    const editComment = location.includes("edit");
    const [goneToComments, setGoneToComments] = useState(false);
    const getComment = async () => {
        setLocalIsLoading(true);
        const res = await fetchAPI(`${route}/${commentId}`);
        if (res.status === 200) {
            setLocalIsLoading(false);
            setComments([res.body.comment]);
        } else {
            NotificationManager.error(`${res.status}: Comment ${isString(res.body)}`);
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
    const commentDeleteCallback = (deletedCommentId: string) => {
        setCommentList(() => {
            return list?.filter((comment) => {
                return comment._id !== deletedCommentId;
            });
        });
    };
    useEffect(() => {
        setLocalIsLoading(isLoading);
    }, [isLoading]);
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
        if (commentId) {
            setCommentsRoute("");
            getComment();
        } else {
            setCommentsRoute(route);
            setComments(list);
        }
    }, [commentId, editComment, list]);
    useEffect(() => {
        if (comments && editComment) commentToEdit(comments[0]?.content);
    }, [comments, editComment]);
    useEffect(() => {
        if (goToComment) {
            if (commentId && comments && !editComment) {
                goTo(document.getElementById(commentId));
                highlight(document.getElementById(commentId));
            } else if (!goneToComments) {
                goTo(document.querySelector(".comments"));
                setGoneToComments(true);
            }
        }
    }, [comments, commentId, goToComment, editComment]);

    return (
        <WithEmptyMessage
            show={!comments.length && !localIsLoading}
            message="No comments, for now..."
        >
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
            {isThereMoreComments && !commentId && !isLoading && (
                <button onClick={loadMoreComments}>Show more Comments</button>
            )}
            {localIsLoading && <Loading />}
        </WithEmptyMessage>
    );
}
export default CommentList;
