import { useEffect } from "react";
import { Link } from "react-router-dom";
import useListLoading from "../hooks/useListLoading";
import { BufferData } from "../interfaces/User";
import { fetchAPI } from "../utils/fetchAPI";
import { HeaderRefI } from "./Header";
import ImageBfr from "./ImageBfr";
import Loading from "./Loading";
import PostedAt from "./PostedAt";
import "./style/NotificationsPage.scss";
import WithEmptyMessage from "./WithEmptyMessage";
interface LinkI {
    linkId: string;
    ref: string;
}
interface NotificationI {
    _id: string;
    image: BufferData;
    links: Array<LinkI>;
    content: string;
    viewed: boolean;
    createdAt: Date;
}
interface NotificationsPageProps {
    HeaderRef: React.RefObject<HeaderRefI>;
}
function NotificationsPage({ HeaderRef }: NotificationsPageProps) {
    const route = "/notifications";
    const { list, isLoading, isThereMoreFromList, loadMoreFromList } =
        useListLoading<NotificationI>(10, route, "notifications");
    useEffect(() => {
        if (list.length) {
            fetchAPI(route, "PATCH");
            HeaderRef.current?.emptyNotifications();
        }
    }, [list, HeaderRef]);
    return (
        <section className="notifications-page">
            <header>Notifications</header>
            <WithEmptyMessage show={!list.length && !isLoading} message=" Wow, such empty ⚆_⚆">
                {list.map((notification) => {
                    return <NotificationCard notification={notification} key={notification._id} />;
                })}
                {isLoading && <Loading />}
                {!isLoading && isThereMoreFromList && (
                    <button onClick={loadMoreFromList}>show more notifications</button>
                )}
            </WithEmptyMessage>
        </section>
    );
}
interface NotificationCardProps {
    notification: NotificationI;
}
function NotificationCard({ notification }: NotificationCardProps) {
    const { notificationLink, imageLink } = getLinks(notification.links);

    return (
        <article className={"notification-card ".concat(notification.viewed ? "" : "not-viewed")}>
            <Link to={imageLink} className="image-link">
                <ImageBfr image={notification.image} type="profile" />
            </Link>
            <Link to={notificationLink} className="notification-link">
                <span>{notification.content}</span>
            </Link>
            <PostedAt createdAt={notification.createdAt} />
        </article>
    );
}
function getLinks(links: Array<LinkI>) {
    let userId, postId, commentId;
    links.forEach((link) => {
        switch (link.ref) {
            case "User":
                userId = link.linkId;
                break;
            case "Post":
                postId = link.linkId;
                break;
            case "Comment":
                commentId = link.linkId;
                break;
        }
    });
    const imageLink = `/users/${userId}`;
    let notificationLink;
    if (commentId) {
        notificationLink = `/posts/${postId}/comments/${commentId}`;
    } else if (postId) {
        notificationLink = `/posts/${postId}`;
    } else {
        notificationLink = imageLink;
    }
    return { notificationLink, imageLink };
}
export default NotificationsPage;
