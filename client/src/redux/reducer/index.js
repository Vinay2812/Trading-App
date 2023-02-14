import { combineReducers } from "redux"
import authReducer from "./authReducer"
import adminReducer from "./adminReducer"

const reducers = combineReducers({authReducer, adminReducer});;

export default reducers 