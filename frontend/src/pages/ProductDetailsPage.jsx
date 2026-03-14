import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import { Header } from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { productData } from "../static/data";
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx"

const ProductDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const productName = name.replace(/-/g, " ");
    const product = productData.find((i) => i.name === productName);
    setData(product);
  }, [name]);

  return (
    <div>
      <Header />
      {data ? (
        <ProductDetails data={data} />
      ) : (
        <div className="w-full h-[50vh] flex items-center justify-center">
           <h1 className="text-xl font-medium">Product loading or not found...</h1>
        </div>
      )}

      {
        data && <SuggestedProduct data={data} />
      }
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;