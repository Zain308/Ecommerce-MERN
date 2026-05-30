import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { PaypalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const Payment = () => {
  const [orderData, setOrderData] = useState(null);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("latestOrder"));
    if (order) {
      setOrderData(order);
    }
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const payer = details.payer;
      const paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const finalOrder = {
      cart: orderData?.cart,
      shippingAddress: orderData?.shippingAddress,
      user: user && user,
      totalPrice: orderData?.totalPrice,
      paymentInfo: {
        id: paymentInfo.payer_id,
        status: "succeeded",
        type: "PayPal",
      },
    };

    try {
      await axios.post(`${server}/order/create-order`, finalOrder, config);
      setOpen(false);
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      navigate("/order/success");
      toast.success("Order successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      // Fixed typo from "header" to "headers"
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const paymentData = {
        amount: Math.round(orderData?.totalPrice * 100),
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config,
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const finalOrder = {
            cart: orderData?.cart,
            shippingAddress: orderData?.shippingAddress,
            user: user && user,
            totalPrice: orderData?.totalPrice,
            paymentInfo: {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
              type: "Credit Card",
            },
          };

          await axios.post(`${server}/order/create-order`, finalOrder, config);
          setOpen(false);
          localStorage.setItem("cartItems", JSON.stringify([]));
          localStorage.setItem("latestOrder", JSON.stringify([]));
          navigate("/order/success");
          toast.success("Order successful!");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const finalOrder = {
      cart: orderData?.cart,
      shippingAddress: orderData?.shippingAddress,
      user: user && user,
      totalPrice: orderData?.totalPrice,
      paymentInfo: {
        type: "Cash On Delivery",
      },
    };

    try {
      await axios.post(`${server}/order/create-order`, finalOrder, config);
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      navigate("/order/success");
      toast.success("Order successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8 800px:flex-row 800px:items-start 800px:justify-center gap-6">
      <div className="w-[90%] 800px:w-[60%] lg:w-[50%] bg-[#fff] rounded-md p-5 pb-8 shadow-sm">
        <PaymentInfo
          user={user}
          open={open}
          setOpen={setOpen}
          createOrder={createOrder}
          onApprove={onApprove}
          paymentHandler={paymentHandler}
          cashOnDeliveryHandler={cashOnDeliveryHandler}
          orderData={orderData}
        />
      </div>

      <div className="w-[90%] 800px:w-[30%] lg:w-[22%]">
        <CartData orderData={orderData} />
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
  orderData,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full bg-[#fff] rounded-md">
      {/* Pay with Card */}
      <div className="w-full pb-5 border-b mb-4">
        <div
          className="flex items-center w-full cursor-pointer py-2"
          onClick={() => setSelect(1)}
        >
          <div className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center">
            {select === 1 && (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            )}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000e1]">
            Pay with Credit/Debit Card
          </h4>
        </div>

        {/* Card Form content separated cleanly from the choice radio wrapper */}
        {select === 1 && (
          <div className="w-full mt-4 pl-8">
            <form onSubmit={paymentHandler}>
              <div className="w-full flex pb-3 gap-4">
                <div className="w-[50%]">
                  <label className="block pb-2 font-[500]">Card Number</label>
                  <CardNumberElement
                    className={`${styles.input} !h-[35px]`}
                    options={{
                      style: {
                        base: { fontSize: "16px", color: "#444" },
                        empty: { "::placeholder": { color: "#999" } },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2 font-[500]">CVC</label>
                  <CardCvcElement
                    className={`${styles.input} !h-[35px]`}
                    options={{
                      style: {
                        base: { fontSize: "16px", color: "#444" },
                        empty: { "::placeholder": { color: "#999" } },
                      },
                    }}
                  />
                </div>
              </div>
              <div className="w-full flex pb-6 gap-4">
                <div className="w-[50%]">
                  <label className="block pb-2 font-[500]">Name On Card</label>
                  <input
                    required
                    placeholder={user?.name || ""}
                    className={`${styles.input} !h-[35px]`}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2 font-[500]">Exp Date</label>
                  <CardExpiryElement
                    className={`${styles.input} !h-[35px]`}
                    options={{
                      style: {
                        base: { fontSize: "16px", color: "#444" },
                        empty: { "::placeholder": { color: "#999" } },
                      },
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value={`Pay $${orderData?.totalPrice || 0}`}
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600] w-[150px]`}
              />
            </form>
          </div>
        )}
      </div>

      {/* Pay with Paypal */}
      <div className="w-full pb-5 border-b mb-4">
        <div
          className="flex items-center w-full cursor-pointer py-2"
          onClick={() => setSelect(2)}
        >
          <div className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center">
            {select === 2 && (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            )}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000e1]">
            Pay with Paypal
          </h4>
        </div>

        {/* pay with payment */}
        {select === 2 ? (
          <div className="w-full flex border-b">
            <div
              className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
          </div>
        ) : null}

        {open && (
          <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
            <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative">
              <div className="w-full flex justify-end">
                <RxCross1
                  size={30}
                  className="cursor-pointer absolute top-3 right-3"
                  onClick={() => setOpen(false)}
                />
              </div>

              <PaypalScriptProvider
                options={{
                  "client-id":
                    "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICP0CToHG10kj lNdI-qwobbw9JAHzaRQwFMn2-k660853jn",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                />
              </PaypalScriptProvider>
            </div>
          </div>
        )}
      </div>

      {/* Cash on Delivery */}
      <div className="w-full pb-5 mb-4">
        <div
          className="flex items-center w-full cursor-pointer py-2"
          onClick={() => setSelect(3)}
        >
          <div className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center">
            {select === 3 && (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            )}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000e1]">
            Cash on Delivery
          </h4>
        </div>

        {select === 3 && (
          <div className="w-full mt-4 pl-8">
            <form onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm Order"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8 shadow-sm">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600]">
          ${orderData?.subTotalPrice?.toFixed(2) || "0.00"}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[18px] font-[600]">
          ${orderData?.shipping?.toFixed(2) || "0.00"}
        </h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {orderData?.discountPrice
            ? `$${orderData.discountPrice.toFixed(2)}`
            : "-"}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.totalPrice?.toFixed(2) || "0.00"}
      </h5>
    </div>
  );
};

export default Payment;
