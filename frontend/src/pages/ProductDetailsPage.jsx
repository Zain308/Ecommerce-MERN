import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import { Header } from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { productData } from "../static/data";
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const {allProducts} = useSelector((state)=>state.products);
  const {allEvents} = useSelector((state)=>state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if(eventData != null){
      const data = allEvents && allEvents.find((i)=>i._id === id);
      setData(data);
    }else{
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [data,allProducts,allEvents]); // Re-runs when URL parameter "name" changes

  return (
    <div className="bg-white">
      <Header />
      {data ? (
        <>
          <ProductDetails data={data} />
          {
            !eventData && (
              <>
                {data && <SuggestedProduct data={data} />}
              </>
            )
          }
          
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