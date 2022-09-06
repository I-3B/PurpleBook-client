import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { useParams } from "react-router-dom";
import { BufferData } from "../interfaces/User";
import { fetchAPI } from "../utils/fetchAPI";
import { isString } from "../utils/isString";
import FriendButtons from "./FriendButtons";
import ImageBfr from "./ImageBfr";
import Loading from "./Loading";
import Message from "./Message";
interface Props {
    setFound: React.Dispatch<React.SetStateAction<boolean>>;
}
function UserSection({ setFound }: Props) {
    const { userId } = useParams();
    const [userData, setUserData] = useState<UserProfileI>();
    const [isLoading, setIsLoading] = useState(false);
    const [found, setFoundLocal] = useState(true);
    const getUserData = async () => {
        setIsLoading(true);
        const res = await fetchAPI(`users/${userId}`);
        setIsLoading(false);
        if (res.status === 200) {
            setUserData(res.body.user);
            setFoundLocal(true);
        } else if (res.status === 404) {
            setFoundLocal(false);
        } else {
            NotificationManager.error(`${res.status} ${isString(res.body)}`);
        }
    };
    useEffect(() => {
        getUserData();
    }, [userId]);
    useEffect(() => {
        setFound(found);
    }, [found]);
    if (!found) return <Message>User not Found</Message>;
    if (!userData || isLoading) return <Loading />;
    return (
        <section className="user">
            <ImageBfr image={userData.imageFull} type="profile" />
            <h1>{userData.firstName + " " + userData.lastName}</h1>
            <time>User since: {new Date(userData.createdAt).toLocaleDateString()}</time>
            <FriendButtons initialFriendState={userData.friendState} friendId={userData._id} />
        </section>
    );
}
interface UserProfileI {
    _id: string;
    firstName: string;
    lastName: string;
    imageFull: BufferData;
    createdAt: Date;
    friendState: string;
}
export default UserSection;
