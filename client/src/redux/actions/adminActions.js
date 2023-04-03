import * as AdminApi from "../../api/AdminRequest";
import logger from "../../utils/logger";
import {
  ADMIN_AUTH_FAIL,
  ADMIN_AUTH_START,
  ADMIN_AUTH_SUCCESS,
  ADMIN_TAB,
} from "../actions";

export function adminLogin(loginData) {
  return async function (dispatch) {
    dispatch({ type: ADMIN_AUTH_START });
    const res = await AdminApi.adminLogin(loginData);
    if (res.success) {
      dispatch({ type: ADMIN_AUTH_SUCCESS, data: res.data });
      return;
    }
    dispatch({ type: ADMIN_AUTH_FAIL });
  };
}

export function setAdminTab(tab) {
  return async function (dispatch) {
    dispatch({ type: ADMIN_TAB, data: tab });
  };
}
