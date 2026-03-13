import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx'; 
import { IoBagHandleOutline } from 'react-icons/io5';
import { HiOutlineMinus, HiPlus } from "react-icons/hi"; 
import styles from "../../styles/styles";
import { Link } from 'react-router-dom';

const Cart = ({setOpenCart}) => {
    const cartData = [
        {
            name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
            description:"test",
            price: 999,
        },
        {
            name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
            description:"test",
            price: 245,
        },
        {
            name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
            description:"test",
            price: 645,
        },
    ]

    return (
        <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
            {/* UI FIX: Added responsiveness to width. w-[25%] is too small on mobile. */}
            <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm overflow-y-scroll">
                <div>
                    <div className="flex w-full justify-end pt-5 pr-5">
                        <RxCross1
                            size={25}
                            className="cursor-pointer"
                            onClick={()=> setOpenCart(false)}
                        />
                    </div>

                    <div className={`${styles.noramlFlex} p-4`}>
                        <IoBagHandleOutline size={25} />
                        <h5 className='pl-2 text-[20px] font-[500]'>
                            {cartData.length} items
                        </h5>
                    </div>

                    <br />
                    <div className="w-full border-t">
                        {
                            cartData && cartData.map((i,index) => {
                                return <CartSingle key={index} data={i}/>
                            })
                        }
                    </div>
                </div>

                <div className="px-5 mb-3">
                    <Link to="/checkout">
                        <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}>
                            <h1 className='text-[#fff] text-[18px] font-[600]'>Checkout Now (USD$1080)</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const CartSingle = ({ data }) => {
    const [value,setValue] = useState(1);
    const totalPrice = data.price * value;
    
    return(
        <div className="border-b p-4">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    {/* Quantity Controls */}
                    <div className="flex flex-col items-center">
                        <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
                            onClick={()=>setValue(value + 1)}
                        >
                            <HiPlus size={18} color="#fff" />
                        </div>
                        <span className="py-[5px]">{value}</span>
                        <div className='bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer'
                            onClick={()=>setValue(value === 1 ? 1 : value - 1)}
                        >
                            <HiOutlineMinus size={16} color='#7d879c' />
                        </div>
                    </div>

                    <img src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png" alt="" 
                        className="w-[80px] h-[80px] ml-2 object-contain" 
                    />

                    <div className='pl-[10px]'>
                        {/* UI FIX: Added line clamping/truncation so long names don't break the row */}
                        <h1 className="font-[500] text-[16px]">
                            {data.name.length > 30 ? data.name.slice(0, 30) + "..." : data.name}
                        </h1>
                        <h4 className='font-[400] text-[15px] text-[#00000082]'>
                            ${data.price} * {value}
                        </h4>
                        <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>
                            US${totalPrice}
                        </h4>
                    </div>
                </div>
                {/* Delete Item Icon */}
                <RxCross1 size={20} className='cursor-pointer text-[#00000082]' />
            </div>
        </div>
    )
}

export default Cart