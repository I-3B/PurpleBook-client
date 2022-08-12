import { Children } from "react";
const style: React.CSSProperties = {
    textAlign: "center",
    fontSize: "3em",
    padding: "1em",
};
function Message(props: { children: React.ReactNode }) {
    return (
        <div style={style}>
            {Children.map(props.children, (child) => (
                <> {child}</>
            ))}
        </div>
    );
}
export default Message;
