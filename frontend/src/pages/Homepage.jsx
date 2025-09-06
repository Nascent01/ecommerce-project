import { useState } from "react";
import { useEffect } from "react";  
import api from "../api";
import ProductList from "../components/Catalog/ProductList";
import ProductCategories from "../components/Catalog/ProductCategoriesFilter";

function Homepage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Всички");

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);
  
  useEffect(() => {
    api.get("/categories")
      .then((res) => {setCategories(res.data)})
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedCategory !== "Всички") {
      api.get(`/products/${selectedCategory}`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err));
    }
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-6 py-8">
      <ProductCategories categories={categories} setSelectedCategory={setSelectedCategory} />
      <ProductList products={products} />
    </div>
  );
}

export default Homepage;