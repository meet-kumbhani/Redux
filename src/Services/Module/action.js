import { cartlist } from "../../Config/urls"
import * as actionTypes from "./actionTypes"
import axios from "axios"

export const Fetchalldata = () => {
     return (dispatch) => {
          dispatch({ type: actionTypes.Countries })
          axios.get(cartlist).then((responce) => {
               dispatch({ type: actionTypes.Countries_Success, payload: responce.data })
          }).catch((err) => {
               dispatch({ type: actionTypes.Countries_Loss, payload: err?.responce?.data?.err })
          });

          axios
               .delete(`${cartlist}/${800}`)
               .then(() => {
                    axios
                         .get(cartlist)
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

export const updateQuantity = (itemId, newQuantity) => ({
     type: actionTypes.UPDATE_QUANTITY,
     payload: { itemId, newQuantity },
});

// https://restcountries.com/v3.1/all