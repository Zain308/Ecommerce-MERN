import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import styles from "../../styles/styles";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleMessageSubmit = () => {
    // Logic to initiate a chat with the seller
    console.log("Message submitted");
  };

  return (
    <div className="bg-white min-h-[100vh]">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] pb-10`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              {/* Left Side: Images */}
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data?.image_Url?.[select]?.url}
                  alt=""
                  className="w-[80%] object-contain h-[400px]"
                />
                <div className="w-full flex mt-5">
                  {data &&
                    data.image_Url.map((i, index) => (
                      <div
                        key={index}
                        className={`${
                          select === index
                            ? "border-[2px] border-[#3957db]"
                            : ""
                        } cursor-pointer mr-3 shadow-sm rounded-md overflow-hidden`}
                        onClick={() => setSelect(index)}
                      >
                        <img
                          src={i.url}
                          alt=""
                          className="h-[120px] w-[120px] object-contain p-2"
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Right Side: Product Content */}
              <div className="w-full 800px:w-[50%] pt-5">
                <h1
                  className={`${styles.productTitle} !text-[25px] font-[600] text-[#333]`}
                >
                  {data.name}
                </h1>
                <p className="text-[16px] text-[#444] leading-7 text-justify mt-3 font-Inter">
                  {data.description}
                </p>

                <div className="flex pt-5 items-center">
                  <h4 className={`${styles.productDiscountPrice} !text-[22px]`}>
                    {data.discount_price}$
                  </h4>
                  <h3 className={`${styles.price} pl-3 !text-[18px]`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>

                {/* Quantity & Wishlist Buttons */}
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div className="flex">
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition active:scale-95"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[8px] flex items-center justify-center min-w-[40px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition active:scale-95"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color="red"
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color="#333"
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div
                  className={`${styles.button} !mt-10 !rounded !h-11 flex items-center justify-center cursor-pointer !bg-[#000] hover:opacity-80 transition`}
                >
                  <span className="text-white flex items-center font-[600]">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>

                {/* NEW: Shop Info & Send Message Section */}
                <div className="flex items-center justify-between pt-8">
                  <div className="flex items-center">
                    <Link to={`/shop/preview/${data?.shop?._id}`}>
                      <img
                        src={data?.shop?.shop_avatar?.url}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full mr-2"
                      />
                    </Link>
                    <div>
                      <Link to={`/shop/preview/${data?.shop?._id}`}>
                        <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                          {data?.shop?.name}
                        </h3>
                      </Link>
                      <h5 className="pb-3 text-[15px]">
                        ({data?.shop?.ratings}) Ratings
                      </h5>
                    </div>
                  </div>

                  <div
                    className={`${styles.button} !bg-[#6443d1] mt-4 !rounded !h-11 flex items-center justify-center px-4 cursor-pointer`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center font-[500]">
                      Send Message <AiOutlineMessage className="ml-2" />
                    </span>
                  </div>
                </div>
                {/* End Shop Section */}
              </div>
            </div>
          </div>

          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>

          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>

          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>

          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>

      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Product details are a crucial part of any eCommerce website or
            online marketplace. These details help the potential customers to
            make an informed decision about the product they are interested in
            buying. A well-written product description can also be a powerful
            marketing tool that can help to increase sales. Product details
            typically include information about the product's features,
            specifications, dimensions, weight, materials, and other relevant
            information that can help language, and be honest and transparent
            about the product's features and limitations.
          </p>

          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            customers to understand the product better. The product details
            section should also include high-quality images and videos of the
            product, as well as customer reviews and ratings. When writing
            product details, it is essential to keep the target audience in
            mind. The language used should be clear and easy to understand, and
            technical terms should be explained in simple language. The tone of
            the product details should be persuasive, highlighting the unique
            features of the
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p>No Reviews yet!</p>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                className="w-[50px] h-[50px] rounded-full"
                alt=""
              />

              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tenetur doloribus aliquam magni fuga commodi unde architecto
                possimus non hic impedit corrupti nihil dolorum quis cumque
                facere, temporibus neque, quibusdam dolor.
              </p>
          </div>

          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
              <div className="text-left">
                <h5 className="font-[600]">
                  Joined on: <span className="font-[500]">@15 March 2026</span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Products: <span className="font-[500]">1233</span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Reviews: <span className="font-[500]">234</span>
                </h5>
                <Link to="/">
                  <div className={`${styles.button} rounded-[4px] h-[39.5px] mt-3`}>
                      <h4 className="text-white">Visit Shop</h4>
                  </div>
                </Link>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
