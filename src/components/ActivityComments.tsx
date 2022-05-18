import he from "he";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { Link, useParams } from "react-router-dom";
import { HOST } from "..";
import useListLoading from "../hooks/useListLoading";
import { fetchAPI } from "../utils/fetchAPI";
import LikeButton from "./LikeButton";
import LinkButton from "./LinkButton";
import Loading from "./Loading";
import PostedAt from "./PostedAt";
import SettingsDropdown from "./SettingsDropdown";
interface postPreview {
    _id: string;
    postAuthorFirstName: string;
    contentPreview: string;
}
interface CommentProfileI {
    _id: string;
    post: postPreview;
    content: string;
    likesCount: number;
    createdAt: Date;
    likedByUser: boolean;
}
function ActivityComments() {
    const { userId } = useParams();
    const route = `users/${userId}/comments`;
    const [comments, setComments] = useState<Array<CommentProfileI>>([]);
    const {
        list,
        isThereMoreFromList: isThereMoreComments,
        loadMoreFromList,
    } = useListLoading<CommentProfileI>(10, route, "comments");

    const commentDeletedCallback = (commentId: string) => {
        setComments((comments) => {
            return comments.filter((comment) => {
                return comment._id !== commentId;
            });
        });
    };
    useEffect(() => {
        setComments(list);
    }, [list]);

    if (!comments.length) return <Loading />;
    return (
        <section className="posts">
            {comments.map((comment) => {
                return (
                    <CommentProfile
                        key={comment._id}
                        comment={comment}
                        commentDeleted={commentDeletedCallback}
                    />
                );
            })}
            {isThereMoreComments && (
                <button className="load-more" onClick={loadMoreFromList}>
                    Show more posts
                </button>
            )}
        </section>
    );
}
interface cpProps {
    comment: CommentProfileI;
    commentDeleted: (commentId: string) => void;
}
function CommentProfile({ comment, commentDeleted }: cpProps) {
    const { userId } = useParams();
    const postRoute = `/posts/${comment.post._id}`;
    const commentRoute = `${postRoute}/comments/${comment._id}`;
    const [likesCount, setLikesCount] = useState(comment.likesCount);
    const deleteComment = async () => {
        const res = await fetchAPI(commentRoute, "DELETE");
        if (res.status === 200) {
            NotificationManager.success("", "Post deleted");
            commentDeleted(comment._id);
        } else {
            NotificationManager.error(`${res.status} ${res.body}`);
        }
    };
    const updatedLikesCountCallback = (updateBy: number) => {
        setLikesCount((likes) => {
            return likes + updateBy;
        });
    };
    return (
        <article key={comment._id} id={comment._id} className="comment">
            <SettingsDropdown userId={userId}>
                <li>
                    <a href={`${commentRoute}/edit`}>Edit</a>
                </li>
                <li>
                    <button onClick={deleteComment}>Delete</button>
                </li>
            </SettingsDropdown>
            <Link to={commentRoute}>
                <header>
                    <CommentedOn post={comment.post} />
                    <PostedAt createdAt={comment.createdAt} />
                </header>
                <div>{parse(he.decode(comment.content))}</div>
                <div className="buttons">
                    <LikeButton
                        route={`${commentRoute}/likes`}
                        likedByUser={comment.likedByUser}
                        updateLikesCountBy={updatedLikesCountCallback}
                    />
                    <span>{likesCount}</span>
                    <LinkButton link={`${HOST}${commentRoute}`} />
                </div>
            </Link>
        </article>
    );
}
interface CommentedOnProps {
    post: postPreview;
}
function CommentedOn({ post }: CommentedOnProps) {
    return (
        <p>
            on {post.postAuthorFirstName}'s: <br />"{post.contentPreview}..."
        </p>
    );
}
export default ActivityComments;
