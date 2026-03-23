import React, { useState, useEffect } from "react";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";
import { toast } from "react-toastify";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      setZipCode(user.zipCode || "");
      setAddress1(user.address1 || "");
      setAddress2(user.address2 || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Profile Updated Successfully!");
  };

  return (
    <div className="w-full">
      {/* Profile Page Section */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt="Avatar"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit}>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-[600]">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-[600]">Email Address</label>
                  <input
                    type="email"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3 mt-2">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-[600]">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-[600]">Zip Code</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3 mt-2">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-[600]">Address 1</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-[600]">Address 2</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>

              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer hover:bg-[#3a24db] hover:text-white transition-all`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {active === 2 && <AllOrders />}
      {active === 3 && <AllRefundOrders />}
      {active === 5 && <TrackOrder />}
      {active === 6 && <PymentMethod />}
      {active === 7 && <Address />}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    { _id: "7463hvbfbhfbrtr28820221", orderItems: [{ name: "Iphone 14 pro max" }], totalPrice: 120, orderStatus: "Processing" },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    { field: "status", headerName: "Status", minWidth: 130, flex: 0.7, cellClassName: (params) => params.row.status === "Delivered" ? "text-green-600" : "text-red-600" },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 130, flex: 0.7 },
    { field: "total", headerName: "Total", type: "number", minWidth: 130, flex: 0.8 },
    {
      field: "action",
      headerName: "",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/user/order/${params.id}`}>
          <Button><AiOutlineArrowRight size={20} /></Button>
        </Link>
      ),
    },
  ];

  const row = orders.map((item) => ({
    id: item._id,
    itemsQty: item.orderItems.length,
    total: "US$ " + item.totalPrice,
    status: item.orderStatus,
  }));

  return (
    <div className="pl-8 pt-1">
      <DataGrid rows={row} columns={columns} autoHeight disableRowSelectionOnClick />
    </div>
  );
};

// ... Similar logic for AllRefundOrders and TrackOrder (Follow the AllOrders template above)

const PymentMethod = () => (
  <div className="w-full px-5">
    <div className="flex w-full items-center justify-between">
      <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">Payment Method</h1>
      <div className={`${styles.button} !rounded-md`}><span className="text-[#fff]">Add New</span></div>
    </div>
    <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
      <div className="flex items-center">
        <img src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg" alt="Visa" />
        <h5 className="pl-3">ZAIN UL ABIDEEN</h5>
      </div>
      <div className="flex items-center">
        <h6>1234 **** **** ****</h6>
        <h5 className="pl-6">08/2022</h5>
      </div>
      <AiOutlineDelete size={25} className="cursor-pointer" />
    </div>
  </div>
);

const Address = () => (
  <div className="w-full px-5">
    <div className="flex w-full items-center justify-between">
      <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">My Address</h1>
      <div className={`${styles.button} !rounded-md`}><span className="text-[#fff]">Add New</span></div>
    </div>
    <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
      <h5 className="font-[600]">Default</h5>
      <h6>Street 1, Johar Town</h6>
      <h6>+92-123-45678910</h6>
      <AiOutlineDelete size={25} className="cursor-pointer" />
    </div>
  </div>
);

// Minimalist TrackOrder Component Fix
const TrackOrder = () => {
    const orders = [{ _id: "7463hvbfbhfbrtr28820221", orderItems: [{ name: "Iphone 14" }], totalPrice: 120, orderStatus: "Processing" }];
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        { field: "status", headerName: "Status", minWidth: 130, flex: 0.7 },
        { field: "total", headerName: "Total", minWidth: 130, flex: 0.8 },
        {
          field: "action",
          headerName: "",
          flex: 1,
          renderCell: (params) => (
            <Link to={`/user/track/order/${params.id}`}><Button><MdOutlineTrackChanges size={20} /></Button></Link>
          ),
        },
      ];
    const row = orders.map((item) => ({ id: item._id, total: "US$ " + item.totalPrice, status: item.orderStatus }));
    return (
        <div className="pl-8 pt-1">
            <DataGrid rows={row} columns={columns} autoHeight />
        </div>
    );
};

// Refund template fix
const AllRefundOrders = () => {
    const row = []; // Map your refund data here
    const columns = [{ field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 }];
    return (
        <div className="pl-8 pt-1">
            <DataGrid rows={row} columns={columns} autoHeight />
        </div>
    );
}

export default ProfileContent;