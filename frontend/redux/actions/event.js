    import axios from "axios";
    import {server} from "../../src/server";

   // create event
export const createevent = (newForm) => async(dispatch)=>{
    try {
        dispatch({
            type: "eventCreateRequest",
        });
        
        const config = {
            headers: {"Content-Type":"multipart/form-data"},
            withCredentials: true
        };
        
        const {data} = await axios.post(
            `${server}/event/create-event`,
            newForm,
            config
        );
        
        dispatch({
            type:"eventCreateSuccess",
            payload: data.event,
        });
    } catch (error) {
        dispatch({
            type: "eventCreateFail",
            payload: error.response?.data?.message || "Server connection failed",
        });
    }
}
    // get all products
    export const getAllEventsShop = (id) => async(dispatch) =>{
        try {
            dispatch({
                type: "getAlleventsShopRequest"
            })

            const {data} = await axios.get(`${server}/event/get-all-events/${id}`, {
                withCredentials: true 
            });
            dispatch({
                type:"getAlleventsShopSuccess",
                payload: data.products,
            })
        } catch (error) {
            dispatch({
                type: "getAlleventsShopFailed",
                payload: error.response?.data?.message || "Server connection failed",
            });
        }
    }

    // delete product of a shop

    export const deleteEvent = (id)=>async(dispatch) =>{
        try {
            dispatch({
                type:"deleteeventRequest",
            })

            const {data} = await axios.delete(`${server}/event/delete-shop-event/${id}`,{
                withCredentials:true
            })

            dispatch({
                type:"deleteeventSuccess",
                payload:data.message,
            });

        } catch (error) {
            dispatch({
                type: "deleteeventFailed",
                payload: error.response?.data?.message,
            });
        }
    }