export const FIND_SESSION_CAG_BY_ID = "FIND_SESSION_CAG_BY_ID";
export const UPDATE_SESSION_CAG_CHILD = "UPDATE_SESSION_CAG_CHILD";
export const UPDATE_ALL_SESSION_CAG_CHILD = "UPDATE_ALL_SESSION_CAG_CHILD";
export const SESSION_CAG_LOADING = "SESSION_CAG_LOADING";
export const SESSION_CAG_STOP_LOADING = "SESSION_CAG_STOP_LOADING";

const initialState = {
    selected: {},
    children: [],
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SESSION_CAG_LOADING:
            return {
                ...state,
                loading: true
            }
        case SESSION_CAG_STOP_LOADING:
            return {
                ...state,
                loading: false
            }
        case FIND_SESSION_CAG_BY_ID:
            return {
                ...state,
                selected: action.payload,
                children: action.children,
                loading: false
            }
        case UPDATE_SESSION_CAG_CHILD:
            return {
                ...state,
                children: state.children.map(x => x.id === action.payload.id ? action.payload : x),
                loading: false
            }
        case UPDATE_ALL_SESSION_CAG_CHILD:
            return {
                ...state,
                children: action.payload,
                loading: false
            }
        default:
            return state;

    }
}