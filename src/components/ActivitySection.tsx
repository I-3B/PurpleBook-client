import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ActivityComments from "./ActivityComments";
import ActivityFriends from "./ActivityFriends";
import ActivityPosts from "./ActivityPosts";
interface Props {
    show: string;
}
function ActivitySection({ show }: Props) {
    const [list, setList] = useState(<></>);
    const postsLink = useRef() as React.MutableRefObject<HTMLAnchorElement>;
    const commentsLink = useRef() as React.MutableRefObject<HTMLAnchorElement>;
    const friendsLink = useRef() as React.MutableRefObject<HTMLAnchorElement>;

    const { userId } = useParams();
    const route = `/users/${userId}`;
    const showPosts = async () => {
        postsLink.current.classList.add("active");
        commentsLink.current.classList.remove("active");
        friendsLink.current.classList.remove("active");
        setList(<ActivityPosts />);
    };
    const showComments = () => {
        commentsLink.current.classList.add("active");
        postsLink.current.classList.remove("active");
        friendsLink.current.classList.remove("active");
        setList(<ActivityComments />);
    };
    const showFriends = () => {
        friendsLink.current.classList.add("active");
        postsLink.current.classList.remove("active");
        commentsLink.current.classList.remove("active");
        setList(<ActivityFriends />);
    };
    useEffect(() => {
        switch (show) {
            case "posts":
                showPosts();
                break;
            case "comments":
                showComments();
                break;
            case "friends":
                showFriends();
                break;
        }
    }, [show]);
    return (
        <section className="activity">
            <div className="nav-buttons">
                <Link ref={postsLink} to={`${route}`}>
                    Posts
                </Link>
                <Link ref={commentsLink} to={`${route}/comments`}>
                    Comments
                </Link>
                <Link ref={friendsLink} to={`${route}/friends`}>
                    Friends
                </Link>
            </div>
            {list}
        </section>
    );
}

export default ActivitySection;
