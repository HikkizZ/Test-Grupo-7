import { useState, useCallback } from 'react';
import { createNews, getNews, getNewsById, updateNews, deleteNews } from '@services/news.service';

export function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNews();
      setNews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNewsById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNewsById(id);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewsItem = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const newNews = await createNews(data);
      setNews(prevNews => [...prevNews, newNews]);
      return newNews;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateNewsItem = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const updatedNews = await updateNews(data, id);
      setNews(prevNews => prevNews.map(item => item.id === id ? updatedNews : item));
      return updatedNews;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteNewsItem = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteNews(id);
      setNews(prevNews => prevNews.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    news,
    loading,
    error,
    fetchNews,
    fetchNewsById,
    createNewsItem,
    updateNewsItem,
    deleteNewsItem
  };
}
