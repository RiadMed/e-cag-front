import http from "../../tools/http-local";

export const doGetData = (query) => {
    return http.get(query);
}

export const doGetDataById = async (query, id) => {
    const response = await http.get(query);
    const {data} = response;
    const dataFilter = data.filter(x => x.id === id);
    return dataFilter ? dataFilter[0] : null;
}


export const doGetDataByLabel = async (query, label) => {
    const response = await http.get(query);
    const {data} = response;
    const dataFilter = data.filter(x => x.label === label);
    return dataFilter ? dataFilter[0] : null;
}