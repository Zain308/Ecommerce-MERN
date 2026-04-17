import React from 'react'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Footer from '../components/Layout/Footer'
import { Header } from '../components/Layout/Header'
import Payment from "../components/Payment/Payment.jsx";

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f6f5]'>
        <Header />
        <br />
        <br />
        {/* active={2} because Payment is usually the 3rd step (Shipping -> Checkout -> Payment) */}
        <CheckoutSteps active={2} />
        <Payment />
        <br />
        <br />
        <Footer />
    </div>
  )
}

export default PaymentPage