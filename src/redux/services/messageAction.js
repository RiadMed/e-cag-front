import {message} from "antd";

export const showSuccessMessage = (msg) => {
    message.destroy();
    message.success(msg, 10);
}

export const showErrorMessage = (msg) => {
    message.destroy();
    message.error(msg, 10);
}

export const showWarningMessage = (msg) => {
    message.destroy();
    message.warn(msg, 10);
}