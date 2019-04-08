const initialState = {
    list: localStorage.getItem('todoItems') ? JSON.parse(localStorage.getItem('todoItems')) : [],
    text: ''
  }
;

export default function Todo(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM":
      localStorage.setItem('todoItems', JSON.stringify(action.items));
      return {
        ...state,
        list: action.items
      };
    case "NEW_ITEM_TEXT":
      return {
        ...state,
        text: action.text
      };
    default:
      return state;
  }
}
