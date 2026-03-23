import React, { useEffect, useState } from 'react';
import { productData } from '../../static/data';
import styles from '../../styles/styles';
import ProductCard from "../Route/ProductCard/ProductCard";

const SuggestedProduct = ({ data }) => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        if (data) {
            // Filter products of same category but exclude current product
            const filteredData = productData && productData.filter((i) => 
                i.category.toLowerCase() === data?.category?.toLowerCase() && 
                i.name !== data.name
            );
            setProducts(filteredData);
        }
    }, [data]); // data is the correct dependency here

    return (
        <div className="bg-white">
            {products && products.length !== 0 ? (
                <div className={`p-4 ${styles.section}`}>
                    <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
                        Related Products
                    </h2>
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                        {products.map((i, index) => (
                            <ProductCard data={i} key={index} />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SuggestedProduct;