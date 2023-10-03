import axiosInstance from '../../tools/http-common';
import {message} from "antd";
import axios from 'axios'

/**
 * Get Data from server
 * @param query
 * @returns {*}
 */
export const doFetch = (query) => {
    return axiosInstance.fetch(query);

}

/**
 * Get Data from server
 * @param query
 * @returns {*}
 */
export const doGet = (query) => {
    return axiosInstance.get(query);

}


/**
 * Get Data from server
 * @param query
 * @returns {*}
 */
export const doGetWithHeader = (query, header) => {
    return axios.get(query, header);
}

/**
 * DELETE data
 * @param id
 * @param dataSource
 * @param api
 * @returns {*}
 */
export const doDelete = (query) => {
    return axiosInstance.delete(query);
}

/**
 * Post data
 * @param data
 * @param query
 * @returns {*}
 */
export const doPost = (query, data) => {
    return axiosInstance.post(query, data);
}

/**
 * PUT data
 * @param data
 * @param query
 * @returns {Promise<AxiosResponse<T>> | Observable<AjaxResponse> | IDBRequest<IDBValidKey> | Promise<void>}
 */
export const doPut = (query, data) => {
    return axiosInstance.put(query, data);
}

/**
 * Patch Data
 * @param query
 * @param data
 * @returns {Promise<AxiosResponse<T>> | Observable<AjaxResponse>}
 */
export const doPatch = (query, data) => {
    return axiosInstance.patch(query, data);
}

/**
 * Show Server Error Message
 * @param error
 */
export const showExceptionMessage = (error) => {
    message.destroy();
    message.error(`${error}.`, 10);
}

/**
 * Error Method Service
 * @param error
 * @param info
 */
export const logErrorToService = (error, info) => {
    console.error("Caught an error:", error, info);
}
