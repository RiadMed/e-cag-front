export const NOTIFICATION_RESET = "NOTIFICATION_RESET";
export const NOTIFICATION_PLANNED = "NOTIFICATION_PLANNED";
export const NOTIFICATION_ADD = "NOTIFICATION_ADD";
export const INVITATIONS_ADD = "INVITATIONS_ADD";
export const NOTIFICATION_CANCEL = "NOTIFICATION_CANCEL";
export const CHECK_NOTIFICATION = "CHECK_NOTIFICATION";
export const INVITATIONS_CANCEL = "INVITATIONS_CANCEL";

const initialState = {
    list: [],
    count: 0,
    countInvitation: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case NOTIFICATION_PLANNED:
            return {
                ...state,
                count: action.payload
            }
        case NOTIFICATION_ADD:
            return {
                ...state,
                count: state.count + 1
            }
        case NOTIFICATION_CANCEL:
            return {
                ...state,
                count: state.count > 0 ? state.count - 1 : 0
            }
        case NOTIFICATION_RESET:
            return {
                list: [],
                count: 0,
                countInvitation: 0
            }
        case CHECK_NOTIFICATION:
            return {
                ...state,
                countInvitation: action.payload
            }
        case INVITATIONS_CANCEL:
            return {
                ...state,
                countInvitation: state.countInvitation > 0 ? state.countInvitation - 1 : 0
            }
        default:
            return state;

    }
}