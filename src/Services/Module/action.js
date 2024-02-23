import { carturl } from "../../Config/urls"
import * as actionTypes from "./actionTypes"
import axios from "axios"

export const Fetchalldata = () => {
     return (dispatch) => {
          dispatch({ type: actionTypes.Countries })
          axios.get(carturl).then((responce) => {
               dispatch({ type: actionTypes.Countries_Success, payload: responce.data })
          }).catch((err) => {
               dispatch({ type: actionTypes.Countries_Loss, payload: err?.responce?.data?.err })
          });

          axios
               .delete(`${carturl}/${800}`)
               .then(() => {
                    axios
                         .get(carturl)
                         .then((response) => {
                              dispatch({ type: actionTypes.Countries_Success, payload: response.data })
                         })
                         .catch((err) => {
                              dispatch({ type: actionTypes.Countries_Loss, payload: err?.responce?.data?.err })
                         });
               })
               .catch((err) => {
                    dispatch({ type: actionTypes.Countries_Loss, payload: err?.responce?.data?.err })
               });
     }
}

export const removeFromCart = (itemId) => ({
     type: actionTypes.REMOVE_ITEM,
     payload: itemId,
});

export const updateQuantity = (itemId, newQuantity) => {
     return dispatch => {
          dispatch({
               type: actionTypes.UPDATE_QUANTITY,
               payload: { itemId, newQuantity }
          });

          axios.patch(`${carturl}/${itemId}`, { quantity: newQuantity })
               .then(response => {
                    console.log("Quantity updated successfully:", response.data);
               })
               .catch(error => {
                    console.error("Error updating quantity:", error);
               });
     };
};


export const addToCart = (item) => ({
     type: actionTypes.ADD_TO_CART,
     payload: item,
});

// https://restcountries.com/v3.1/all