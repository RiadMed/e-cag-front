import {doDelete, doGet, doPost} from "./httpActions";
import {FAIL_EROOR, SUCCESS_CREATE, SUCCESS_DELETE} from "../reducers/crudReducer";
import {INVITATIONS_CANCEL, NOTIFICATION_ADD, NOTIFICATION_CANCEL} from "../reducers/notificationReducer";
import {message} from "antd";
import {FIND_SESSION_CAG_BY_ID, SESSION_CAG_LOADING} from "../reducers/sessionReducer";

export const dateCancel = (id, api) => async dispatch => {
    try {
        await doDelete(`${api}?id=${id}`);
        dispatch({
            type: SUCCESS_DELETE,
            payload: id
        });
        dispatch({
            type: NOTIFICATION_CANCEL
        });
        message.success(`Planification N: ${id} est annulée!.`);
    } catch (error) {
        dispatch({
            type: FAIL_EROOR,
            payload: error.message
        });
        message.error(`${error.message}.`);
    }
}

export const createDate = (data, api, navigate) => async dispatch => {
    try {
        const response = await doPost(api, data);

        if (!response.data.success)
            message.success(response.data.message);

        else {
            dispatch({
                type: SUCCESS_CREATE,
                payload: response.data
            });
            dispatch({
                type: NOTIFICATION_ADD
            });
            message.success(`Opération effectuée avec succès!.`);
            navigate('/sessionCAGs/planifications')
        }
    } catch (error) {
        dispatch({
            type: FAIL_EROOR,
            payload: error.message
        });
        message.error(`${error.message}.`);
    }
}

export const validerDate = (data, api, navigate) => async dispatch => {
    try {
        const response = await doPost(api, data);

        if (!response.data.success)
            message.success(response.data.message);

        else {
            dispatch({
                type: SUCCESS_CREATE,
                payload: response.data
            });
            dispatch({
                type: NOTIFICATION_CANCEL
            });
            message.success(`Opération effectuée avec succès!.`);
            navigate('/sessionCAGs/aValider')
        }
    } catch (error) {
        dispatch({
            type: FAIL_EROOR,
            payload: error.message
        });
        message.error(`${error.message}.`);
    }
}

export const sendInvitationCAG = (data, api, navigate) => async dispatch => {
    try {
        const response = await doPost(api, data);

        if (!response.data.success)
            message.success(response.data.message);

        else {
            dispatch({
                type: SUCCESS_CREATE,
                payload: response.data
            });
            message.success(`Invitations envoyé avec succès!.`);
            navigate('/sessionCAGs');
        }
    } catch (error) {
        dispatch({
            type: FAIL_EROOR,
            payload: error.message
        });
        message.error(`${error.message}.`);
    }
}

export const saveFileCAG = (data, api) => async dispatch => {
    try {
        const response = await doPost(api, data);

        if (!response.data.success)
            message.success(response.data.message);
        else
            message.success(`Fichier sauvegarder avec succès!.`);
    } catch (error) {
        message.error(`${error.message}.`);
    }
}


export const goToNextStep = (param, api, navigate) => async dispatch => {
    try {
        const response = await doGet(`${api}?idSession=${param}`);

        if (!response.data.success)
            message.success(response.data.message);
        else {
            message.success(`Étape sauvegarder avec succès!.`);
            navigate('/sessionCAGs');
        }
    } catch (error) {
        dispatch({
            type: FAIL_EROOR,
            payload: error.message
        });
        message.error(`${error.message}.`);
    }
}

export const deleteFilesById = async (id) => {
    await doDelete(`/sessionCAGFiles/${id}`);
    message.success(`Fichier supprimer!.`);
}

/**
 * change le status de l'invitation
 * @param id
 * @returns {function(*): Promise<void>}
 */
export const changeInvitationStatus = (id) => async dispatch => {
    try {
        const response = await doGet(`/sessionCAGInvitations/changeStatus?id=${id}`);
        if (!response.data.success) {
            message.error(response.data.message);
        } else {
            if (response.data.message !== '')
                message.success(response.data.message);
            dispatch({
                type: INVITATIONS_CANCEL
            })
        }


    } catch (error) {
        dispatch({
            type: FAIL_EROOR,
            payload: error.message
        });
        message.error(`${error.message}.`);
    }
}

/**
 * get Element from Backend by id
 * @param id
 * @param api
 * @returns {function(*): Promise<void>}
 */
export const findSessionCAGById = (id, api) => async dispatch => {
    await dispatch({
        type: SESSION_CAG_LOADING
    });
    const response = await doGet(`${api}?id=${id}`);
    dispatch({
        type: FIND_SESSION_CAG_BY_ID,
        payload: response.data,
        children: response.data.invitationsList
    })

}