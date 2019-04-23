const initialState = [];

export default function Todo(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_LIST":
      return [
        ...state
        , action.item
      ];
    case "MODIFY_LIST":
      return action.list;
    default:
      return state;
  }
}
