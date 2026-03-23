import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx";

const EventCard = ({ active }) => {
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-5 shadow-sm`}>
      <div className="w-full lg:w-[40%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="Iphone 14" className="object-contain" />
      </div>

      <div className="w-full lg:w-[60%] flex flex-col justify-center px-5">
        <h2 className={`${styles.productTitle}`}>Iphone 14 Pro Max 8/256GB</h2>
        <p className="text-gray-600 text-[15px] leading-6">
          Experience the power of the A16 Bionic chip. This event-exclusive 
          pricing is only available for a limited time. Don't miss out on 
          the best camera system ever in an iPhone.
        </p>
        
        <div className="flex py-4 justify-between items-center">
            <div className="flex items-center">
                <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                    1099$
                </h5>
                <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                    999$
                </h5>
            </div>
            <span className="pr-3 font-[500] text-[17px] text-[#44a55e]">
              120 sold
            </span>
        </div>

        <CountDown />
        
        <br />
        <div className="flex items-center gap-4">
            <div className={`${styles.button} text-white`}>See Details</div>
            <div className={`${styles.button} text-white !bg-black`}>Add to Cart</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;