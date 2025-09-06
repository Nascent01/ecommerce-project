import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../components/CartProvider";
import api from "../api";
import ProductImage from "../components/Catalog/ProductImage";
import ProductInformation from "../components/Catalog/ProductInformation";
import AddToCartButton from "../components/Catalog/AddToCartButton";

export default function Product() {
  const [product, setProduct] = useState(null);
  const { slug } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!slug) return;

    console.log("Fetching product with slug:", slug);

    api.get(`/product/${slug}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!product) {
    return <div className="text-center py-20">Loading product...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <ProductImage alt={product.name} className="w-full h-auto rounded-lg shadow" />
        </div>

        <div className="md:w-1/2">
          <ProductInformation product={product} />
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <AddToCartButton
              product={product}
              addToCart={addToCart}
              buttonClassName="group flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl cursor-pointer"
              iconClassName="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
}