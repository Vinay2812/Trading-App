import { USER_AUTH_FAIL, USER_AUTH_START, USER_AUTH_SUCCESS } from "../actions"
import * as AuthApi from "../../api/AuthRequest"
import logger from "../../utils/logger";

export function register(registerData){
    return async function (dispatch){
        dispatch({type: USER_AUTH_START});
        try {
            const res = await AuthApi.register(registerData);
            dispatch({type: USER_AUTH_SUCCESS, data: res.data})
        } catch (err) {
            dispatch({type: USER_AUTH_FAIL});
            logger.error(err)
        }
    }
}

export function login(loginData){
    return async function (dispatch){
        dispatch({type: USER_AUTH_START});
        try {
            const res = await AuthApi.login(loginData);
            dispatch({type: USER_AUTH_SUCCESS, data: res.data});
        } catch (err) {
            dispatch({type: USER_AUTH_FAIL});
            logger.error(err)
        }
    }
}
