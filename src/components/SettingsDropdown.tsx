import "./style/SettingsDropdown.scss";
const userId = localStorage.getItem("userId");
function SettingsDropdown(props: { children: React.ReactNode; userId?: string }) {
    const toggleActive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const kebab = e.currentTarget;
        kebab.querySelector(".middle")?.classList.toggle("active");
        kebab.querySelector(".cross")?.classList.toggle("active");
        kebab.querySelector(".dropdown")?.classList.toggle("active");
    };
    if (props.userId === userId || !props.userId)
        return (
            <div className="kebab-container">
                <div className="kebab" onClick={toggleActive}>
                    <figure></figure>
                    <figure className="middle"></figure>
                    <p className="cross">x</p>
                    <figure></figure>
                    <ul className="dropdown">{props.children}</ul>
                </div>
            </div>
        );
    return <></>;
}
export default SettingsDropdown;
