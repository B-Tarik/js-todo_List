import h from './helper.js';

const url   = '/api/todos/',
    list    = document.querySelector('.js-list');

h.ready(function(){
    const todoInput = document.querySelector('.js-todoInput');
    
    // get all todos list 
    fetch(url)
    .then(h.handelErrors)
    .then(h.parseJSON)
    .then(queryTodos)
    .catch(h.printError);

    // add todo task
    todoInput.addEventListener('keydown', addTodo);

    // delete/update todo task
    list.addEventListener('click', function(e) {

        // delete todo task
        removeTodo(e ,this);

        // update todo task
        updateTodo(e);

    });
    
});

function queryTodos(todos) {
    const fragment    = document.createDocumentFragment();
        
    todos.forEach(todo => {
        let newLi = createListItem(todo);
            
        addClasses(todo, newLi);

        fragment.appendChild(newLi);
    });
    list.appendChild(fragment); 
}

function addTodo(e) {
    if (e.which === 13) {
        createTodo();
    }
}

function createTodo() {
    const input = document.querySelector('.js-todoInput'),
        userInput = input.value;

    fetch(url, {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({name: userInput})
    })
    .then(h.handelErrors)
    .then(h.parseJSON)
    .then(function(newTodo) {
        input.value = "";
        appendTodo(newTodo);
    })
    .catch(h.printError);
}

function appendTodo(newTodo) {
    const newLi     = createListItem(newTodo);

    addClasses(newTodo, newLi);

    list.appendChild(newLi); 
}

function createListItem(todo) {
    const newLi     = document.createElement('li'),
        newSpan     = document.createElement('span');

        newSpan.textContent = 'x';
        newSpan.classList.add('js-removeTodo');

        newLi.innerHTML = todo.name;
        newLi.appendChild(newSpan);
        newLi.classList.add('js-task');
        newLi.setAttribute('data-id', todo._id);
        newLi.setAttribute('data-completed', todo.completed);

    return newLi;
}

function addClasses(todo, newLi) {
    if (todo.completed) {
        newLi.classList.add('done');
    }
    newLi.classList.add('task');
}

function removeTodo(e , self) {
    if (e.target.tagName === 'SPAN') {
        const todoId  = e.target.parentNode.dataset.id;
        
        fetch(url + todoId, {
            method: 'DELETE',
        })
        .then(h.handelErrors)
        .then(h.parseJSON)
        .then(function(data) {
            self.removeChild(e.target.parentNode);
        })
        .catch(h.printError);
    }
}

function updateTodo(e) {
    if (e.target.tagName === 'LI') {
        
        const liTag     = e.target,
            todoId      = e.target.dataset.id,
            isDone      = !(e.target.dataset.completed === 'true');

        fetch(url + todoId, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
              body: JSON.stringify({completed: isDone})
        })
        .then(h.handelErrors)
        .then(h.parseJSON)
        .then(function(updatedTodo) {
            liTag.classList.toggle('done');
            liTag.setAttribute('data-completed', isDone);
        })
        .catch(h.printError);
    }
    
}