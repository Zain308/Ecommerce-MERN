import React from 'react'
import styles from '../../styles/styles'

const CheckoutSteps = ({ active }) => {
    return (
        <div className='w-full flex justify-center'>
            <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap justify-center">
                
                {/* Step 1 */}
                <div className={`${styles.noramlFlex}`}>
                    <div className={`${styles.cart_button} !h-[35px] !w-[max-content] !px-[20px] !rounded-[20px]`}>
                        <span className={`${styles.cart_button_text}`}>1. Shipping</span>
                    </div>
                    {/* Line 1 */}
                    <div className={`${active > 1 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#3bb177]" : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"}`} />
                </div>

                {/* Step 2 */}
                <div className={`${styles.noramlFlex}`}>
                    <div className={`${active > 1 ? `${styles.cart_button} !h-[35px] !w-[max-content] !px-[20px] !rounded-[20px]` 
                        : `${styles.cart_button} !h-[35px] !w-[max-content] !px-[20px] !rounded-[20px] !bg-[#FDE1E6]`}`}>
                        <span className={`${active > 1 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}>
                            2. Payment
                        </span>
                    </div>
                    {/* Line 2 */}
                    <div className={`${active > 2 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#3bb177]" : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"}`} />
                </div>

                {/* Step 3 */}
                <div className={`${styles.noramlFlex}`}>
                    <div className={`${active > 2 ? `${styles.cart_button} !h-[35px] !w-[max-content] !px-[20px] !rounded-[20px]` 
                        : `${styles.cart_button} !h-[35px] !w-[max-content] !px-[20px] !rounded-[20px] !bg-[#FDE1E6]`}`}>
                        <span className={`${active > 2 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}>
                            3. Success
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CheckoutSteps;