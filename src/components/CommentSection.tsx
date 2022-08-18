import he from "he";
import { createBrowserHistory } from "history";
import { useEffect, useRef, useState } from "react";
import { NotificationManager } from "react-notifications";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { responseError } from "../interfaces/responseError";
import { fetchAPIForm } from "../utils/fetchAPI";
import CommentList from "./CommentList";
import Editor from "./Editor";
import SelectSortBy from "./SelectSortBy";
import "./style/CommentSection.scss";
import "./style/Form.scss";
function CommentSection() {
    const editorTextRef = useRef<{ getText: () => string; setText: (value: string) => void }>();
    const [commentFormError, setCommentFormError] = useState<Array<responseError>>();
    const [commentBeforeEditing, setCommentBeforeEditing] = useState<string>();
    const [commentUpdated, setCommentUpdated] = useState<{ id: string; content: string }>();
    const [sort, setSort] = useState("likes");
    const { postId, commentId } = useParams();
    const navigate = useNavigate();
    const location = useLocation().pathname;

    const editComment = location.includes("edit");
    const history = createBrowserHistory();
    const route = `/posts/${postId}`;

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
            navigate(`${route}/comments/${res.body.commentId}`);
        } else {
            NotificationManager.error(`${res.status} ${res.body}`);
        }
    };
    const editCommentSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitButton = e.currentTarget.querySelector(
            "input[type=submit]"
        ) as HTMLInputElement;
        submitButton.disabled = true;
        const editorText = editorTextRef.current?.getText() || "";
        const res = await fetchAPIForm(`${route}/comments/${commentId}`, "PATCH", {
            content: editorText,
        });
        submitButton.disabled = false;
        if (res.status === 400) {
            setCommentFormError(res.body.errors);
        } else if (res.status === 200) {
            setCommentFormError(undefined);
            editorTextRef.current?.setText("");
            setCommentUpdated({ id: commentId || "", content: editorText });
            navigate(`${route}/comments/${commentId}`);
        } else {
            NotificationManager.error(`${res.status} ${res.body}`);
        }
    };
    const cancelCommentEditing = () => {
        history.back();
    };
    const commentToEditCallback = (commentContent: string) => {
        setCommentBeforeEditing(commentContent);
    };
    useEffect(() => {
        if (editComment && commentBeforeEditing) {
            editorTextRef.current?.setText(he.decode(commentBeforeEditing));
        } else {
            editorTextRef.current?.setText("");
        }
    }, [editComment, commentBeforeEditing]);

    return (
        <section className="comments">
            <header>Comments</header>
            <form
                className="comment-form form"
                onSubmit={editComment ? editCommentSubmitted : newCommentSubmitted}
            >
                <header>{editComment ? "Edit comment" : "Add comment"}</header>
                <Editor ref={editorTextRef} />
                <div className="buttons">
                    <input type="submit" value={editComment ? "Edit" : "Add"} />
                    {editComment && (
                        <button type="button" onClick={cancelCommentEditing}>
                            Cancel
                        </button>
                    )}
                </div>
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
            <div className="comments-buttons">
                {commentId && <Link to={route + "/comments/"}>Show all comments</Link>}
                {!commentId && <SelectSortBy sort={sort} setSort={setSort} />}
            </div>
            <CommentList
                commentToEdit={commentToEditCallback}
                commentUpdated={commentUpdated}
                sortBy={sort}
            ></CommentList>
        </section>
    );
}
export default CommentSection;
