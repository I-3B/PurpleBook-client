import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/fetchAPI";
function useListLoading<Type>(limit: number, route: string, listType: string) {
    const [list, setList] = useState<Array<Type>>([]);
    const [skip, setSkip] = useState(0);
    const [isThereMoreFromList, setIsThereMorePosts] = useState(true);
    const fetchMoreToList = async (skip: number) => {
        const res = await fetchAPI(`${route}/?limit=${limit}&skip=${skip}`);
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
        setList,
        loadMoreFromList: () => {
            setSkip((skip) => {
                return skip + limit;
            });
        },
    };
}
export default useListLoading;
