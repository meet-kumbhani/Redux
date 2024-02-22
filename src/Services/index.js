import { combineReducers } from "redux";
import { modulereducer } from "./Module/reducers";

export default combineReducers({
     items: modulereducer
})