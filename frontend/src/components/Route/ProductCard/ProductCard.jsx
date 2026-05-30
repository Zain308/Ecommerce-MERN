import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { ProductDetailsCard } from "../ProductDetailsCard/ProductDetailsCard.jsx";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillStar,
  AiOutlineStar,
  AiOutlineShoppingCart,
  AiOutlineEye,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../../redux/actions/wishlist.js";
import { addTocart } from "../../../../redux/actions/cart.js";
import { toast } from "react-toastify";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
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
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer hover:shadow-md transition-shadow">
      {/* Image Section */}
      <Link
        to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : "/product/${data._id}"}`}
      >
        <div className="w-full h-[170px] bg-white rounded flex items-center justify-center overflow-hidden">
          <img
            src={data?.image_Url?.[0]?.url}
            alt={d}
            className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/170x170?text=No+Image";
            }}
          />
        </div>
      </Link>

      {/* Shop Name */}
      <Link to={`/shop/preview/${data?.shop?._id}`}>
        <h5
          className={`${styles.shop_name} mt-2 text-blue-600 hover:underline`}
        >
          {data?.shop?.name}
        </h5>
      </Link>

      {/* Product Title */}
      <Link
        to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : "/product/${data._id}"}`}
      >
        <h4 className="pb-3 font-[500] h-[50px] overflow-hidden leading-tight mt-1 hover:text-blue-700">
          {data?.name?.length > 40
            ? data.name.slice(0, 40) + "..."
            : data?.name}
        </h4>

        {/* Ratings (Static for now) */}
        <div className="flex">
          <AiFillStar
            className="mr-1 cursor-pointer"
            color="#F6BA00"
            size={20}
          />
          <AiFillStar
            className="mr-1 cursor-pointer"
            color="#F6BA00"
            size={20}
          />
          <AiFillStar
            className="mr-1 cursor-pointer"
            color="#F6BA00"
            size={20}
          />
          <AiFillStar
            className="mr-1 cursor-pointer"
            color="#F6BA00"
            size={20}
          />
          <AiOutlineStar
            className="mr-1 cursor-pointer"
            color="#F6BA00"
            size={20}
          />
        </div>

        {/* Price and Sales */}
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data?.discount_price}$
            </h5>
            {data?.price && (
              <h4 className={`${styles.price} ml-2 line-through`}>
                {data.price}$
              </h4>
            )}
          </div>
          <span className="font-[400] text-[15px] text-[#68d284]">
            {data?.total_sell} sold
          </span>
        </div>
      </Link>

      {/* Side Action Buttons - z-index and stopPropagation added */}
      <div className="z-10">
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            color="red"
            onClick={() => removeFromWishListHandler(data)}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            color="#333"
            onClick={() => addToWishListHandler(data)}
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          color="#333"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(!open);
          }}
          title="Quick view"
        />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-2 top-24"
          color="#444"
          onClick={() => addToCartHandler(data._id)}
          title="Add to cart"
        />
        {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
      </div>
    </div>
  );
};

export default ProductCard;
