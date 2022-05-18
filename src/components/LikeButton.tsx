import { useEffect, useRef, useState } from "react";
import { fetchAPI } from "../utils/fetchAPI";
import { HeartSvg } from "./SVG";

interface Props {
    route: string;
    likedByUser: boolean;
    updateLikesCountBy: (updateBy: number) => void;
}
function LikeButton({ route, likedByUser, updateLikesCountBy }: Props) {
    const [liked, setLiked] = useState(likedByUser);
    const isInitialMount = useRef(true);
    const toggleLike = () => {
        setLiked((liked) => {
            return !liked;
        });
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (liked) {
                fetchAPI(route, "POST");
                updateLikesCountBy(+1);
            } else {
                fetchAPI(route, "DELETE");
                updateLikesCountBy(-1);
            }
        }
    }, [liked, route]);
    return (
        <button onClick={toggleLike}>
            <HeartSvg isFilled={liked} />
        </button>
    );
}
export default LikeButton;
