import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../../redux/actions/cart.js";
import { toast } from "react-toastify";

const EventCard = ({ active }) => {
  const { cart } = useSelector((state)=>state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
      const isItemExists = cart && cart.find((i) => i._id === data._id);
      if (isItemExists) {
        toast.error("Item already in cart!");
      } else {
        if (data.stock < 1) {
          toast.error("Product stock limited!");
        } else {
          const cartData = { ...data, qty: 1 };
          dispatch(addTocart(cartData));
          toast.success("Item added to cart successfully!");
        }
      }
    };
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-5 shadow-sm`}>
      <div className="w-full lg:w-[40%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="Iphone 14" className="object-contain" />
      </div>

      <div className="w-full lg:w-[60%] flex flex-col justify-center px-5">
        <h2 className={`${styles.productTitle}`}>Iphone 14 Pro Max 8/256GB</h2>
        <p className="text-gray-600 text-[15px] leading-6">
          Experience the power of the A16 Bionic chip. This event-exclusive 
          pricing is only available for a limited time. Don't miss out on 
          the best camera system ever in an iPhone.
        </p>
        
        <div className="flex py-4 justify-between items-center">
            <div className="flex items-center">
                <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                    1099$
                </h5>
                <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                    999$
                </h5>
            </div>
            <span className="pr-3 font-[500] text-[17px] text-[#44a55e]">
              120 sold
            </span>
        </div>

        <CountDown />
        
        <br />
        <div className="flex items-center gap-4">
          <link to={`/product/${data._id}?isEvent = true`}>
            <div className={`${styles.button} text-white`}>See Details</div>
          </link>
            <div className={`${styles.button} text-white !bg-black`} onClick={(e)=>addToCartHandler(data)}>Add to Cart</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;