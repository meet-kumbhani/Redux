import { carturl } from "../../Config/urls"
import * as actionTypes from "./actionTypes"
import axios from "axios"

export const Fetchalldata = () => {
     return (dispatch) => {
          dispatch({ type: actionTypes.ITEMS })
          axios.get(carturl).then((responce) => {
               dispatch({ type: actionTypes.ITEMS_SUCCESS, payload: responce.data })
          }).catch((err) => {
               dispatch({ type: actionTypes.ITEMS_LOSS, payload: err?.responce?.data?.err })
          });
          axios
               .delete(`${carturl}/${800}`)
               .then(() => {
                    axios
                         .get(carturl)
                         .then((response) => {
                              dispatch({ type: actionTypes.ITEMS_SUCCESS, payload: response.data })
                         })
                         .catch((err) => {
                              dispatch({ type: actionTypes.ITEMS_LOSS, payload: err?.responce?.data?.err })
                         });
               })
               .catch((err) => {
                    dispatch({ type: actionTypes.ITEMS_LOSS, payload: err?.responce?.data?.err })
               });
     }
}

export const Updatequantity = (itemId, newQuantity) => {
     return dispatch => {
          dispatch({
               type: actionTypes.UPDATE_QUANTITY,
               payload: { itemId, newQuantity }
          });

          axios.patch(`${carturl}/${itemId}`, { quantity: newQuantity })
               .then(response => {
                    console.log(response.data);
               })
               .catch(error => {
                    console.error(error);
               });
     };
};

export const removeitem = (itemId) => ({
     type: actionTypes.REMOVE_ITEM,
     payload: itemId,
});

export const addcart = (item) => ({
     type: actionTypes.ADD_TO_CART,
     payload: item,
});