import { useState } from "react";
import ActivitySection from "./ActivitySection";
import "./style/ProfilePage.scss";
import UserSection from "./UserSection";
function ProfilePage(props: { show: string }) {
    const [found, setFound] = useState(false);
    return (
        <div className="profile-page">
            <UserSection setFound={setFound} />
            {found && <ActivitySection show={props.show} />}
        </div>
    );
}

export default ProfilePage;
