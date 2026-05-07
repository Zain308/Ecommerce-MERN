import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsShop,
} from "../../../redux/actions/product";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { categoriesData } from "../../static/data";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";
import styles from "../../styles/styles";
import { DataGrid } from "@mui/x-data-grid";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [coupons,setCoupons] = useState([]);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [value, setValue] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state)=>state.products)
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${server}/coupon/get-coupon/${seller._id}`,{
      withCredentials:true,
    }).then((res)=>{
      setIsLoading(false);
      setCoupons(res.data.couponCodes);
    }).catch((error) =>{
      setIsLoading(false);
    })
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${server}/coupon/create-coupon-code`, {
        name,
        minAmount,
        maxAmount,
        selectedProducts,
        value,
        shop:seller,
        
      },{withCredentials:true})
      .then((res) => {
        toast.success("Coupon code created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

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
      field: "Delete",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      headerAlign: "center", 
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <button 
              onClick={() => handleDelete(params.row.id)} // Make sure to add your onClick handler here too!
              className="flex items-center justify-center w-[60px] h-[40px] bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300 cursor-pointer"
            >
              <AiOutlineDelete size={20} />
            </button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price:item.value+" %",
        sold:10,
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              onClick={() => setOpen(true)}
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-4`}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>

          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />

          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[2000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => {
                      setOpen(false);
                    }}
                  />
                </div>
                <h5 className="text-[30px] font-poppins text-center">
                  Create Coupon code
                </h5>
                {/* create coupon code */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label htmlFor="" className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your Coupon code name...."
                    />
                  </div>

                  <br />
                  <div>
                    <label htmlFor="" className="pb-2">
                      Discount Percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="value"
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
                      value={value}
                      required
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter your Coupon code value...."
                    />
                  </div>

                  <br />
                  <div>
                    <label htmlFor="" className="pb-2">
                      Minimum Amount
                    </label>
                    <input
                      type="text"
                      name="value"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Enter your Coupon code minimum amount...."
                    />
                  </div>

                  <br />
                  <div>
                    <label htmlFor="" className="pb-2">
                      Maximum Amount
                    </label>
                    <input
                      type="text"
                      name="value"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter your Coupon code minimum amount...."
                    />
                  </div>

                  <br />
                  <div>
                    <label className="pb-2">Selected Product</label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="Choose your selected products">
                        Choose a selected product
                      </option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Create"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
