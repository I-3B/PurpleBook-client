import "./style/PostedAt.scss";
interface Props {
    createdAt: Date;
}

function PostedAt({ createdAt }: Props) {
    return (
        <time
            className="posted-at"
            dateTime={createdAt.toString()}
            title={new Date(createdAt).toDateString()}
        >
            {getDateFormatted(createdAt)}
        </time>
    );
}
const getDateFormatted = (createdAt: Date): string => {
    const diffTime = Math.abs(new Date().valueOf() - new Date(createdAt).valueOf());
    let days = diffTime / (24 * 60 * 60 * 1000);
    let hours = (days % 1) * 24;
    let minutes = (hours % 1) * 60;
    let secs = (minutes % 1) * 60;
    [days, hours, minutes, secs] = [
        Math.floor(days),
        Math.floor(hours),
        Math.floor(minutes),
        Math.floor(secs),
    ];
    let timeElapsed: string = "";

    if (days > 7) return new Date(createdAt).toLocaleDateString();
    else if (days > 0) timeElapsed = days + " days";
    else if (hours > 0) timeElapsed = hours + " hours";
    else if (minutes > 0) timeElapsed = minutes + " minutes";
    else timeElapsed = secs + " seconds";

    return timeElapsed + " ago";
};
export default PostedAt;
