import { ReactComponent as SearchSvg } from "@assets/search.svg";
const Search = () => {
    return (
        <>
            <div className="input-group search">
                <div className="input-group-text">
                    <SearchSvg />
                </div>
                <input
                    type="text"
                    className="form-control form-control-lg ps-0"
                    placeholder="搜索"
                    aria-label="Search for messages or users..."
                />
            </div>
        </>
    );
};
export default Search;
