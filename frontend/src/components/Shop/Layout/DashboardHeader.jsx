import React from 'react';
import { AiOutlineGift } from 'react-icons/ai';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { BiMessageSquareDetail } from 'react-icons/bi'; // FIX: Added missing import
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { backend_url } from "../../../server"; // Ensure this path is correct

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <div className='w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4'>
      <div>
        <Link to="/dashboard">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="Logo"
          />
        </Link>
      </div>

      <div className="flex items-center">
        <div className="flex items-center mr-4">
          {/* FIX: Corrected typo "cupouns" to "coupons" */}
          <Link to="/dashboard-coupons" className="hidden 800px:block">
            <AiOutlineGift
              color='#555'
              size={30}
              className='mx-5 cursor-pointer'
            />
          </Link>
          <Link to="/dashboard-events" className="hidden 800px:block">
            <MdOutlineLocalOffer
              color='#555'
              size={30}
              className='mx-5 cursor-pointer'
            />
          </Link>
          {/* FIX: Corrected typo "proucts" to "products" */}
          <Link to="/dashboard-products" className="hidden 800px:block">
            <FiShoppingBag
              color='#555'
              size={30}
              className='mx-5 cursor-pointer'
            />
          </Link>
          <Link to="/dashboard-orders" className="hidden 800px:block">
            <FiPackage
              color='#555'
              size={30}
              className='mx-5 cursor-pointer'
            />
          </Link>
          {/* FIX: Corrected typo "messaages" to "messages" */}
          <Link to="/dashboard-messages" className="hidden 800px:block">
            <BiMessageSquareDetail
              color='#555'
              size={30}
              className='mx-5 cursor-pointer'
            />
          </Link>
          
          <Link to={`/shop/${seller?._id}`}>
            <img
              src={`${backend_url}${seller?.avatar}`}
              alt="Shop Avatar"
              className='w-[50px] h-[50px] rounded-full object-cover border-[2px] border-[#3ad132]'
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;