import ActivitySection from "./ActivitySection";
import "./style/ProfilePage.scss";
import UserSection from "./UserSection";
function ProfilePage(props: { show: string }) {
    return (
        <div className="profile-page">
            <UserSection />
            <ActivitySection show={props.show} />
        </div>
    );
}

export default ProfilePage;
