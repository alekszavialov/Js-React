export function addToData(id, name, data) {
    return {
        type: 'ADD_TO_DATA',
        id,
        name,
        data
    };
}

export function clearData(id) {
    return {
        type: 'CLEAR_DATA',
        id
    };
}

export function getData(id, url, name, params) {
    return {
        type: 'GET_DATA',
        id,
        url,
        name,
        params
    };
}
