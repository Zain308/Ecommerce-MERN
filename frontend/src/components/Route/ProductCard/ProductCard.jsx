import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';
import { ProductDetailsCard } from "../ProductDetailsCard/ProductDetailsCard.jsx";
import { 
    AiFillHeart, 
    AiOutlineHeart, 
    AiFillStar, 
    AiOutlineStar, 
    AiOutlineShoppingCart,
    AiOutlineEye
} from 'react-icons/ai';

const ProductCard = ({ data }) => {
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);

    const d = data?.name || '';
    const product_name = d.replace(/\s+/g, "-");

    return (
        <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer hover:shadow-md transition-shadow'>
            
            {/* Image Section */}
            <Link to={`/product/${product_name}`}>
                <div className="w-full h-[170px] bg-white rounded flex items-center justify-center overflow-hidden">
                    <img 
                        src={data?.image_Url?.[0]?.url} 
                        alt={d} 
                        className='w-full h-full object-contain hover:scale-110 transition-transform duration-300'
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/170x170?text=No+Image";
                        }}
                    />
                </div>
            </Link>
            
            {/* Shop Name */}
            <Link to={`/shop/preview/${data?.shop?._id}`}>
                <h5 className={`${styles.shop_name} mt-2 text-blue-600 hover:underline`}>{data?.shop?.name}</h5>
            </Link>
            
            {/* Product Title */}
            <Link to={`/product/${product_name}`}>
                <h4 className='pb-3 font-[500] h-[50px] overflow-hidden leading-tight mt-1 hover:text-blue-700'>
                    {data?.name?.length > 40 ? data.name.slice(0, 40) + "..." : data?.name}
                </h4>
                
                {/* Ratings (Static for now) */}
                <div className="flex">
                    <AiFillStar className="mr-1 cursor-pointer" color="#F6BA00" size={20}/>
                    <AiFillStar className="mr-1 cursor-pointer" color="#F6BA00" size={20}/>
                    <AiFillStar className="mr-1 cursor-pointer" color="#F6BA00" size={20}/>
                    <AiFillStar className="mr-1 cursor-pointer" color="#F6BA00" size={20}/>
                    <AiOutlineStar className="mr-1 cursor-pointer" color="#F6BA00" size={20}/>
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
                    <span className='font-[400] text-[15px] text-[#68d284]'>
                        {data?.total_sell} sold
                    </span>
                </div>
            </Link>

            {/* Side Action Buttons - z-index and stopPropagation added */}
            <div className="z-10">
                {click ? (
                    <AiFillHeart 
                        size={22} 
                        className='cursor-pointer absolute right-2 top-5' 
                        color="red" 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setClick(!click); }} 
                        title="Remove from wishlist"
                    />
                ) : (
                    <AiOutlineHeart 
                        size={22} 
                        className='cursor-pointer absolute right-2 top-5' 
                        color="#333" 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setClick(!click); }} 
                        title="Add to wishlist"
                    />
                )}
                <AiOutlineEye 
                    size={22} 
                    className='cursor-pointer absolute right-2 top-14' 
                    color="#333" 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(!open); }} 
                    title="Quick view"
                />
                <AiOutlineShoppingCart 
                    size={25} 
                    className='cursor-pointer absolute right-2 top-24' 
                    color='#444'
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* Add to Cart logic here */ }} 
                    title="Add to cart"
                />
                {open ? <ProductDetailsCard setOpen={setOpen} data={data}/> : null}
            </div>
        </div>
    );
}

export default ProductCard;