export function changeName(name){
  return {
    type: "CHANGE_NAME",
    name: name,
  }
}

export function login(name){
  return {
    type: "LOGIN",
    payload: {
      request: {
        type: "GET",
        name: name,
      }
    }

  }
}
