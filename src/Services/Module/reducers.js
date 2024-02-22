import * as actionTypes from "./actionTypes"

const initialstate = {
     loading: false,
     error: "",
     data: [],
     items: []
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

          case actionTypes.INCREASE_QUANTITY:
               return {
                    ...state,
                    data: state.data.map((item) =>
                         item.id === action.payload.productId
                              ? { ...item, quantity: item.quantity + 1 }
                              : item
                    ),
               };

          case actionTypes.DECREASE_QUANTITY:
               return {
                    ...state,
                    data: state.data.map((item) =>
                         item.id === action.payload.productId && item.quantity > 1
                              ? { ...item, quantity: item.quantity - 1 }
                              : item
                    ),
               };
          default: {
               return state
          }
     }
}