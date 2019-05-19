export function addToData(name, data) {
    return {
        type: 'ADD_TO_DATA',
        name,
        data
    };
}

export function getData(url, name) {
    return {
        type: 'GET_DATA',
        url,
        name
    };
}
