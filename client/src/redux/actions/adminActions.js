import * as AdminApi from "../../api/AdminRequest"
import { ADMIN_AUTH_FAIL, ADMIN_AUTH_START, ADMIN_AUTH_SUCCESS, LOGOUT_ADMIN } from "../actions"

export function adminLogin(loginData){
    return async function(dispatch){
        dispatch({type: ADMIN_AUTH_START});
        try {
            const res = await AdminApi.adminLogin(loginData);
            dispatch({type: ADMIN_AUTH_SUCCESS, data: res.data});
        } catch (err) {
            dispatch({type: ADMIN_AUTH_FAIL})
        }
    }
}

export function adminLogout(){
    return async function(dispatch){
        dispatch({type: LOGOUT_ADMIN});
    }
}