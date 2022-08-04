import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/fetchAPI";
function useListLoading<Type>(limit: number, route: string, listType: string) {
    const [list, setList] = useState<Array<Type>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const [isThereMoreFromList, setIsThereMorePosts] = useState(true);
    const fetchMoreToList = async (skip: number) => {
        setIsLoading(true);
        //TODO remove for production
        await new Promise((r) => setTimeout(r, 500));
        const res = await fetchAPI(`${route}/?limit=${limit}&skip=${skip}`);
        setIsLoading(false);
        setList((list) => {
            return [...list, ...res.body[listType]];
        });

        if (res.body[listType].length < limit) {
            setIsThereMorePosts(false);
        }
    };
    useEffect(() => {
        fetchMoreToList(skip);
    }, [skip]);
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
