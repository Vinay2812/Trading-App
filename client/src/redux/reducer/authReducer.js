import {
  USER_AUTH_FAIL,
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  USER_UPDATE_ACCOID,
} from "../actions";

const INITIAL_STATE = { authData: {}, error: null, loading: null };
export default function AuthReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_AUTH_START:
      return { ...state, error: false, loading: false };
    case USER_AUTH_SUCCESS:
      return { ...state, authData: action.data, error: false, loading: false };
    case USER_AUTH_FAIL:
      return { ...state, error: true, loading: false };
    case USER_UPDATE_ACCOID:
      return {
        ...state,
        authData: {
          ...state.authData,
          userData: {
            ...state.authData.userData,
            accoid: action.data.accoid,
          },
        },
      };
    default:
      return state;
  }
}
