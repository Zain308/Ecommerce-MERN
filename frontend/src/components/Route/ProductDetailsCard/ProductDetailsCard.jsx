import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { 
  AiFillHeart, 
  AiOutlineHeart, 
  AiOutlineMessage, 
  AiOutlineShoppingCart 
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify"
import { addTocart } from "../../../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../../../redux/actions/wishlist";


export const ProductDetailsCard = ({ setOpen, data }) => {
  const {wishlist} = useSelector((state)=>state.wishlist)
  
  const {cart} = useSelector((state)=>state.cart);
  const dispatch = useDispatch()
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => setCount(count + 1);

  const handleMessageSubmit = () => console.log("Send message clicked!");

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id)
    if(isItemExists){
      toast.error("Item already in cart!");
    }else{
      if(data.stock < count){
        toast.error("Product stock limited!")
      }else{
        const cartData = {...data, qty:count}
        dispatch(addTocart(cartData))
        toast.success("Item added to cart successfully!")
      }
    } 
  }

  const removeFromWishListHandler = (data) => {
          setClick(!click)
          dispatch(removeFromWishlist(data));
      }
  
      const addToWishListHandler = (data)=> {
          setClick(!click)
          dispatch(addToWishlist(data));
      }
  
      useEffect(()=> {
          if(wishlist && wishlist.find((i)=> i._id === data._id)){
              setClick(true);
          }else{
              setClick(false);
          }
      },[wishlist]);

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4 lg:p-10">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50 cursor-pointer"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex pt-5">
              {/* Left Side: Image and Shop Info */}
              <div className="w-full 800px:w-[50%] flex flex-col justify-between">
                <div>
                  <img 
                    src={data?.image_Url?.[0]?.url} 
                    alt={data?.name} 
                    className="w-[80%] mx-auto object-contain h-[300px]"
                  />
                  <div className="flex mt-4 items-center">
                    <img
                      src={data?.shop?.shop_avatar?.url}
                      alt={data?.shop?.name}
                      className="w-[50px] h-[50px] rounded-full mr-2 object-cover border"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>{data?.shop?.name}</h3>
                      <h5 className="pb-1 text-[15px]">({data?.shop?.ratings}) Ratings</h5>
                    </div>
                  </div>
                </div>

                <div className="pb-5">
                  <div
                    className={`${styles.button} !bg-[#000] !mt-4 !rounded-[4px] !h-[45px] px-4 cursor-pointer flex items-center justify-center !w-max`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-[#fff] flex items-center font-[500] whitespace-nowrap text-[15px]">
                      Send Message <AiOutlineMessage className="ml-2" size={18} />
                    </span>
                  </div>
                  <h5 className="text-[16px] text-[red] mt-5 font-[500]">
                    ({data?.total_sell}) Sold out
                  </h5>
                </div>
              </div>

              {/* Right Side: Content and Actions */}
              <div className="w-full 800px:w-[50%] pt-5 pl-[10px] pr-[10px]">
                <h1 className={`${styles.productTitle} text-[22px] font-[600] text-[#333] leading-tight`}>
                  {data?.name}
                </h1>
                
                <p className="mt-4 text-[15px] leading-[25px] text-[#444] text-justify font-Inter h-[150px] overflow-y-auto pr-2">
                  {data?.description}
                </p>

                <div className="flex pt-5 items-center">
                  <h4 className={`${styles.productDiscountPrice} text-[20px]`}>
                    {data?.discount_price}$
                  </h4>
                  {data?.price && (
                    <h3 className={`${styles.price} pl-3 text-[16px] line-through`}>
                      {data.price}$
                    </h3>
                  )}
                </div>

                {/* Controls Section */}
                <div className="flex justify-between items-center mt-10 pr-3">
                  <div className="flex items-center">
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
                  
                  <div onClick={() => setClick(!click)} className="cursor-pointer">
                    {click ? (
                      <AiFillHeart size={30} 
                      onClick={() => removeFromWishListHandler(data)}
                      color="red" 
                      title="Remove from wishlist" />
                    ) : (
                      <AiOutlineHeart 
                      onClick={() => addToWishListHandler(data)} 
                      size={30} color="#333" title="Add to wishlist" />
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div 
                  className={`${styles.button} !mt-10 !rounded !h-11 flex items-center justify-center cursor-pointer !bg-[#3321c8] hover:bg-[#4c3ce2] transition`}
                  onClick={()=>addToCartHandler(data._id)}
                >
                  <span className="text-[#fff] flex items-center font-[600] text-[16px]">
                    Add to cart <AiOutlineShoppingCart className="ml-2" size={20}/>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;