window.onload = function () {
    const newTodoItemTextField = document.getElementById('addNewTodoLine');
    const newTodoItemAddButton = document.getElementById('submitNewLine');
    const todoBody = document.getElementById('todoListBody');
    const removeResolvedItemsButton = document.getElementById('removeResolved');
    const sortListSelect = document.getElementById('sortList');
    const saveChanges = document.getElementById('saveChanges');
    const enterButtonKey = 'Enter';
    const escButtonKey = 'Escape';
    const localStorageKeyName = 'todoList';
    const resolvedItemClassName = 'resolved';

    newTodoItemAddButton.addEventListener('click', function (e) {
        e.stopPropagation();
        createNewItem();
    });

    removeResolvedItemsButton.addEventListener('click', function (e) {
        e.stopPropagation();
        let elements = document.getElementsByClassName(resolvedItemClassName);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        getHtmlItems();
    });

    saveChanges.addEventListener('click', function (e) {
        e.stopPropagation();
        getHtmlItems();
    });

    /**
     * Sort list of element by flag.
     *
     * @param type flag for sort type
     */
    function sortList(type) {
        let todoItems = Array.from(todoBody.getElementsByTagName('li'));
        if (!todoItems) {
            return;
        }
        let sortedList;
        if (typeof type !== 'undefined') {
            sortedList = sortByValue(todoItems.filter(item => item.className === type));
            sortedList = [...sortedList, ...sortByValue(todoItems.filter(item => item.className !== type))];
        } else {
            sortedList = sortByValue(todoItems);
        }
        todoBody.innerText = '';
        sortedList.forEach(function (item) {
            todoBody.appendChild(item);
        });
    }

    /**
     *
     * @param array input data
     * @returns {*} sorted array
     */
    function sortByValue(array) {
        return array.sort((a, b) => {
            return (a.innerText).localeCompare(b.innerText);
        });
    }

    /**
     * Select sorted type
     */
    sortListSelect.addEventListener('change', function () {
        console.log(this.value);
        switch (this.value) {
            case resolvedItemClassName : {
                sortList(resolvedItemClassName);
                break;
            }
            case 'active' : {
                sortList('');
                break;
            }
            default : {
                sortList();
                break;
            }
        }
    });

    /**
     * Load all items from todo list body, convert them into correct string line and save to local storage.
     */
    function getHtmlItems() {
        let todoItems = todoBody.getElementsByTagName('li');
        let newArray = Array.from(todoItems).map(item => {
            if (item.innerText) {
                return "<li" + (item.className ? ` class=${item.className}` : "") + "><p>" + item.innerText + "</p></li>";
            }
        }).filter(item => item !== undefined);
        let htmlItems = newArray.join('');
        localStorage.setItem(localStorageKeyName, htmlItems);
    }

    /**
     * Add new item to todo list if enter button pressed when textfield focused.
     */
    newTodoItemTextField.addEventListener('keydown', function (e) {
        e.stopPropagation();
        if (e.key !== enterButtonKey) {
            return;
        }
        createNewItem();
    });

    /**
     * Create and append new item with data from textfield. Save changes to local storage.
     */
    function createNewItem() {
        let itemText = newTodoItemTextField.value.trim();
        if (!itemText) {
            return;
        }
        newTodoItemTextField.value = '';
        newTodoItemTextField.blur();
        let newItem = document.createElement('li');
        newItem.innerText = itemText;
        todoBody.appendChild(newItem);
        createNewTodoItemArrows(newItem);
        getHtmlItems();
    }

    function createNewTodoItemArrows(item) {
        let arrowUp = document.createElement('span');
        arrowUp.classList.add('up');
        let arrowDown = document.createElement('span');
        arrowDown.classList.add('down');
        let removeButton = document.createElement('div');
        removeButton.classList.add('remove');
        item.append(arrowUp);
        item.append(arrowDown);
        item.append(removeButton);
        arrowUp.addEventListener('click', function (e) {
            console.log(e.parentNode);
            changePosition(e, this.parentNode, (a) => a > 0, -1);
        });
        arrowDown.addEventListener('click', function (e) {
            changePosition(e, this.parentNode, (a, b) => a < b.length - 1, 1);
        });
        removeButton.addEventListener('click', function (e) {
            item.remove();
            getHtmlItems();
        });
    }

    /**
     * Get data from local storage and add it to todo body.
     */
    function loadFromStorage() {
        let storageItems = localStorage.getItem(localStorageKeyName);
        todoBody.innerHTML = storageItems;
        Array.from(todoBody.getElementsByTagName('li')).forEach(function (item) {
            createNewTodoItemArrows(item);
        });
    }

    function changePosition(e, node, compareFunction, value) {
        e.stopPropagation();
        let currentItem = node;
        let newArray = Array.from(todoBody.getElementsByTagName('li'));
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] === currentItem && compareFunction(i, newArray)) {
                [newArray[i], newArray[i + value]] = [newArray[i + value], newArray[i]];
                todoBody.innerText = '';
                newArray.forEach(function (item) {
                    todoBody.appendChild(item);
                });
                break;
            }
        }
    }

    /**
     * Find todo item and add or remove resolved class. Save changes to local storage.
     */
    todoBody.addEventListener('click', function (e) {
        e.stopPropagation();
        let item = e.target;
        if (item.tagName !== 'LI') {
            return;
        }
        if (item.classList.contains(resolvedItemClassName)) {
            item.classList.remove(resolvedItemClassName);
        } else {
            item.classList.add(resolvedItemClassName);
        }
        getHtmlItems();
    });


    /**
     * Find todo item, make it editable, check changes.
     */
    todoBody.addEventListener('dblclick', function (e) {
        e.stopPropagation();
        let item = e.target;
        if (item.tagName !== 'P') {
            return;
        }
        item.setAttribute('contentEditable', true);
        item.setAttribute('lastContent', item.innerText);
        item.focus();
        item.addEventListener('focusout', editTodo);
        item.addEventListener('keydown', editTodo);
    });

    function editTodo(e) {
        if (e.key !== escButtonKey && e.key !== enterButtonKey && e.type !== 'focusout' || !this.hasAttribute('lastContent')) {
            return;
        }
        if (e.key === escButtonKey || e.type === 'focusout') {
            this.innerText = this.getAttribute('lastContent');
        } else {
            getHtmlItems();
        }
        this.removeAttribute('lastContent');
        this.removeAttribute('contentEditable');
    }

    loadFromStorage();

};