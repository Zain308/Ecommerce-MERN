import React from 'react';
import axios from "axios"; 
import { server } from "../../server"; 
import { toast } from "react-toastify"; 
import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineMessage } from 'react-icons/ai';
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import { RxPerson } from 'react-icons/rx';
import { MdOutlineTrackChanges } from "react-icons/md"
import { TbAddressBook } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { RiLockPasswordLine } from "react-icons/ri";


const ProfileSideBar = ({ setActive, active }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios.get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        // This clears the Redux state by triggering a fresh load on the login page
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Logout failed");
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

      {/* Inbox */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => navigate("/inbox") || setActive(4)}>
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
        <RiLockPasswordLine   eCreditCard size={20} color={active === 6 ? "red" : "#333"} />
        <span className={`pl-3 ${active === 6 ? "text-[red]" : "text-[#333]"} font-[600] 800px:block hidden`}>
          Change Password
        </span>
      </div>

      {/* Address */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(7)}>
        <TbAddressBook size={20} color={active === 7 ? "red" : "#333"} />
        <span className={`pl-3 ${active === 7 ? "text-[red]" : "text-[#333]"} font-[600] 800px:block hidden`}>
          Address
        </span>
      </div>

      {/* Log out */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={logoutHandler}>
        <AiOutlineLogin size={20} color={"#333"} />
        <span className={`pl-3 text-[#333] font-[600] 800px:block hidden`}>
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSideBar;