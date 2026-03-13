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
        <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
            <div className="flex justify-end"></div>
            
            {/* Image Section - Added a fixed height and background to handle missing images */}
            <Link to={`/product/${product_name}`}>
                <div className="w-full h-[170px] bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                    <img 
                        src={data?.image_Url?.[0]?.url} 
                        alt={d} 
                        className='w-full h-full object-contain hover:scale-105 transition-transform'
                        // Fallback logic if image fails to load
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/170x170?text=No+Image";
                        }}
                    />
                </div>
            </Link>
            
            {/* Shop Name */}
            <Link to="/">
                <h5 className={`${styles.shop_name} mt-2`}>{data?.shop?.name}</h5>
            </Link>
            
            {/* Product Title - Fixed height to keep cards aligned */}
            <Link to={`/product/${product_name}`}>
                <h4 className='pb-3 font-[500] h-[50px] overflow-hidden leading-tight mt-1'>
                    {data?.name?.length > 40 ? data.name.slice(0, 40) + "..." : data?.name}
                </h4>
                
                {/* Ratings */}
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
                            {data?.price === 0 ? data.price : data?.discount_price}$
                        </h5>
                        <h4 className={`${styles.price} ml-2`}>
                            {data?.price ? data.price + "$" : null}
                        </h4>
                    </div>
                    <span className='font-[400] text-[15px] text-[#68d284]'>
                        {data?.total_sell} sold
                    </span>
                </div>
            </Link>

            {/* Side Action Buttons */}
            <div>
                {click ? (
                    <AiFillHeart 
                        size={22} 
                        className='cursor-pointer absolute right-2 top-5' 
                        color="red" 
                        onClick={(e) => { e.preventDefault(); setClick(!click); }} 
                    />
                ) : (
                    <AiOutlineHeart 
                        size={22} 
                        className='cursor-pointer absolute right-2 top-5' 
                        color="#333" 
                        onClick={(e) => { e.preventDefault(); setClick(!click); }} 
                    />
                )}
                <AiOutlineEye 
                    size={22} 
                    className='cursor-pointer absolute right-2 top-14' 
                    color="#333" 
                    onClick={(e) => { e.preventDefault(); setOpen(!open); }} 
                />
                <AiOutlineShoppingCart 
                    size={25} 
                    className='cursor-pointer absolute right-2 top-24' 
                    color='#444'
                    onClick={(e) => { e.preventDefault(); setOpen(!open); }} 
                />
                {open ? <ProductDetailsCard setOpen={setOpen} data={data}/> : null}
            </div>
        </div>
    );
}

export default ProductCard;