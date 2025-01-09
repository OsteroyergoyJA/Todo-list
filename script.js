document.addEventListener('DOMContentLoaded', function () {
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  savedTodos.forEach((item) => addTodo(item.text, item.completed));
});

document.getElementById('add-button').addEventListener('click', function () {
  const inputValue = document.getElementById('input').value;
  if (inputValue) {
    addTodo(inputValue);
    saveTodoToLocalStorage(inputValue, false);
    document.getElementById('input').value = '';
  }
});

function addTodo(item, isCompleted = false) {
  const todoList = document.getElementById('ul-item');
  const list = document.createElement('li');
  list.textContent = item;

  if (isCompleted) {
    list.classList.add('completed');
  }

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.onclick = function () {
    todoList.removeChild(list);
    removeTodoFromLocalStorage(item);
  };

  list.addEventListener('click', function () {
    list.classList.toggle('completed');
    toggleTodoCompletedInLocalStorage(item);
  });

  list.appendChild(removeButton);
  todoList.appendChild(list);
}

function saveTodoToLocalStorage(item, isCompleted) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push({ text: item, completed: isCompleted });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodoFromLocalStorage(item) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter((todo) => todo.text !== item);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function toggleTodoCompletedInLocalStorage(item) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const todo = todos.find((todo) => todo.text === item);
  if (todo) {
    todo.completed = !todo.completed;
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}
