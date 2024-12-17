import { useState, useMemo } from "react";

export function useSearchsNews(news) {
    const [searchQuery, setSearchQuery] = useState("");

    const searchResults = useMemo(() => {
        if (!searchQuery) return news;
        return news.filter((newsItem) => {
            const titleMatch = newsItem.tituloNews.toLowerCase().includes(searchQuery.toLowerCase());
            const authorMatch = newsItem.nombreAutor.toLowerCase().includes(searchQuery.toLowerCase());
            return titleMatch || authorMatch;
        });
    }, [searchQuery, news]);

    return {
        searchQuery,
        setSearchQuery,
        searchResults,
    };
}

