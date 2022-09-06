import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import usePrevious from "../components/usePrevious";
import { fetchAPI } from "../utils/fetchAPI";
import { isString } from "../utils/isString";
function useListLoading<Type>(limit: number, route: string, listType: string, sort?: string) {
    const [list, setList] = useState<Array<Type>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const [sortChanged, setSortChanged] = useState(false);
    const [isThereMoreFromList, setIsThereMorePosts] = useState(true);
    const previousSort = usePrevious(sort);
    const fetchMoreToList = async (skip: number) => {
        setIsLoading(true);
        const res = await fetchAPI(`${route}/?limit=${limit}&skip=${skip}&sort=${sort}`);
        if (res.status !== 200) {
            setIsLoading(false);
            return NotificationManager.error(`${res.status} ${isString(res.body)}`);
        }
        if (
            res.body[listType] == null ||
            typeof res.body[listType][Symbol.iterator] !== "function"
        ) {
            setIsLoading(false);
            return NotificationManager.error("Something went wrong :(");
        }
        setList((list) => {
            return [...list, ...res.body[listType]];
        });
        setIsLoading(false);

        if (res.body[listType].length < limit) {
            setIsThereMorePosts(false);
        }
    };
    useEffect(() => {
        if (sort && previousSort) {
            setSkip(0);
            setList([]);
            setSortChanged((sortChanged) => !sortChanged);
        }
    }, [sort]);
    useEffect(() => {
        if (route) {
            fetchMoreToList(skip);
        }
    }, [skip, route, sortChanged]);
    useEffect(() => {
        setSkip(0);
        setList([]);
    }, [route]);
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
