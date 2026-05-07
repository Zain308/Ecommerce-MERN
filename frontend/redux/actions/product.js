import axios from "axios";
import {server} from "../../src/server";

// create product
export const createProduct = (newForm) => async(dispatch)=>{
    try {
        dispatch({
            type: "productCreateRequest",
        });
        // FIX 1: Added withCredentials: true so the backend allows the upload
        const config = {
            headers: {"Content-Type":"multipart/form-data"},
            withCredentials: true 
        };
        
        const {data} = await axios.post(
            `${server}/product/create-product`,
            newForm,
            config
        );
        dispatch({
            type:"productCreateSuccess",
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: "productCreateFail",
            payload: error.response?.data?.message || "Server connection failed",
        });
    }
}

// get all products
export const getAllProductsShop = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: "getAllProductsShopRequest"
        })

        // FIX 2: Fixed the URL! It was pointing to /event/get-all-events/ by mistake
        // Also added withCredentials: true
        const {data} = await axios.get(`${server}/product/get-all-products-shop/${id}`, {
            withCredentials: true
        });
        
        dispatch({
            type:"getAllProductsShopSuccess",
            payload: data.products,
        })
    } catch (error) {
         dispatch({
            type: "getAllProductsShopFailed",
            payload: error.response?.data?.message || "Server connection failed",
        });
    }
}

// delete product of a shop
export const deleteProduct = (id)=>async(dispatch) =>{
    try {
        dispatch({
            type:"deleteProductRequest",
        })

        const {data} = await axios.delete(`${server}/product/delete-shop-product/${id}`,{
            withCredentials:true
        })

        dispatch({
            type:"deleteProductSuccess",
            payload:data.message,
        });

    } catch (error) {
        dispatch({
            type: "deleteProductFailed",
            // Added fallback error message
            payload: error.response?.data?.message || "Server connection failed",
        });
    }
}