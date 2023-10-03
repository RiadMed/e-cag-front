import http from '../../tools/http-common';
import {
    BACK_TO_LOGIN,
    END_LOADING,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REST_PASS_SUCCESS,
    STAR_LOADING
} from "../reducers/securityReducer";
import {showErrorMessage, showSuccessMessage} from "./messageAction";
import {TOKEN_KEYS} from "../../const/staticKeys";
import jwt_decode from "jwt-decode";
import {doGet} from "./httpActions";
import {DATA_LOADING, INIT_ERROR_DATA} from "../reducers/crudReducer";
import {getInvitations, getPlannedSession} from "./notificationAction";
import {message} from "antd";

/**
 * Login action
 * @param query
 * @param data
 * @returns {*}
 */
export const doLogin = (data, navigate) => async dispatch => {
    localStorage.clear();
    dispatch({
        type: INIT_ERROR_DATA
    });
    await dispatch({type: STAR_LOADING});
    try {
        const response = await http.post(`/login`, data);
        if (response.data.success) {
            localStorage.setItem(TOKEN_KEYS.TOKEN_APP, response.data.token);
            localStorage.setItem(TOKEN_KEYS.ID_ACCESS, response.data.idAccess);
            const decoded = jwt_decode(response.data.token);
            const responseUser = await doGet(`/users?username=${decoded.sub}`);
            const user = responseUser.data.body;
            showSuccessMessage(response.data.message);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: localStorage.getItem(TOKEN_KEYS.TOKEN_APP),
                user: user,
            });
            if (user.isAdmin)
                await dispatch(getPlannedSession(`/sessionCAGs/countSession?orgId=${user.organisationList.map(a => a.key)}`));
            if (user.isMembre)
                await dispatch(getInvitations(`/sessionCAGInvitations/countNotfications?mail=${user.email}`));
            await dispatch({type: END_LOADING});
            navigate(user.nouveauCompte ? '/resetPassword' : '/home', {replace: true});
        } else {
            showErrorMessage(response.data.message);
            await dispatch({type: END_LOADING});
        }
    } catch (error) {
        if (error.response) {
            message.error(error.response.message);
        } else {
            message.error("Error connecting to the server!");
        }
    }

}


/**
 * Logout action
 * @param query
 * @param data
 * @returns {*}
 */
export const doLogout = () => async dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
    localStorage.clear();
}

/**
 * check User roles
 * @param roleNamesList
 * @param roles
 * @returns {boolean}
 */
export const checkRolesUser = (roleNamesList, roles) => {
    let rolesArray = [];
    rolesArray = roleNamesList.filter(el => roles.includes(el));
    return rolesArray.length > 0;
}

export const resetPassword = (data, user, navigate) => async dispatch => {
    await dispatch({
        type: DATA_LOADING
    });
    const response = await http.post(`/users/resetPassword`, data);
    if (response.data.success) {
        message.success(response.data.message);
        dispatch({
            type: REST_PASS_SUCCESS
        });
        if (user.isAdmin)
            await dispatch(getPlannedSession(`/sessionCAGs/countSession?orgId=${user.organisationList.map(a => a.key)}`));
        if (user.isMembre)
            await dispatch(getInvitations(`/sessionCAGInvitations/countNotfications?mail=${user.email}`));
        navigate('/home');
    } else {
        message.error(response.data.message);
    }
}

export const sendPassword = (data) => async dispatch => {
    await dispatch({
        type: DATA_LOADING
    });
    const response = await http.post(`/sendPassword`, data);
    if (response.data.success) {
        message.success(response.data.message);
        dispatch({
            type: BACK_TO_LOGIN
        })
    } else {
        message.error(response.data.message);
    }
}
