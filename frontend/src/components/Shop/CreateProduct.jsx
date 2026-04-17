import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {categoriesData} from "../../static/data"
import { AiOutlinePlusCircle } from "react-icons/ai";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState();
  const [discountPrice,setDiscountPrice] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
};

const handleImageChange = (e) => {
      e.preventDefault();
      
      let files = Array.from(e.target.files)
      setImages((prevImages) => [...prevImages, ...files]);
  }

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-poppins text-center">Create Product</h5>
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
            placeholder="Enter your Product Name...."
          />
        </div>
        
        <br />
        <div>
          <label htmlFor="" className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="description"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-300 sm:text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description...."
          />
        </div>
        
        <br />
        <div>
          <label htmlFor="" className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select className="w-full mt-2 border h-[35px] rounded-[5px]"  
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {
                categoriesData &&
                    categoriesData.map((i) => (
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
            placeholder="Enter your product Tags...."
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
            placeholder="Enter your product Tags...."
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
            placeholder="Enter your product stock...."
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
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product stock...."
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
          {
            images && images.map((i)=> (
                <img src={URL.createObjectURL(i)} key={i} alt="" 
                className="h-[120px] w-[120px] object-cover m-2"
                />
            )) 
          }
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

export default CreateProduct;
