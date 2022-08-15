import he from "he";
import parse from "html-react-parser";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import PostI from "../interfaces/Post";
import { fetchAPI } from "../utils/fetchAPI";
import ImageBfr from "./ImageBfr";
import LikeButton from "./LikeButton";
import LinkButton from "./LinkButton";
import SettingsDropdown from "./SettingsDropdown";
import "./style/PostCard.scss";
import { CommentSvg } from "./SVG";
interface Props {
    post: PostI;
    children?: React.ReactNode;
    linkToPost?: boolean;
    postDeleted: (postId: string) => void;
    author?: string;
}
function PostCard({ author, post, children, postDeleted, linkToPost = true }: Props) {
    const [likesCount, setLikesCount] = useState(post.likesCount);
    const route = `/posts/${post._id}`;
    const updatedLikesCountCallback = (count: number) => {
        setLikesCount((likesCount) => likesCount + count);
    };
    const deletePost = async () => {
        const res = await fetchAPI(route, "DELETE");
        if (res.status === 200) {
            postDeleted(post._id);
            NotificationManager.success("", "Post deleted");
        } else {
            NotificationManager.error(res.status + " " + res.body);
        }
    };
    return (
        <article key={post._id} id={post._id} className="post-card">
            <SettingsDropdown userId={author || post.author._id}>
                <li>
                    <Link to={`${route}/edit`}>Edit</Link>
                </li>
                <li>
                    <button onClick={deletePost}>delete</button>
                </li>
            </SettingsDropdown>
            {children}
            <WithLink link={linkToPost ? route : undefined}>
                <div className="content">{parse(he.decode(post.content))}</div>
                <ImageBfr image={post.image} type="post" />
            </WithLink>
            <div className="post-reactions">
                {!!likesCount && (
                    <Link to={route + "/likes"}>
                        <span>
                            {likesCount}
                            {" likes"}
                        </span>
                    </Link>
                )}
                {!!post.commentsCount && (
                    <span>
                        {post.commentsCount}
                        {" comments"}
                    </span>
                )}
            </div>
            <footer className="buttons">
                <div className="like-button">
                    <LikeButton
                        route={`${route}/likes`}
                        likedByUser={post.likedByUser}
                        updateLikesCountBy={updatedLikesCountCallback}
                    />
                </div>
                <div className="comment-button">
                    <Link to={`${route}/comments/`}>
                        <CommentSvg />
                    </Link>
                </div>
                <div className="share-button">
                    <LinkButton link={route} />
                </div>
            </footer>
        </article>
    );
}
const WithLink = (props: { link?: string; children: any }) =>
    props.link ? (
        <Link className="link-wrapper" to={props.link}>
            {props.children}
        </Link>
    ) : (
        <div className="content-container">{props.children}</div>
    );

export default PostCard;
