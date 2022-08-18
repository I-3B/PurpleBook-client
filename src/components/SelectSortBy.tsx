import "./style/SelectSortBy.scss";
interface Props {
    setSort: React.Dispatch<React.SetStateAction<string>>;
    sort: string;
}

function SelectSortBy({ setSort, sort }: Props) {
    const sortChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const select = e.target;
        setSort(select.options[select.selectedIndex].value);
    };
    return (
        <div className="sort-by-container">
            <label htmlFor="sort-by-posts">Sort by: </label>
            <select
                id="sort-by-posts"
                className="sort-by"
                onChange={sortChanged}
                defaultValue={sort === "likes" ? "likes" : "date"}
            >
                <option value="likes">Most liked</option>
                <option value="date">Date (Newer)</option>
            </select>
        </div>
    );
}
export default SelectSortBy;
