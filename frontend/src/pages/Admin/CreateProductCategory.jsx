import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import InputField from '../../components/InputField';
import { Tag } from 'lucide-react';

export default function CreateOrEditProductCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEdit = Boolean(id);

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  useEffect(() => {
    if (isEdit) {
      const fetchCategory = async () => {
        try {
          const res = await api.get(`/category/${id}`);
          setCategoryName(res.data.name);
        } catch (err) {
          console.error('Failed to fetch category:', err);
          setError('Failed to load category data.');
        }
      };
      fetchCategory();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isEdit) {
        await api.put(`/categories/update/${id}`, { name: categoryName });
        alert('Category updated successfully!');
      } else {
        await api.post('/categories/store', { name: categoryName });
        alert('Category created successfully!');
      }
      navigate('/admin/product-categories');
    } catch (err) {
      console.error('Error saving category:', err);
      setError('Failed to save category.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-8 py-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        {isEdit ? 'Edit Category' : 'Create New Category'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Category Name"
          name="name"
          value={categoryName}
          onChange={handleChange}
          placeholder="Enter category name"
          required
          icon={<Tag className="w-4 h-4 text-gray-500" />}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isLoading ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update Category' : 'Create Category'}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
