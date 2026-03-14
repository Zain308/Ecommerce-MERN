import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx'; 
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";

const Wishlist = ({ setOpenWishlist }) => { 
    const wishlistData = [
        {
            name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
            description: "test",
            price: 999,
        },
        {
            name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
            description: "test",
            price: 245,
        },
        {
            name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
            description: "test",
            price: 645,
        },
    ];

    return (
        <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
            <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm overflow-y-scroll">
                <div>
                    <div className="flex w-full justify-end pt-5 pr-5">
                        <RxCross1
                            size={25}
                            className="cursor-pointer"
                            onClick={() => setOpenWishlist(false)}
                        />
                    </div>

                    <div className={`${styles.noramlFlex} p-4`}>
                        <AiOutlineHeart size={25} />
                        <h5 className='pl-2 text-[20px] font-[500]'>
                            {/* FIXED: Removed the 's' typo from .length */}
                            {wishlistData && wishlistData.length} items
                        </h5>
                    </div>

                    <br />
                    <div className="w-full border-t">
                        {
                            wishlistData && wishlistData.map((i, index) => {
                                return <WishlistSingle key={index} data={i} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const WishlistSingle = ({ data }) => {
    // Note: We don't usually need a counter for wishlist, but kept it if you want to use it
    const [value, setValue] = useState(1);
    const totalPrice = data.price * value;

    return (
        <div className="border-b p-4">
            <div className="w-full flex items-center">
                {/* Delete Button */}
                <RxCross1 size={20} className='cursor-pointer text-[#00000082] ml-2' />

                {/* Product Image */}
                <img src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
                    alt=""
                    className="w-[80px] h-[80px] ml-2 object-contain"
                />

                <div className='pl-[5px] w-full flex items-center justify-between'>
                    <div>
                        <h1 className="font-[500] text-[16px]">
                            {data.name.length > 30 ? data.name.slice(0, 30) + "..." : data.name}
                        </h1>
                        <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>
                            US${totalPrice}
                        </h4>
                    </div>
                    {/* Add to Cart Icon */}
                    <div>
                        <BsCartPlus size={20} className="cursor-pointer" title="Add to cart" color="#444" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wishlist;