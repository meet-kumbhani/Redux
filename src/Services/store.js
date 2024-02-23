import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import rootReducer from "./index"

const middlewares = applyMiddleware(thunk)
export default createStore(rootReducer, {}, middlewares)