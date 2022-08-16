import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { fetchAPI } from "../utils/fetchAPI";
function useListLoading<Type>(limit: number, route: string, listType: string) {
    const [list, setList] = useState<Array<Type>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const [isThereMoreFromList, setIsThereMorePosts] = useState(true);
    const fetchMoreToList = async (skip: number) => {
        setIsLoading(true);
        const res = await fetchAPI(`${route}/?limit=${limit}&skip=${skip}`);
        setIsLoading(false);
        if (res.status !== 200) {
            return NotificationManager.error(`${res.status} ${res.body}`);
        }
        if (
            res.body[listType] == null ||
            typeof res.body[listType][Symbol.iterator] !== "function"
        ) {
            return NotificationManager.error("Something went wrong :(");
        }
        setList((list) => {
            return [...list, ...res.body[listType]];
        });

        if (res.body[listType].length < limit) {
            setIsThereMorePosts(false);
        }
    };
    useEffect(() => {
        if (route) fetchMoreToList(skip);
    }, [skip, route]);
    return {
        isThereMoreFromList,
        list,
        isLoading,
        setList,
        loadMoreFromList: () => {
            setSkip((skip) => {
                return skip + limit;
            });
        },
    };
}
export default useListLoading;
