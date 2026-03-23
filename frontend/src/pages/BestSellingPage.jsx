import React, { useEffect, useState } from 'react';
import { Header } from '../components/Layout/Header';
import styles from '../styles/styles';
import { productData } from '../static/data';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import Footer from '../components/Layout/Footer';

const BestSellingPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Sort logic: descending order based on total_sell
    const d = productData ? [...productData].sort((a, b) => b.total_sell - a.total_sell) : [];
    setData(d);
    
    // Pro-tip: Scroll to top when user enters this page
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.length !== 0 ? (
            data.map((i, index) => (
              <ProductCard data={i} key={i.id || index} />
            ))
          ) : (
            <div className="w-full text-center py-10">
               <h1 className="text-[22px] font-[600]">No Best Selling Products Found!</h1>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingPage;