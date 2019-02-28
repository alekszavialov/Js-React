window.onload = function () {
    const newTodoItemTextField = document.getElementById('addNewTodoLine');
    const newTodoItemAddButton = document.getElementById('submitNewLine');
    const todoBody = document.getElementById('todoListBody');
    const removeResolvedItemsButton = document.getElementById('removeResolved');
    const enterButtonKey = 'Enter';
    const escButtonKey = 'Escape';
    const localStorageKeyName = 'todoList';
    let htmlItems;
    let storageItems;

    newTodoItemAddButton.addEventListener('click', function () {
        createNewItem();
    });

    removeResolvedItemsButton.addEventListener('click', function () {
        let elements = document.getElementsByClassName('resolved');
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
        getHtmlItems();
    });

    function getHtmlItems() {
        let todoItems = todoBody.getElementsByTagName('li');
        let newArray = Array.from(todoItems).map(item => {
            if (item.innerText) {
                return "<li" + (item.className ? ` class=${item.className}` : "") + ">" + item.innerText + "</li>";
            }
        }).filter(item => item !== undefined);
        htmlItems = newArray.join('');
        localStorage.setItem(localStorageKeyName, htmlItems);
    }

    newTodoItemTextField.addEventListener('keydown', function (e) {
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

    todoBody.addEventListener('click', function (e) {
        let item = e.target;
        if (item.tagName !== 'LI') {
            return;
        }
        if (item.classList.contains('resolved')) {
            item.classList.remove('resolved');
        } else {
            item.classList.add('resolved');
        }
        getHtmlItems();
    });

    todoBody.addEventListener('dblclick', function (e) {
        let item = e.target;
        if (item.tagName !== 'LI') {
            return;
        }
        item.setAttribute('contentEditable', true);
        item.setAttribute('lastContent', item.innerText);
        item.focus();
        item.addEventListener('focusout', discardChanges);
        item.addEventListener('keydown', editTodo);
    });

    function discardChanges() {
        if (this.getAttribute('lastContent')) {
            this.innerText = this.getAttribute('lastContent');
        }
        this.removeAttribute('lastContent');
        this.removeAttribute('contentEditable');
    }

    function editTodo(e) {
        if (e.key === enterButtonKey) {
            this.removeAttribute('lastContent');
            this.removeAttribute('contentEditable');
            getHtmlItems();
        } else if (e.key === escButtonKey) {
            discardChanges.call(this);
        }
    }

    loadFromStorage();

};