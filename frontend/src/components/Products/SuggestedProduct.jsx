import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles';
import ProductCard from "../Route/ProductCard/ProductCard"; // Fixed import path
import { useSelector } from 'react-redux';

const SuggestedProduct = ({ data }) => {
    // FIX 1: Correctly grab allProducts from state (not null!)
    const { allProducts } = useSelector((state) => state.products);
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        if (data) {
            const filteredData = allProducts && allProducts.filter((i) => 
                i.category.toLowerCase() === data?.category?.toLowerCase() && 
                i.name !== data.name
            );
            setProductData(filteredData);
        }
    }, [data, allProducts]);

    return (
        <div className="bg-white">
            {productData && productData.length !== 0 ? (
                <div className={`p-4 ${styles.section}`}>
                    <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
                        Related Products
                    </h2>
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                        {/* FIX 2: Map over 'productData', not 'products' */}
                        {productData.map((i, index) => (
                            <ProductCard data={i} key={index} />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SuggestedProduct;