import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import styles from "../../styles/styles";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img src={data?.image_Url?.[0]?.url} alt="" className="w-[80%]" />
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>{data.discount_price}$</h4>
                  <h3 className={`${styles.price}`}>{data.price ? data.price + "$" : null}</h3>
                </div>
                {/* Add to cart / buttons logic here */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;