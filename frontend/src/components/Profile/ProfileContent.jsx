import React, { useState, useEffect } from "react";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { MdOutlineTrackChanges, MdTrackChanges } from "react-icons/md";
import { toast } from "react-toastify";
import {
  deleteUserAddress,
  loadUser,
  updateUserAddress,
  updateUserInformation,
} from "../../../redux/actions/user";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city";
import { getAllOrdersOfUser } from "../../../redux/actions/order";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, updateAddressSuccessMessage]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      setZipCode(user.zipCode || "");
      setAddress1("");
      setAddress2("");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
    toast.success("Profile Updated Successfully!");
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(loadUser());
        toast.success("avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });
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
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
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
                  <label className="block pb-2 font-[600]">
                    Enter Your Password{" "}
                  </label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
      {active === 6 && <ChangePassword />}
      {active === 7 && <Address />}
    </div>
  );
};

const AllOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

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
        <Link to={`/user/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
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
      <DataGrid
        rows={row}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
      />
    </div>
  );
};

// ... Similar logic for AllRefundOrders and TrackOrder (Follow the AllOrders template above)

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordChangeHandler = async () => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        oldPassword,
        newPassword,
        confirmPassword,
        { withCredentials: true },
      )
      .then((res) => {
        toast.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        ChangePassword
      </h1>
      <div className="w-full">
        <form
          action=""
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <input
            className={`w-[95%] h-[40px] border border-[#3a24db] text-center`}
            required
            value="update"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields.");
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        ),
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddres1("");
      setAddres2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item._id));
  };

  return (
    <>
      <div className="w-full px-5">
        {open && (
          <div className="fixed w-full h-screen bg-[#000] top-0 left-0 flex items-center justify-center">
            <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
              <div className="w-full flex justify-end p-3">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
                <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
                  Add New Address
                </h1>

                <div className="w-full">
                  <form
                    aria-required
                    onSubmit={handleSubmit}
                    className="w-full"
                  >
                    <div className="w-full block p-4">
                      <label className="w-full pb-2">Country</label>
                      <select
                        name=""
                        id=""
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-[95%] border"
                      >
                        <option value="" className="block border pb-2">
                          Choose your country
                        </option>
                        {Country &&
                          Country.getAllCountries().map((item) => (
                            <option
                              className="block pb-2"
                              key={item.isoCode}
                              value={item.isoCode}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full block p-4">
                      <label className="w-full pb-2">Choose Your city</label>
                      <select
                        name=""
                        id=""
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-[95%] border"
                      >
                        <option value="" className="block border pb-2">
                          Choose your city
                        </option>
                        {State &&
                          State.getStatesOfCountry().map((item) => (
                            <option
                              className="block pb-2"
                              key={item.isoCode}
                              value={item.isoCode}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full block p-4">
                      <label className="w-full pb-2">Address 1</label>
                      <input
                        type="address"
                        className={`${styles.input}`}
                        required
                        value={address1}
                        onChange={(e) => setAddres1(e.target.value)}
                        name=""
                        id=""
                      />
                    </div>
                    <div className="w-full block p-4">
                      <label className="w-full pb-2">Address 2</label>
                      <input
                        type="address"
                        className={`${styles.input}`}
                        required
                        value={address2}
                        onChange={(e) => setAddres2(e.target.value)}
                        name=""
                        id=""
                      />
                    </div>

                    <div className="w-full block p-4">
                      <label className="w-full pb-2">Zip Code</label>
                      <input
                        type="number"
                        className={`${styles.input}`}
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        name=""
                        id=""
                      />
                    </div>

                    <div className="w-full block p-4">
                      <label className="w-full pb-2">Address Type</label>
                      <select
                        value={addressType}
                        onChange={(e) => setAddressType(e.target.value)}
                        className="w-[95%] border"
                      >
                        <option value="" className="block border pb-2">
                          Choose your Address Type
                        </option>
                        {addressTypeData &&
                          addressTypeData.map((item) => (
                            <option
                              className="block pb-2"
                              key={item.name}
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <input
                        type="submit"
                        className={`${styles.input} mt-5 cursor-pointer`}
                        required
                        readOnly
                        name=""
                        id=""
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
            My Address
          </h1>
          <div
            className={`${styles.button} !rounded-md`}
            onClick={() => setOpen(true)}
          >
            <span className="text-[#fff]">Add New</span>
          </div>
        </div>
        <br />
        {user &&
          user.addresses.map((item, index) => {
            <div
              key={index}
              className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10"
            >
              <h5 className="font-[600]">{item.addressType}</h5>
              <h6>
                {item.address1} {item.address2}
              </h6>
              <h6>{user && user.phoneNumber}</h6>
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>;
          })}

        {user && user.addresses.length === 0 && (
          <h5 className="text-center pt-8 text-[18px]">
            You not have any saved address!
          </h5>
        )}
      </div>
    </>
  );
};

// Minimalist TrackOrder Component Fix
const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

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
        <Link to={`/user/track/order/${params.id}`}>
          <Button>
            <MdTrackChanges size={20} />
          </Button>
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
      <DataGrid rows={row} columns={columns} autoHeight />
    </div>
  );
};

// Refund template fix
const AllRefundOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing refund");

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
        <Link to={`/user/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const row = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: items.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid rows={row} columns={columns} autoHeight />
    </div>
  );
};

export default ProfileContent;
