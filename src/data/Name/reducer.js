const initialState = {
  name: "test",
  loading: false,
};

export default function Name(state = initialState, action){
  switch (action.type) {
    case "CHANGE_NAME":
      return {
        ...state,
        name: action.name
      };

    case "LOGIN":
      return {
        loading: true,
      };

    case "LOGIN_SUCCESS": return {
      loading: false,
    };
    case "LOGIN_FAIL": return {
      loading: false,
    };

    default: return state;
  }
}
