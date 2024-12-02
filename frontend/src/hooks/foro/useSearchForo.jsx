import { useState, useMemo } from "react";

export function useSearchForo(foros) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFilter, setSearchFilter] = useState("");

    const searchResults = useMemo(() => {
        if (!searchQuery || !searchFilter) return foros;
        return foros.filter((foro) =>
            foro[searchFilter]
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, searchFilter, foros]);

    return {
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        searchResults,
    };
}
