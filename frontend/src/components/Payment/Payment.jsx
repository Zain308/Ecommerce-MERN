import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(order);
  }, []);

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 800px:w-[70%] lg:w-[50%] bg-[#fff] rounded-md p-5 pb-8 shadow-sm">
        {/* Select Payment Method */}
        <div>
          <PaymentInfo
            user={user}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
      </div>

      <div className="w-[90%] 800px:w-[30%] lg:w-[25%] mt-8 800px:mt-0">
        <CartData orderData={orderData} />
      </div>
    </div>
  );
};

const PaymentInfo = ({ user, cashOnDeliveryHandler }) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8 shadow-sm">
      {/* Pay with Card */}
      <div className="flex w-full pb-5 border-b mb-2">
        <div
          className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center cursor-pointer"
          onClick={() => setSelect(1)}
        >
          {select === 1 ? (
            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
          ) : null}
        </div>
        <h4 className="text-[18px] pl-2 font-[600] text-[#000000e1]">
          Pay with Debit/Credit card
        </h4>
      </div>

      {/* Pay with Paypal */}
      <div className="flex w-full pb-5 border-b mb-2">
        <div
          className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center cursor-pointer"
          onClick={() => setSelect(2)}
        >
          {select === 2 ? (
            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
          ) : null}
        </div>
        <h4 className="text-[18px] pl-2 font-[600] text-[#000000e1]">
          Pay with Paypal
        </h4>
      </div>

      {/* Cash on Delivery */}
      <div className="flex w-full pb-5 border-b mb-2">
        <div
          className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center cursor-pointer"
          onClick={() => setSelect(3)}
        >
          {select === 3 ? (
            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
          ) : null}
        </div>
        <h4 className="text-[18px] pl-2 font-[600] text-[#000000e1]">
          Cash on Delivery
        </h4>
      </div>

      {/* Cash on delivery button */}
      {select === 3 ? (
        <div className="w-full flex">
          <form className="w-full" onSubmit={cashOnDeliveryHandler}>
            <input
              type="submit"
              value="Confirm Order"
              className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
            />
          </form>
        </div>
      ) : null}
    </div>
  );
};

const CartData = ({ orderData }) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8 shadow-sm">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.shipping?.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">{orderData?.discountPrice ? "$" + orderData.discountPrice : "-"}</h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;