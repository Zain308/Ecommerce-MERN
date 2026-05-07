import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../../redux/actions/product";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { backend_url } from "../../server";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {

    if (data && data.shop && data.shop._id) {
      dispatch(getAllProductsShop(data.shop._id));
    }
  }, [dispatch, data]);

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleMessageSubmit = () => {
    // NEW: Updated to match the video's navigate path
    navigate("/inbox?conversation=507ebjver884ehfdjeriv84");
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
                  src={data?.image_Url ? data.image_Url[select]?.url : `${backend_url}${data?.images?.[select]}`}
                  alt={data?.name}
                  className="w-[80%] object-contain h-[400px] transition-opacity duration-300"
                />
                <div className="w-full flex mt-5 overflow-x-auto">
                  {/* Map over whichever image array actually exists */}
                  {(data?.image_Url || data?.images || []).map((i, index) => (
                    <div
                      key={index}
                      className={`${
                        select === index ? "border-[2px] border-[#3957db]" : "border"
                      } cursor-pointer mr-3 shadow-sm rounded-md overflow-hidden min-w-[120px]`}
                      onClick={() => setSelect(index)}
                    >
                      <img
                        src={data?.image_Url ? i.url : `${backend_url}${i}`}
                        alt=""
                        className="h-[120px] w-full object-contain p-2 bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Product Content */}
              <div className="w-full 800px:w-[50%] pt-5 px-5">
                <h1 className={`${styles.productTitle} !text-[25px] font-[600] text-[#333]`}>
                  {data.name}
                </h1>
                <p className="text-[16px] text-[#444] leading-7 text-justify mt-3 font-Inter">
                  {data.description}
                </p>

                <div className="flex pt-5 items-center">
                  <h4 className={`${styles.productDiscountPrice} !text-[22px]`}>
                    {data.discountPrice}$
                  </h4>
                  {data.originalPrice && (
                    <h3 className={`${styles.price} pl-3 !text-[18px] line-through text-[#d55b45]`}>
                      {data.originalPrice}$
                    </h3>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div className="flex">
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 active:scale-95 transition"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-6 py-[8px] flex items-center justify-center">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 active:scale-95 transition"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div onClick={() => setClick(!click)} className="cursor-pointer">
                    {click ? (
                      <AiFillHeart size={30} color="red" title="Remove from wishlist" />
                    ) : (
                      <AiOutlineHeart size={30} color="#333" title="Add to wishlist" />
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <div className={`${styles.button} !mt-10 !rounded !h-11 flex items-center justify-center cursor-pointer !bg-[#000] hover:bg-gray-800 transition`}>
                  <span className="text-white flex items-center font-[600]">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>

                {/* Shop Section */}
                <div className="flex items-center justify-between pt-8 border-t mt-8">
                  <div className="flex items-center">
                    <Link to={`/shop/preview/${data?.shop?._id}`}>
                      <img
                        src={`${backend_url}${data?.shop?.avatar}`}
                        alt={data?.shop?.name}
                        className="w-[50px] h-[50px] rounded-full mr-2 object-cover border"
                      />
                    </Link>
                    <div>
                      <Link to={`/shop/preview/${data?.shop?._id}`}>
                        <h3 className={`${styles.shop_name} pb-1 pt-1`}>{data?.shop?.name}</h3>
                      </Link>
                      <h5 className="pb-3 text-[15px]">({data?.shop?.ratings || 0}) Ratings</h5>
                    </div>
                  </div>

                  <div
                    className={`${styles.button} !bg-[#6443d1] !mt-0 !rounded !h-11 flex items-center justify-center px-4 cursor-pointer`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center font-[500]">
                      Send Message <AiOutlineMessage className="ml-2" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NEW: Pass the fetched 'products' array to the bottom section so it knows the total count */}
          <ProductDetailsInfo data={data} products={products} />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data, products }) => {
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
            {data.description}
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
                src={`${backend_url}${data?.shop?.avatar}`}
                className="w-[50px] h-[50px] rounded-full"
                alt=""
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data?.shop?.name}</h3>
                <h5 className="pb-2 text-[15px]">
                  ({data?.shop?.ratings || 0}) Ratings
                </h5>
              </div>
            </div>
              <p className="pt-2">
                {data?.shop?.description}
              </p>
          </div>

          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
              <div className="text-left">
                <h5 className="font-[600]">
                  Joined on: <span className="font-[500]">{data?.shop?.createdAt?.slice(0, 10)}</span>
                </h5>
                <h5 className="font-[600] pt-3">
                  {/* NEW: Use the actual length of the products array we just fetched from Redux! */}
                  Total Products: <span className="font-[500]">{products && products.length}</span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Reviews: <span className="font-[500]">0</span>
                </h5>
                <Link to={`/shop/preview/${data?.shop?._id}`}>
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