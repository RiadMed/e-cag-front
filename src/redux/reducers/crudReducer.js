export const DATA_LOADING = "DATA_LOADING";
export const FAIL_LOADING = "FAIL_LOADING";
export const SUCCESS_CREATE = "SUCCESS_CREATE";
export const SUCCESS_UPDATE = "SUCCESS_UPDATE"
export const SUCCESS_GET_ALL = "SUCCESS_GET_ALL";
export const SUCCESS_GET_BY_ID = "SUCCESS_GET_BY_ID";
export const SUCCESS_PAGINATION = "SUCCESS_PAGINATION";
export const SUCCESS_SEARCH_PAGINATION = "SUCCESS_SEARCH_PAGINATION";
export const SUCCESS_DELETE = "SUCCESS_DELETE";
export const FAIL_EROOR = "FAIL_EROOR";
export const SUCCESS_ACTION = "SUCCESS_ACTION";
export const HIDE_ALERT = "HIDE_ALERT";
export const SUCCESS_CANCELED_REQUEST = "SUCCESS_CANCELED_REQUEST";
export const FAIL_ERROR_DATA = "FAIL_ERROR_DATA";
export const INIT_ERROR_DATA = "INIT_ERROR_DATA";

const initialState = {
    data: [],
    selected: {},
    childs: [],
    loading: false,
    exist: false,
    saved: false,
    pagination: {
        current: 1,
        pageSize: 5,
        total: 5,
        totalPages: 1,
        showTotal: ''
    },
    showErrorMsg: false,
    showSuccessMsg: false,
    message: '',
    hasError: false,
    codeError: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DATA_LOADING:
            return {
                ...state,
                loading: true
            }
        case FAIL_LOADING:
            return {
                ...state,
                loading: false
            }
        case FAIL_EROOR:
            return {
                ...state,
                showErrorMsg: true,
                hasError: true,
                data: [],
                selected: {},
                message: action.payload
            }
        case FAIL_ERROR_DATA:
            return {
                ...state,
                showErrorMsg: true,
                hasError: true,
                data: [],
                selected: {},
                codeError: action.payload
            }
        case INIT_ERROR_DATA:
            return {
                ...state,
                showErrorMsg: false,
                hasError: false,
                data: [],
                selected: {},
                codeError: {}
            }
        case SUCCESS_ACTION:
            return {
                ...state,
                showSuccessMsg: true,
                message: action.payload
            }
        case HIDE_ALERT:
            return {
                ...state,
                showErrorMsg: false,
                showSuccessMsg: false
            }
        case SUCCESS_GET_ALL:
            return {
                ...state,
                data: action.payload,
                selected: {},
                loading: false
            }
        case SUCCESS_GET_BY_ID:
            return {
                ...state,
                selected: action.payload,
                loading: false
            }

        case SUCCESS_PAGINATION:
            return {
                ...state,
                pagination: action.pagination,
                data: action.payload,
                saved: false,
                selected: {},
                loading: false
            }
        case SUCCESS_SEARCH_PAGINATION:
            return {
                ...state,
                pagination: action.pagination,
                data: action.payload,
                loading: false
            }
        case SUCCESS_DELETE:
            return {
                ...state,
                showSuccessMsg: true,
                message: 'Element suprimé avec succé.',
                data: state.data.filter(x => x.id !== action.payload),
                loading: false
            }
        case SUCCESS_CREATE:
            return {
                ...state,
                data: [...state.data, action.payload],
                selected: action.payload,
                showSuccessMsg: true,
                saved: true,
                message: 'Opération effectué avec succée.',
                loading: false
            };

        case SUCCESS_UPDATE:
            return {
                ...state,
                data: state.data.map(x => x.id === action.payload.id ? action.payload : x),
                selected: action.payload,
                showSuccessMsg: true,
                saved: true,
                message: 'Opération effectué avec succée.',
                loading: false
            };
        case SUCCESS_CANCELED_REQUEST:
            return {
                ...state,
                selected: action.payload,
                showSuccessMsg: true,
                message: 'Opération effectué avec succée.',
                loading: false
            }
        default : {
            return state;
        }
    }
}
