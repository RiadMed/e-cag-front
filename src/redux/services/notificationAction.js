import {doGet} from "./httpActions";
import {CHECK_NOTIFICATION, NOTIFICATION_PLANNED} from "../reducers/notificationReducer";

/**
 * get Element from Backend by id
 * @param id
 * @param api
 * @returns {function(*): Promise<void>}
 */
export const getPlannedSession = (api) => async dispatch => {
    const response = await doGet(`${api}`);
    dispatch({
        type: NOTIFICATION_PLANNED,
        payload: response.data.count
    })

}

/**
 * get Element from Backend by id
 * @param id
 * @param api
 * @returns {function(*): Promise<void>}
 */
export const getInvitations = (api) => async dispatch => {
    const response = await doGet(`${api}`);
    dispatch({
        type: CHECK_NOTIFICATION,
        payload: response.data.count
    })

}