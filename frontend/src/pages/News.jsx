import { useState } from 'react';
import FormNews from '../components/News/formNews';
import ListNews from '../components/News/listNews';

export default function News() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  const handleSubmit = () => {
    setIsCreating(false);
    setEditingNews(null);
  };

  const handleEdit = (news) => {
    setEditingNews(news);
    setIsCreating(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Noticias</h1>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Nueva Noticia
          </button>
        )}
      </div>

      {isCreating ? (
        <FormNews
          initialData={editingNews}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsCreating(false);
            setEditingNews(null);
          }}
        />
      ) : (
        <ListNews onEdit={handleEdit} />
      )}
    </div>
  );
}

