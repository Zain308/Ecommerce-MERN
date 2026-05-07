import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductsShop } from '../../../redux/actions/product';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { deleteEvent, getAllEventsShop } from '../../../redux/actions/event';
import Loader from "../Layout/Loader"; 
import { DataGrid } from "@mui/x-data-grid";

const AllEvents = () => {
    const {events,isLoading} = useSelector((state)=>state.events)
    const {seller} = useSelector((state)=>state.seller);
    const dispatch = useDispatch();

    const handleDelete = (id)=>{
        dispatch(deleteEvent(id))
        window.location.reload();
    }

    useEffect(()=>{
        dispatch(getAllEventsShop(seller._id));

    },[dispatch,])

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 180,
            flex: 1.4,
        },
        
        {
            field: "price",
            headerName: "Price",
            minWidth: 100,
            flex: 0.6,
        },
        {
            field: "Stock",
            headerName: "Stock",
            minWidth: 80,
            type: "number",
            flex: 0.5,
        },
        {
            field: "sold",
            headerName: "Sold out",
            minWidth: 130,
            type: "number",
            flex: 0.6,
        },
        {
            field: "Preview",
            flex: 0.8,
            minWidth: 100,
            headerName: "",
            type: "number",
            sortable:false,
            renderCell:(params)=>{
                const d = params.row.name;
                const productName = d.replace(/\s+/g, "-");
                return (
                    <>
                        <Link to={`/product/${productName}`} >
                            <button 
                            onClick={()=>handleDelete(params.id)}
                            className='w-[80px] h-[40px] bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300'>
                                <AiOutlineEye size={20} />
                            </button>
                        </Link>
                    </>
                )
            }
        },
        {
            field:"Delete",
            flex:0.8,
            minWidth:100,
            headerName:"",
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return (
                    <>
                        <button className='w-[80px] h-[40px] bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300'>
                            <AiOutlineDelete size={20} />
                        </button>
                    </>
                )
            }
        }

    ];

    const row = [];

    events && events.forEach((item)=>{
        row.push({
            id:item._id,
            name:item.name,
            price:"US$" + item.discountPrice,
            
        })
    })
    return (
    <>
        {
            isLoading?(
                <Loader />
            ): (
                <div>
                    <DataGrid
                    rows = {row}
                    columns = {columns}
                    pageSize = {10}
                    disableSelectionOnClick
                    autoHeight
                    />
                </div>
            )
        }
    </>
  )
}

export default AllEvents