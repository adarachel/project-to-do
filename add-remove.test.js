import Todos from "./src/modules/TodoList.js";
import Todo from "./src/modules/Todo.js";

describe('Tests', () => {
    document.body.innerHTML = `<div class="container">
    <div class="header border-bottom flex">
        <h1>TODAY'S TO DO </h1>
        <i class="bx bx-refresh"></i>
    </div>
    <form class="flex border-bottom" id="form">
        <input class="input" type="text" name="todo" placeholder="Add to your list..." />
        <i class='bx bx-subdirectory-left'></i>
    </form>
    <div class="todo-container"></div>
    <div class="clear">
        <button id="remove" type="button">Clear All Completed</button>
    </div>
</div>`;

const task = 'Do the laundry';
  const todo = new Todo(task);

  test('Add new item to the list', () => {
    todo.addTodo();
    const data = JSON.parse(localStorage.getItem('todos'));
    expect(data.length).toBe(1);
  });

  test('Remove new item from the list', () => {
    Todo.removeTodo(0);
    const data = JSON.parse(localStorage.getItem('todos'));
    expect(data.length).toBe(0);
  });
});