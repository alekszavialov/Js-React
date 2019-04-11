const initialState = {
    list: localStorage.getItem('todoItems') ? JSON.parse(localStorage.getItem('todoItems')) : [],
  }
;

export default function Todo(state = initialState, action) {
  switch (action.type) {
    case "MODIFY_LIST":
      return {
        ...state,
        list: action.list
      };
    default:
      return state;
  }
}
