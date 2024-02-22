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
     }
}

// https://restcountries.com/v3.1/all