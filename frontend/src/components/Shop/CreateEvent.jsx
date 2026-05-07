import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {categoriesData} from "../../static/data"
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../../../redux/actions/product";
import {toast} from "react-toastify"
import { createevent } from "../../../redux/actions/event";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { isLoading,success,error} = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("");
  const [discountPrice,setDiscountPrice] = useState("")
  const [startDate,setStartDate] = useState(null);
  const [endDate,setEndDate] = useState(null);

  const handleStartDateChange = (e) =>{
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60)
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate.toISOString.slice(0,10);
  }

  const handleEndDateChange = (e) => {
    const startDate = new Date(e.target.value);
    setEndDate(endDate);
  }

  const today = new Date().toISOString().slice(0,10);

  const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000) : today;




  useEffect(()=>{
    if(error){
      toast.error(error);
    }

    if(success){
      toast.success("Event created successfully!")
      navigate("/dashboard-events")
      window.location.reload();
    }
  },[dispatch,error,success])

  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit Clicked!");

      if (!seller?._id) {
        return toast.error("Seller ID not found. Please log in again.");
      }    
      const newForm = new FormData();

    images.forEach((image) =>{
      newForm.append("images",image);
    })

    newForm.append("name",name);
    newForm.append("description",description);
    newForm.append("category",category);
    newForm.append("tags",tags);
    newForm.append("originalPrice", Number(originalPrice));
    newForm.append("discountPrice", Number(discountPrice));
    newForm.append("stock", Number(stock));
    newForm.append("shopId",seller._id);
    newForm.append("start_Date",startDate.toISOString());
    newForm.append("Finish_Date",endDate.toISOString());

    console.log("FormData ready, dispatching...");
    dispatch(createevent(newForm))
};

const handleImageChange = (e) => {
      e.preventDefault();
      
      let files = Array.from(e.target.files)
      setImages((prevImages) => [...prevImages, ...files]);
  }

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-poppins text-center">Create Event</h5>
      {/* Create product form */}

      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label htmlFor="" className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Event Product Name...."
          />
        </div>
        
        <br />
        <div>
          <label htmlFor="" className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            rows="8"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your event product description...."
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
          ></textarea>
        </div>
        
        <br />
        <div>
          <label htmlFor="" className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full mt-2 border h-[35px] rounded-[5px]"  
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose a category</option> 
            {categoriesData && categoriesData.map((i) => (
              <option value={i.title} key={i.title}>
                {i.title}
              </option>
            ))}
          </select>
        </div>

        <br />
        <div>
          <label htmlFor="" className="pb-2">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your event product Tags...."
          />
        </div>
        
        <br />
        <div>
          <label htmlFor="" className="pb-2">
            Original Price
          </label>
          <input
            type="number"
            name="price"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your event product price."
          />
        </div>

          
        <br />
        <div>
          <label htmlFor="" className="pb-2">
            Price (with Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product Price with Discount...."
          />
        </div>
          
        <br />
        <div>
          <label htmlFor="" className="pb-2">
            Product Stock<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your event product stock...."
          />
        </div>
          
        <br />
        <div>
          <label htmlFor="" className="pb-2">
            Event Start Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0,10):""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
            value={stock}
            onChange={handleStartDateChange}
            min = {today}
            placeholder="Enter your event product stock...."
          />
        </div>
          
        <br />
        <div>
          <label htmlFor="" className="pb-2">
            Event End Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="start-date"
            value={endDate ? endDate.toISOString().slice(0,10):""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
            value={stock}
            onChange={handleEndDateChange}
            min = {minEndDate}
            placeholder="Enter your event product stock...."
          />
        </div>
          
        <br />
        
        <div>
          <label htmlFor="" className="pb-2">
            Upload Images<span className="text-red-500">*</span>
          </label>
        <div className="w-full flex items-center flex-wrap">
          <input type="file" name="" id="upload" className="hidden" onChange={handleImageChange}/>
          <label htmlFor="upload">
            <AiOutlinePlusCircle
            size={30}
            className="mt-3"
            color="#555"
            />
          </label>
          {images && images.map((i, index) => (
            <img 
              src={URL.createObjectURL(i)} 
              key={index} 
              alt="" 
              className="h-[120px] w-[120px] object-cover m-2"
            />
          ))}
          <br />
        </div>
        </div>
        <div>
            <input type="submit" value="Create" 
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
           />

        </div>

        
      </form>
    </div>
  );
};

export default CreateEvent;
