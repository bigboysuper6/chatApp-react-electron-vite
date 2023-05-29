import { useEffect, useState } from "react";

const useSearch = (initialValue: any, searchRef: any, filterFn: any) => {
    const [filters, setFilters] = useState(initialValue);
    useEffect(() => {
        setFilters(initialValue);
        handleInputChange();
    }, [initialValue]);
    const handleInputChange = () => {
        if (searchRef.current) {
            if (searchRef.current.value === "") {
                setFilters(initialValue);
            } else setFilters(initialValue.filter(filterFn));
        }
    };
    console.log(filters, "filters");

    return [filters, handleInputChange];
};

export default useSearch;
