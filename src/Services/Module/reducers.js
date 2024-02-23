import * as actionTypes from "./actionTypes"

const initialstate = {
     loading: false,
     error: "",
     data: []
}

export const modulereducer = (state = initialstate, action) => {
     switch (action.type) {
          case actionTypes.Countries: {
               return { ...initialstate, loading: true, error: "", data: [] }
          }
          case actionTypes.Countries_Success: {
               return { ...initialstate, loading: false, data: action.payload }
          }
          case actionTypes.Countries_Loss: {
               return { ...initialstate, loading: false, error: action.payload }
          }
          case actionTypes.REMOVE_ITEM: {
               return {
                    ...state,
                    data: state.data.filter((item) => item.id !== action.payload),
               };
          }
          case actionTypes.UPDATE_QUANTITY: {
               return {
                    ...state,
                    data: state.data.map(item =>
                         item.id === action.payload.itemId ? { ...item, quantity: action.payload.newQuantity } : item
                    ),
               };
          }
          default: {
               return state
          }
     }
}