import { LOGOUT_USER, USER_AUTH_FAIL, USER_AUTH_START, USER_AUTH_SUCCESS } from "../actions";

const INITIAL_STATE = {authData: {}, error: null, loading: null}
export default function AuthReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case USER_AUTH_START:
            return {...state, error: false, loading: false}
        case USER_AUTH_SUCCESS:
            return {...state, authData: action.data, error: false, loading: false}
        case USER_AUTH_FAIL:
            return {...state, error: true, loading: false}
        case LOGOUT_USER:
            localStorage.removeItem('store');
            return null
        default:
            return state;
    }
}