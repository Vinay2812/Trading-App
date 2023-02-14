import { ADMIN_AUTH_FAIL, ADMIN_AUTH_START, ADMIN_AUTH_SUCCESS, LOGOUT_ADMIN } from "../actions";

const INITIAL_STATE = {adminData: {}, error: null, loading: null}
export default function AdminReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADMIN_AUTH_START:
            return {...state, error: false, loading: true}
        case ADMIN_AUTH_SUCCESS:
            return {...state, adminData: action.data, error: false, loading: false}
        case ADMIN_AUTH_FAIL:
            return {...state, error: true, loading: false}
        case LOGOUT_ADMIN:
            localStorage.removeItem('store');
            return null
        default:
            return state;
    }
}   