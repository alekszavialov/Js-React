window.onload = function () {
    const newTodoItemTextField = document.getElementById('addNewTodoLine');
    const newTodoItemAddButton = document.getElementById('submitNewLine');
    const todoBody = document.getElementById('todoListBody');
    const enterButtonKey = 'Enter';
    const localStorageKeyName = 'todoList';
    let htmlItems;
    let storageItems;

    newTodoItemAddButton.addEventListener('click', function () {
        createNewItem();
    });

    function getHtmlItems(){
        let todoItems = todoBody.getElementsByTagName('li');
        let newArray = Array.from(todoItems).map(item => {
            if (item.innerText){
                return `<li class=${item.className}>${item.innerText}</li>`;
            }
        }).filter(item => item !== undefined);
        htmlItems = newArray.join('');
        localStorage.setItem(localStorageKeyName, htmlItems);
    }

    newTodoItemTextField.addEventListener('keypress', function (e) {
        if (e.key !== enterButtonKey) {
            return;
        }
        createNewItem();
    });

    function createNewItem() {
        let itemText = newTodoItemTextField.value.trim();
        if (!itemText) {
            return;
        }
        let newItem = document.createElement('li');
        newItem.innerText = itemText;
        todoBody.appendChild(newItem);
        getHtmlItems();
    }

    function loadFromStorage() {
        storageItems = localStorage.getItem(localStorageKeyName);
        todoBody.innerHTML = storageItems;
    }

    todoBody.addEventListener('click',function(e){
        let item = e.target;
        if(item.classList.contains('resolved')){
            item.classList.remove('resolved');
        } else {
            item.classList.add('resolved');
        }
    });

    loadFromStorage();

};