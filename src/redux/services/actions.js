import http from '../../tools/http-common';
import {message} from 'antd';
import {doDelete, doGet, doPatch, doPost, doPut, showExceptionMessage} from "./httpActions";
import {
    DATA_LOADING,
    FAIL_EROOR,
    FAIL_LOADING,
    SUCCESS_CREATE,
    SUCCESS_DELETE,
    SUCCESS_GET_ALL,
    SUCCESS_GET_BY_ID,
    SUCCESS_PAGINATION,
    SUCCESS_SEARCH_PAGINATION,
    SUCCESS_UPDATE
} from "../reducers/crudReducer";
import {doLogout} from "./securityAction";

export const findAll = (api) => async dispatch => {
    try {

        startLoading();

        const response = await doGet(api);
        dispatch({
            type: SUCCESS_GET_ALL,
            payload: response.data
        })

    } catch (error) {
        stopLoading();
        showExceptionMessage(error);
    }
}

export const LazyLoadData = (page, size, field, sort, api) => async dispatch => {
    const response = await doGet(`${api}?page=${page}&size=${size}&field=${field}&sort=${sort}`);

    const {pageNumber, totalElements, totalPages, content} = response.data;

    const pagination = {
        current: pageNumber,
        pageSize: response.data.size,
        total: totalElements,
        totalPages: totalPages,
        showTotal: (total, range) => `Taille de page [${size}] - ${range[0]}-${range[1]} / ${total} lignes`
    };

    dispatch({
        type: SUCCESS_PAGINATION,
        pagination: pagination,
        payload: content
    })


}

/**
 * get Element from Backend by id
 * @param id
 * @param api
 * @returns {function(*): Promise<void>}
 */
export const findById = (id, api) => async dispatch => {
    await dispatch({
        type: DATA_LOADING
    });
    const response = await doGet(`${api}?id=${id}`);
    dispatch({
        type: SUCCESS_GET_BY_ID,
        payload: response.data
    })

}


/**
 * get Element from Backend by id and Load Childs
 * @param id
 * @param api
 * @returns {function(*): Promise<void>}
 */
export const findByIdWithChilds = (id, api) => async dispatch => {
    await dispatch({
        type: DATA_LOADING
    });
    const response = await doGet(`${api}?id=${id}`);
    dispatch({
        type: SUCCESS_GET_BY_ID,
        payload: response.data
    })

}

export const searchLazyData = (page, size, field, sort, search, api) => async dispatch => {

    await dispatch({
        type: DATA_LOADING
    });

    const response = await doGet(`${api}?page=${page}&size=${size}&field=${field}&sort=${sort}&search=${search}`);

    const {pageNumber, totalElements, totalPages, content} = response.data;

    const pagination = {
        current: pageNumber,
        pageSize: response.data.size,
        total: totalElements,
        totalPages: totalPages,
        showTotal: (total, range) => `Taille de page [${size}] - ${range[0]}-${range[1]} / ${total} lignes`
    };

    dispatch({
        type: SUCCESS_SEARCH_PAGINATION,
        pagination: pagination,
        payload: content
    })
}


export const exist = (field, value) => async dispatch => {
    try {
        const response = await http.get('/contacts/exist',
            {
                params: {
                    field: field,
                    value: value
                }
            });
        dispatch({
            type: 'CHECK_UNIQUE',
            payload: response.data
        })
    } catch (error) {
        showExceptionMessage(error);
    }
}


export const remove = (id, api) => async dispatch => {
    try {
        await doDelete(`${api}/${id}`);
        dispatch({
            type: SUCCESS_DELETE,
            payload: id
        });
    } catch (error) {
        dispatch({
            type: FAIL_EROOR,
            payload: error.message
        });
    }
}

export const create = (data, api) => async dispatch => {
    try {
        await dispatch({
            type: DATA_LOADING
        });
        const response = await doPost(api, data);

        dispatch({
            type: SUCCESS_CREATE,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FAIL_EROOR,
            payload: error.message
        });
        message.error(`${error.message}.`);
    }
}

export const update = (data, api) => async dispatch => {
    try {
        await dispatch({
            type: DATA_LOADING
        });
        const response = await doPut(api, data);
        dispatch({
            type: SUCCESS_UPDATE,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FAIL_EROOR,
            payload: error.message
        });
        message.error(`${error.message}.`);
    }
};

export const partialUpdate = (data, api) => async dispatch => {
    try {
        const response = await doPatch(api, data);
        dispatch({
            type: SUCCESS_UPDATE,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FAIL_EROOR,
            payload: error.message
        });
    }
}

export const startLoading = () => async dispatch => {
    await dispatch({
        type: DATA_LOADING
    });
}

export const stopLoading = () => async dispatch => {
    await dispatch({
        type: FAIL_LOADING
    });
}

export const catchError = (error, navigate) => dispatch => {
    if (error.response) {
        if (error.response.status === 500) {
            navigate('/error500');
        } else if (error.response.status === 403) {
            dispatch(doLogout());
            navigate('/login');
        } else if (error.response.status === 404) {
            navigate('/error404');
        }
    } else {
        message.error("Error connecting to the server!");
        navigate('/noConnect');
    }
}

export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};



