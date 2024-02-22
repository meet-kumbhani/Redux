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


export const increaseQuantity = (productId) => ({
     type: actionTypes.INCREASE_QUANTITY,
     payload: { productId },
});

export const decreaseQuantity = (productId) => ({
     type: actionTypes.DECREASE_QUANTITY,
     payload: { productId },
});

// https://restcountries.com/v3.1/all