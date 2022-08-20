import he from "he";
import parse from "html-react-parser";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import CommentI from "../interfaces/Comment";
import { fetchAPI } from "../utils/fetchAPI";
import LikeButton from "./LikeButton";
import LinkButton from "./LinkButton";
import PostedAt from "./PostedAt";
import SettingsDropdown from "./SettingsDropdown";
import "./style/Comment.scss";
import UserAddress from "./UserAddress";
interface Props {
    comment: CommentI;
    postId: string;
    commentDeleted: (commentId: string) => void;
}
function CommentCard({ comment, postId, commentDeleted }: Props) {
    const [likesCount, setLikesCount] = useState(comment.likesCount);
    const route = `/posts/${postId}/comments/${comment._id}`;
    const updatedLikesCountCallback = (count: number) => {
        setLikesCount((likesCount) => likesCount + count);
    };
    const deleteComment = async () => {
        const res = await fetchAPI(route, "DELETE");
        if (res.status === 200) {
            commentDeleted(comment._id);
            NotificationManager.success("", "Comment deleted", 1000);
        } else {
            NotificationManager.error(`${res.status} ${res.body}`);
        }
    };
    return (
        <article key={comment._id} id={comment._id} className="comment">
            <SettingsDropdown userId={comment.author._id}>
                <li>
                    <Link to={`${route}/edit`}>Edit</Link>
                </li>
                <li>
                    <button onClick={deleteComment}>Delete</button>
                </li>
            </SettingsDropdown>
            <header>
                <UserAddress user={comment.author} />
                <PostedAt createdAt={comment.createdAt} />
            </header>
            <div className="content">{parse(he.decode(comment.content))}</div>
            <div className="buttons">
                <LikeButton
                    route={`${route}/likes`}
                    likedByUser={comment.likedByUser}
                    updateLikesCountBy={updatedLikesCountCallback}
                />
                <Link to={route + "/likes"}>
                    <span>{likesCount}</span>
                </Link>
                <LinkButton link={route} />
            </div>
        </article>
    );
}
export default CommentCard;
