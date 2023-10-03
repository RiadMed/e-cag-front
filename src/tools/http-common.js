import axios from 'axios'
import {TOKEN_KEYS} from "../const/staticKeys";
import dayjs from 'dayjs'
import jwt_decode from "jwt-decode";
import {message} from "antd";

const baseURL = 'http://localhost:8099/cag-api'

const axiosInstance = axios.create({baseURL: baseURL})

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem(TOKEN_KEYS.TOKEN_APP);
        const idAccess = localStorage.getItem(TOKEN_KEYS.ID_ACCESS);
        if (!token) {
            return config;
        }

        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }

        const user = jwt_decode(token)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return config;
        if (dayjs().diff(dayjs.unix(user.exp)) > 900000) {
            message.warning("La session est expirée.")
            return config
        }
        ;

        const response = await axios.post(`${baseURL}/refresh`, {
            idAccess: idAccess,
            token: token
        });
        if (response.data.success) {
            localStorage.clear();
            localStorage.setItem(TOKEN_KEYS.TOKEN_APP, response.data.token);
            localStorage.setItem(TOKEN_KEYS.ID_ACCESS, response.data.idAccess);
            config.headers.authorization = `Bearer ${localStorage.getItem(TOKEN_KEYS.TOKEN_APP)}`;
        } else {
            message.warning(response.data.message);
        }
        return config;
    }
);


export default axiosInstance;