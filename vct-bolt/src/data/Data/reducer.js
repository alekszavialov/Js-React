const addToData = (state, name, data) => {
    const newData = state && state[name] ? state[name] : undefined;
    return newData === undefined
        ? [...data]
        : [...newData, ...data];
};

const initialState = {};

export default function Data(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TO_DATA':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    [action.name]: addToData(state[action.id], action.name, action.data)
                }
            };
        case 'CLEAR_DATA':
            return {
                ...state,
                [action.id]: {}
            };
        default:
            return state;
    }
}
