interface Props {
    children: React.ReactNode;
    show: boolean;
    message: string;
}

function WithEmptyMessage({ children, show, message }: Props) {
    const pStyle: React.CSSProperties = {
        textAlign: "center",
        fontSize: "2rem",
    };
    if (show) return <p style={pStyle}> {message}</p>;
    else return <>{children}</>;
}
export default WithEmptyMessage;
