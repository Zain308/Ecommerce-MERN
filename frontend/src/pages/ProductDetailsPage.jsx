import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import { Header } from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { productData } from "../static/data";
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx";

const ProductDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // FIX: Optimized string matching (case-insensitive)
    const productName = name.replace(/-/g, " ");
    const product = productData.find((i) => i.name.toLowerCase() === productName.toLowerCase());
    setData(product);

    // FIX: Scroll to top whenever the product changes
    window.scrollTo(0, 0);
  }, [name]); // Re-runs when URL parameter "name" changes

  return (
    <div className="bg-white">
      <Header />
      {data ? (
        <>
          <ProductDetails data={data} />
          {/* Only show suggestions if data exists */}
          <SuggestedProduct data={data} />
        </>
      ) : (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center">
           <h1 className="text-2xl font-semibold text-gray-700">Product Not Found</h1>
           <p className="text-gray-500 mt-2">The item you are looking for does not exist or has been removed.</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;