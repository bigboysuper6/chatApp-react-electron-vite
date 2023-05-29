import { ReactComponent as SearchSvg } from "@assets/search.svg";
import { forwardRef } from "react";
type ISearchProps = { handleInputChange: () => void };
const Search = forwardRef(function Search(
    { handleInputChange }: ISearchProps,
    ref: any
) {
    return (
        <>
            <div className="input-group search">
                <div className="input-group-text">
                    <SearchSvg />
                </div>
                <input
                    onChange={handleInputChange}
                    ref={ref}
                    type="text"
                    className="form-control form-control-lg ps-0"
                    placeholder="搜索"
                    aria-label="Search for messages or users..."
                />
            </div>
        </>
    );
});
export default Search;
