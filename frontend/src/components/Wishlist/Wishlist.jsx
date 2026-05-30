import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../../redux/actions/wishlist";
import {backend_url} from "../../server"
import { addTocart } from "../../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = {...data,qty:1};
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm overflow-y-scroll">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => removeFromWishlistHandler(data)}
                />
              </div>

              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {/* FIXED: Removed the 's' typo from .length */}
                  {wishlist && wishlist.length} items
                </h5>
              </div>

              <br />
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((i, index) => {
                    return <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler = {addToCartHandler}/>;
                  })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const WishlistSingle = ({ data,removeFromWishlistHandler,addToCartHandler }) => {
  // Note: We don't usually need a counter for wishlist, but kept it if you want to use it
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        {/* Delete Button */}
        <RxCross1 size={20} className="cursor-pointer text-[#00000082] ml-2" />

        {/* Product Image */}
        <img
          src={
            data?.image_Url
              ? data.image_Url[0]?.url
              : `${backend_url}${data?.images?.[0]}`
          }
          alt=""
          className="w-[80px] h-[80px] ml-2 object-contain"
        />

        <div className="pl-[5px] w-full flex items-center justify-between">
          <div>
            <h1 className="font-[500] text-[16px]">
              {data.name.length > 30
                ? data.name.slice(0, 30) + "..."
                : data.name}
            </h1>
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
              US${totalPrice}
            </h4>
          </div>
          {/* Add to Cart Icon */}
          <div>
            <BsCartPlus
              size={20}
              className="cursor-pointer"
              title="Add to cart"
              color="#444"
              onClick={()=>addToCartHandler(data)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
