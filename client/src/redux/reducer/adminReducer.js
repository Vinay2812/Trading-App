import { ADMIN_AUTH_FAIL, ADMIN_AUTH_START, ADMIN_AUTH_SUCCESS, ADMIN_TAB } from "../actions";

const INITIAL_STATE = {adminData: {}, error: null, loading: null, activeTab: 0}
export default function AdminReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADMIN_AUTH_START:
            return {...state, error: false, loading: true}
        case ADMIN_AUTH_SUCCESS:
            return {...state, adminData: action.data, error: false, loading: false}
        case ADMIN_AUTH_FAIL:
            return {...state, error: true, loading: false}
        case ADMIN_TAB:
            return {...state, activeTab: action.data}
        default:
            return state;
    }
}