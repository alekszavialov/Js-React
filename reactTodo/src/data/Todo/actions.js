export function addToTodoList(item) {
  return {
    type: "ADD_TO_LIST",
    item
  }
}

export function modifyTodoList(list) {
  return {
    type: "MODIFY_LIST",
    list
  }
}
