import he from "he";
import parse from "html-react-parser";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HOST } from "..";
import PostI from "../interfaces/Post";
import ImageBfr from "./ImageBfr";
import LikeButton from "./LikeButton";
import LinkButton from "./LinkButton";
import "./style/PostCard.scss";
import { CommentSvg } from "./SVG";
interface Props {
    post: PostI;
    children: React.ReactNode;
    linkToPost: boolean;
}
function PostCard({ post, children, linkToPost = true }: Props) {
    const [likesCount, setLikesCount] = useState(post.likesCount);
    const route = `/posts/${post._id}`;
    const updatedLikesCountCallback = (count: number) => {
        setLikesCount((likesCount) => likesCount + count);
    };
    return (
        <article key={post._id} id={post._id} className="post-card">
            {children}
            <WithLink link={linkToPost ? route : undefined}>
                <div className="content">{parse(he.decode(post.content))}</div>
                <ImageBfr image={post.image} type="post" />
            </WithLink>
            <div className="post-reactions">
                {!!likesCount && (
                    <span>
                        {likesCount}
                        {" likes"}
                    </span>
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
                    <LinkButton link={`${HOST}/${route}`} />
                </div>
            </footer>
        </article>
    );
}
const WithLink = (props: { link?: string; children: any }) =>
    props.link ? (
        <a className="link-wrapper" href={props.link}>
            {props.children}
        </a>
    ) : (
        props.children
    );

export default PostCard;
