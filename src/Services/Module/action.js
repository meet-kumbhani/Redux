import * as actionTypes from "./actionTypes"
import axios from "axios"

export const Fetchalldata = () => {
     return (dispatch) => {
          dispatch({ type: actionTypes.Countries })
          axios.get("http://localhost:3001/phones").then((responce) => {
               dispatch({ type: actionTypes.Countries_Success, payload: responce.data })
          }).catch((err) => {
               dispatch({ type: actionTypes.Countries_Loss, payload: err?.responce?.data?.err })
          });
     }
}


export const Fetchproductdetails = (id) => {
     return (dispatch) => {
          dispatch({ type: actionTypes.Countries })
          axios.get(`http://localhost:3001/phones/${id}`).then((res) => {
               dispatch({ type: actionTypes.Countries_Success, payload: res.data })

          }).catch((err) => {
               dispatch({ type: actionTypes.Countries_Loss, payload: err?.res?.data?.err })
          });
     }
}

// https://restcountries.com/v3.1/all