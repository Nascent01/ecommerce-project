export default function ProductCategories({ setSelectedCategory, categories }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Product Categories</h2>
      <select
        name="categories"
        id="categories"
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Всички</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
