import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import InputField from '../../components/InputField';
import TextAreaField from '../../components/TextAreaField';
import MultiSelect from '../../components/MultiSelect';
import { Package, DollarSign, Tag, FileText } from 'lucide-react';

export default function CreateProduct() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: '',
    price: '',
    sku: '',
    description: '',
    category: ''
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEdit = Boolean(slug);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        const options = res.data.map(cat => ({ label: cat.name, value: cat.id }));
        setCategories(options);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const res = await api.get(`/product/${slug}`)
          setProductData({
            name: res.data.name,
            price: res.data.price,
            sku: res.data.sku,
            description: res.data.description,
            category: res.data.category || ''
          });
            setSelectedCategories(res.data.categories?.map(c => c.id) || []);
        } catch (err) {
          console.error('Failed to fetch product:', err);
        }
      };
      fetchProduct();
    }
  }, [slug, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload = { ...productData, category: selectedCategories };
      if (isEdit) {
        await api.put(`/products/update/${slug}`, payload);
        alert('Product updated successfully!');
      } else {
        await api.post('/products/store', payload);
        alert('Product created successfully!');
      }
      navigate('/admin/products');
    } catch (err) {
      console.error('Error submitting product:', err);
      setError('Failed to submit product.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-8 py-8">
      <div className="space-y-6">
        <InputField
          label="Product Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
          icon={<Package className="w-4 h-4 text-gray-500" />}
        />
        <InputField
          label="Price"
          name="price"
          type="number"
          value={productData.price}
          onChange={handleChange}
          placeholder="0.00"
          required
          icon={<DollarSign className="w-4 h-4 text-gray-500" />}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="SKU"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            placeholder="Product SKU"
            icon={<Tag className="w-4 h-4 text-gray-500" />}
          />
          <MultiSelect
            value={selectedCategories}
            label="Categories"
            options={categories}
            selectedValues={selectedCategories}
            onChange={setSelectedCategories}
            placeholder="Select categories"
            icon={<Tag className="w-4 h-4 text-gray-500" />}
          />
          <TextAreaField
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Describe your product..."
            required
            icon={<FileText className="w-5 h-5 text-gray-500" />}
          />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {isEdit ? 'Updating Product...' : 'Creating Product...'}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Package className="w-5 h-5 mr-2" />
              {isEdit ? 'Update Product' : 'Create Product'}
            </div>
          )}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
