const initialState = {};

export default function Data(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TO_DATA':
            return {
                ...state,
                [action.name]: action.data
            };
        default:
            return state;
    }
}
