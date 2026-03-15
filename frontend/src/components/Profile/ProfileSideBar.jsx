import React from 'react';
import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineMessage } from 'react-icons/ai';
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import { RxPerson } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import {MdOutlineTrackChanges} from "react-icons/md"
import {TbAddressBook} from "react-icons/tb";

const ProfileSideBar = ({ setActive, active }) => {
  const navigate = useNavigate()
  return (
    <div className='w-full bg-white shadow-sm rounded-[10px] p-4 pt-8'>
        <div 
          className="flex items-center cursor-pointer w-full mb-8" 
          onClick={() => setActive(1)}
        >
            <RxPerson size={20} color={active === 1 ? "red" : "#333"} />
            <span
              className={`pl-3 ${active === 1 ? "text-[red]" : "text-[#333]"} font-[600]`}
            >
              Profile
            </span>
        </div>
        <div 
          className="flex items-center cursor-pointer w-full mb-8" 
          onClick={() => setActive(2)}
        >
            <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : "#333"} />
            <span
              className={`pl-3 ${active === 2 ? "text-[red]" : "text-[#333]"} font-[600]`}
            >
              Orders
            </span>
        </div>
        <div 
          className="flex items-center cursor-pointer w-full mb-8" 
          onClick={() => setActive(3)}
        >
            <HiOutlineReceiptRefund size={20} color={active === 3? "red" : "#333"} />
            <span
              className={`pl-3 ${active === 3 ? "text-[red]" : "text-[#333]"} font-[600]`}
            >
              Refunds
            </span>
        </div>
        <div 
          className="flex items-center cursor-pointer w-full mb-8" 
          onClick={() => setActive(4) || navigate("/inbox")}
        >
            <AiOutlineMessage size={20} color={active === 4 ? "red" : "#333"} />
            <span
              className={`pl-3 ${active === 4 ? "text-[red]" : "text-[#333]"} font-[600]`}
            >
              Inbox
            </span>
        </div>
        <div 
          className="flex items-center cursor-pointer w-full mb-8" 
          onClick={() => setActive(5) || navigate("/inbox")}
        >
            <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : "#333"} />
            <span
              className={`pl-3 ${active === 5 ? "text-[red]" : "text-[#333]"} font-[600]`}
            >
              Track Order
            </span>
        </div>
        <div 
          className="flex items-center cursor-pointer w-full mb-8" 
          onClick={() => setActive(6) || navigate("/inbox")}
        >
            <AiOutlineCreditCard size={20} color={active === 6 ? "red" : "#333"} />
            <span
              className={`pl-3 ${active === 6 ? "text-[red]" : "text-[#333]"} font-[600]`}
            >
              Payment Methods
            </span>
        </div>
        <div 
          className="flex items-center cursor-pointer w-full mb-8" 
          onClick={() => setActive(7) || navigate("/inbox")}
        >
            <TbAddressBook size={20} color={active === 7 ? "red" : "#333"} />
            <span
              className={`pl-3 ${active === 7 ? "text-[red]" : "text-[#333]"} font-[600]`}
            >
              Address 
            </span>
        </div>
        <div 
          className="flex items-center cursor-pointer w-full mb-8" 
          onClick={() => setActive(8) || navigate("/inbox")}
        >
            <AiOutlineLogin size={20} color={active === 8 ? "red" : "#333"} />
            <span
              className={`pl-3 ${active === 8 ? "text-[red]" : "text-[#333]"} font-[600]`}
            >
              Log out 
            </span>
        </div>
    </div>
  );
};

export default ProfileSideBar;