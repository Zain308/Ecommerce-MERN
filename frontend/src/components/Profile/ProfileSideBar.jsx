import React from 'react';
import axios from "axios"; 
import { server } from "../../server"; 
import { toast } from "react-toastify"; 
import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineMessage } from 'react-icons/ai';
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import { RxPerson } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { MdOutlineTrackChanges } from "react-icons/md"
import { TbAddressBook } from "react-icons/tb";
const ProfileSideBar = ({ setActive, active }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios.get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Logout failed";
        console.log(message);
        toast.error(message);
      });
  };

  return (
    <div className='w-full bg-white shadow-sm rounded-[10px] p-4 pt-8'>
      
      {/* Profile */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(1)}>
        <RxPerson size={20} color={active === 1 ? "red" : "#333"} />
        <span className={`pl-3 ${active === 1 ? "text-[red]" : "text-[#333]"} font-[600] 800px:block hidden`}>
          Profile
        </span>
      </div>

      {/* Orders */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(2)}>
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : "#333"} />
        <span className={`pl-3 ${active === 2 ? "text-[red]" : "text-[#333]"} font-[600] 800px:block hidden`}>
          Orders
        </span>
      </div>

      {/* Refunds */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(3)}>
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : "#333"} />
        <span className={`pl-3 ${active === 3 ? "text-[red]" : "text-[#333]"} font-[600] 800px:block hidden`}>
          Refunds
        </span>
      </div>

      {/* Inbox - Navigates to a separate page */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => navigate("/inbox")}>
        <AiOutlineMessage size={20} color={active === 4 ? "red" : "#333"} />
        <span className={`pl-3 ${active === 4 ? "text-[red]" : "text-[#333]"} font-[600] 800px:block hidden`}>
          Inbox
        </span>
      </div>

      {/* Track Order */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(5)}>
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : "#333"} />
        <span className={`pl-3 ${active === 5 ? "text-[red]" : "text-[#333]"} font-[600] 800px:block hidden`}>
          Track Order
        </span>
      </div>

      {/* Payment Methods */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(6)}>
        <AiOutlineCreditCard size={20} color={active === 6 ? "red" : "#333"} />
        <span className={`pl-3 ${active === 6 ? "text-[red]" : "text-[#333]"} font-[600] 800px:block hidden`}>
          Payment Methods
        </span>
      </div>

      {/* Address */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(7)}>
        <TbAddressBook size={20} color={active === 7 ? "red" : "#333"} />
        <span className={`pl-3 ${active === 7 ? "text-[red]" : "text-[#333]"} font-[600] 800px:block hidden`}>
          Address
        </span>
      </div>

      {/* Log out item */}
      <div 
        className="flex items-center cursor-pointer w-full mb-8" 
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : "#333"} />
        <span className={`pl-3 ${active === 8 ? "text-[red]" : "text-[#333]"} font-[600] 800px:block hidden`}>
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSideBar;