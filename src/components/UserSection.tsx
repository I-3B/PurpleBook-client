import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BufferData } from "../interfaces/User";
import { fetchAPI } from "../utils/fetchAPI";
import ImageBfr from "./ImageBfr";
import Loading from "./Loading";
function UserSection() {
    const { userId } = useParams();
    const [userData, setUserData] = useState<UserProfileI>();
    const getUserData = async () => {
        const res = await fetchAPI(`users/${userId}`);
        setUserData(res.body.user);
    };
    useEffect(() => {
        getUserData();
    }, []);
    if (!userData) return <Loading />;
    return (
        <section className="user">
            <ImageBfr image={userData.imageFull} type="profile" />
            <h1>{userData.firstName + " " + userData.lastName}</h1>
            <time>User since: {new Date(userData.createdAt).toLocaleDateString()}</time>
            <button className="toggle-friend">Add friend</button>
        </section>
    );
}
interface UserProfileI {
    firstName: string;
    lastName: string;
    imageFull: BufferData;
    createdAt: Date;
}
export default UserSection;
