export function addTodoItem(items){
  return {
    type: "ADD_ITEM",
    items
  }
}

export function newTodoItemText(text){
  return {
    type: "NEW_ITEM_TEXT",
    text
  }
}
