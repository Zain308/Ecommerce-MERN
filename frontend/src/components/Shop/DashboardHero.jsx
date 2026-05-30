import React, { useEffect, useState } from 'react'
import { AiFillProduct, AiOutlineArrowRight, AiOutlineMoneyCollect } from 'react-icons/ai'
import { FaFirstOrderAlt } from "react-icons/fa";
import styles from '../../styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfShop } from '../../../redux/actions/order';
import { getAllProductsShop } from '../../../redux/actions/product';
import { Button } from '@mui/material';

const DashboardHero = () => {
    const dispatch = useDispatch();
    const {orders} = useSelector((state)=>state.order);
    const {seller} = useSelector((state)=>state.seller);
    const {products} = useSelector((state)=>state.seller);
    const [deliveredOrder, setDeliveredOrder] = useState(null);

    useEffect(()=>{
        dispatch(getAllOrdersOfShop(seller._id));
        dispatch(getAllProductsShop(seller._id));

        const orderData = orders && orders.filter((item)=> item.status === "Delivered");

        setDeliveredOrder(orderData);


    },[dispatch])

    const totalEarningWithoutTax = deliveredOrder ? deliveredOrder.reduce((acc,item) => acc + item.totalPrice,0) : 0;

    const serviceCharge = totalEarningWithoutTax ? totalEarningWithoutTax * 0.1 : 0;
    const availableBalance = totalEarningWithoutTax - serviceCharge.toFixed(2) || 0;

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.row.status === "Delivered" ? "text-green-600" : "text-red-600",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "action",
      headerName: "",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
    ]


    const row = [];

    orders && orders.forEach((item)=>{
        row.push({
            id: item._id,
            itemsQty: item.cart.reduce((acc,item)=>acc + item.qty,0),
            toatl:"US$" + item.totalPrice,
            status:item.status,
        })
    })
  return (
    <div className='w-full p-8'>
        <h3 className='text-[22px] font-poppins pb-2'>Overview</h3>
        <div className='w-full block 80px:flex items-center justify-between'>
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                <div className="flex items-center">
                    <AiOutlineMoneyCollect 
                    size={30}
                    className='mr-2'
                    fill='#00000085'
                    />
                    <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
                        Account Balance <span>(with 10% service charge)</span>
                    </h3>
                </div>
                <h5 className='pt-2 pl-[36px] text-[22px] font-[500]'>
                    ${availableBalance}
                </h5>
                <Link to="/dashboard-withdraw-money">
                    <h5 className='pt-4 pl-2 text-[#077f9c]'>Withdraw Money</h5>
                </Link>
            </div>

            
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                <div className="flex items-center">
                    <FaFirstOrderAlt  
                    size={30}
                    className='mr-2'
                    fill='#00000085'
                    />
                    <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
                        All Orders 
                    </h3>
                </div>
                <h5 className='pt-2 pl-[36px] text-[22px] font-[500]'>
                    {orders && orders.length}
                </h5>
                <Link to="/dashboard-orders">
                    <h5 className='pt-4 pl-2 text-[#077f9c]'>View Orders</h5>
                </Link>
            </div>


            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                <div className="flex items-center">
                    <AiFillProduct  
                    size={30}
                    className='mr-2'
                    fill='#00000085'
                    />
                    <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
                        All Products
                    </h3>
                </div>
                <h5 className='pt-2 pl-[36px] text-[22px] font-[500]'>
                    {products && products.length}
                </h5>
                <Link to="/dashboard-products">
                    <h5 className='pt-4 pl-2 text-[#077f9c]'>View Products</h5>
                </Link>
            </div>

        </div>
            <br />

            <h3 className='text-[22px] font-Poppins pb-2'>Latest Orders</h3>

            <div className="w-full min-h-[45vh] bg-white rounded">

            </div>
    </div>
  )
}

export default DashboardHero