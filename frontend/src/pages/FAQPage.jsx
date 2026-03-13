import React, { useState } from 'react';
import { Header } from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/styles';

const FAQPage = () => {
  return (
    <div>
        <Header activeHeading={5} />
        <Faq />
        <Footer />
    </div>
  )
}

const Faq = () => {
    const [activeTab, setActiveTab] = useState(0);

    const toggleTab = (tab) => {
        if(activeTab === tab){
            setActiveTab(0)
        } else {
            setActiveTab(tab);
        }
    }
    
    return (
        <div className={`${styles.section} my-8`}>
            <h2 className='text-3xl font-bold text-gray-900 mb-8'>FAQ</h2>
            <div className='mx-auto space-y-4'>
                
                {/* Tab 1 */}
                <div className="border-b border-gray-200 pb-4">
                    <button
                        className='flex items-center justify-between w-full'
                        onClick={() => toggleTab(1)}
                    >
                        <span className='text-lg font-medium text-gray-900 text-left'>
                            How do I track my order?    
                        </span>  
                        {
                            activeTab === 1 ? (
                                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>   
                            )
                        }
                    </button>
                    {activeTab === 1 && (
                        <div className="mt-4">
                            <p className="text-base text-gray-500 text-left">
                                We typically process and ship orders within 1-2 business days.
                                Depending on your location, it can take an additional 2-7 days
                                for your order to arrive.
                            </p>
                        </div>
                    )}
                </div>

                {/* Tab 2 */}
                <div className="border-b border-gray-200 pb-4">
                    <button
                        className='flex items-center justify-between w-full'
                        onClick={() => toggleTab(2)}
                    >
                        <span className='text-lg font-medium text-gray-900 text-left'>
                            What is your return policy?    
                        </span>  
                        {
                            activeTab === 2 ? (
                                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>   
                            )
                        }
                    </button>
                    {activeTab === 2 && (
                        <div className="mt-4">
                            <p className="text-base text-gray-500 text-left">
                                If you're not satisfied with your purchase, we accept returns within 30 days of delivery. 
                                To initiate a return, please email us at support@example.com with your order number.
                            </p>
                        </div>
                    )}
                </div>

                {/* Tab 3 */}
                <div className="border-b border-gray-200 pb-4">
                    <button
                        className='flex items-center justify-between w-full'
                        onClick={() => toggleTab(3)}
                    >
                        <span className='text-lg font-medium text-gray-900 text-left'>
                            How do I contact customer support?    
                        </span>  
                        {
                            activeTab === 3 ? (
                                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>   
                            )
                        }
                    </button>
                    {activeTab === 3 && (
                        <div className="mt-4">
                            <p className="text-base text-gray-500 text-left">
                                You can contact our customer support team by emailing support@example.com 
                                or calling us at (555) 123-4567. We are available Monday through Friday.
                            </p>
                        </div>
                    )}
                </div>

                {/* Tab 4 */}
                <div className="border-b border-gray-200 pb-4">
                    <button
                        className='flex items-center justify-between w-full'
                        onClick={() => toggleTab(4)}
                    >
                        <span className='text-lg font-medium text-gray-900 text-left'>
                            Can I change or cancel my order?    
                        </span>  
                        {
                            activeTab === 4 ? (
                                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>   
                            )
                        }
                    </button>
                    {activeTab === 4 && (
                        <div className="mt-4">
                            <p className="text-base text-gray-500 text-left">
                                We may be able to change or cancel your order if it hasn't been shipped yet. 
                                Please contact us as soon as possible with your request.
                            </p>
                        </div>
                    )}
                </div>

                {/* Tab 5 */}
                <div className="border-b border-gray-200 pb-4">
                    <button
                        className='flex items-center justify-between w-full'
                        onClick={() => toggleTab(5)}
                    >
                        <span className='text-lg font-medium text-gray-900 text-left'>
                            Do you offer international shipping?    
                        </span>  
                        {
                            activeTab === 5 ? (
                                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>   
                            )
                        }
                    </button>
                    {activeTab === 5 && (
                        <div className="mt-4">
                            <p className="text-base text-gray-500 text-left">
                                Yes, we offer international shipping to most countries. 
                                Shipping costs and delivery times vary depending on your location.
                            </p>
                        </div>
                    )}
                </div>

                {/* Tab 6 */}
                <div className="border-b border-gray-200 pb-4">
                    <button
                        className='flex items-center justify-between w-full'
                        onClick={() => toggleTab(6)}
                    >
                        <span className='text-lg font-medium text-gray-900 text-left'>
                            What payment methods do you accept?    
                        </span>  
                        {
                            activeTab === 6 ? (
                                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>   
                            )
                        }
                    </button>
                    {activeTab === 6 && (
                        <div className="mt-4">
                            <p className="text-base text-gray-500 text-left">
                                We accept all major credit cards, PayPal, and Apple Pay.
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default FAQPage;