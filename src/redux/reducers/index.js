import {combineReducers} from "redux";
import crudReducer from "./crudReducer";
import securityReducer from "./securityReducer";
import notificationReducer from "./notificationReducer";
import noteReducer from "./noteReducer";
import sessionReducer from "./sessionReducer";

export default combineReducers({
    common: crudReducer,
    security: securityReducer,
    notification: notificationReducer,
    notes: noteReducer,
    session: sessionReducer
})
