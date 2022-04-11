import { Children } from "react";

function Message(props: { children: React.ReactNode }) {
    return (
        <div>
            {Children.map(props.children, (child) => (
                <> {child}</>
            ))}
        </div>
    );
}
export default Message;
