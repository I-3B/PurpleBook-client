import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BufferData } from "../interfaces/User";
import { fetchAPI } from "../utils/fetchAPI";
import Image from "./Image";
import Loading from "./Loading";

function Profile() {
    const { userId } = useParams();
    const [userData, setUserData] = useState<User>();
    const getUserData = async () => {
        const res = await fetchAPI(`users/${userId}`);
        setUserData(res.body.user);
    };
    useEffect(() => {
        getUserData();
    }, []);
    if (!userData) return <Loading />;
    return (
        <section>
            <Image image={userData.imageFull} type="profile" />
            <p>{userData.firstName + " " + userData.lastName}</p>
        </section>
    );
}
interface User {
    firstName: string;
    lastName: string;
    imageFull: BufferData;
}
export default Profile;
