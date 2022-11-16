/**
 * @jest-environment jsdom
 */

import Todo from './src/modules/Todo.js';
import TodoArray from './__mocks__/todomock.js';

const todoArray = new TodoArray();

for (let i = 0; i < 3; i += 1) {
  const todo = new Todo(`Task ${i}`, false, i + 1);
  todoArray.addTodo(todo);
}

const renderTodos = () => {
  document.body.innerHTML = '<div id="todo-list"></div>';
  todoArray.getAllTodos().forEach((todo) => {
    const todoElement = document.createElement('div');
    todoElement.classList.add('todo');
    todoElement.innerHTML = `<input type="text" value="${todo}" />`;
    document.querySelector('#todo-list').appendChild(todoElement);
  });
};

beforeAll(() => {
  renderTodos();
});

describe('Manipulate todos', () => {
  test('remove todo', () => {
    todoArray.deleteTodo(1);
    renderTodos();
    expect(todoArray.getAllTodos().length).toBe(2);
  });
  test('remove div deleted from the dom', () => {
    const list = document.querySelector('#todo-list').childNodes;
    expect(list.length).toBe(2);
  });
  test('add todo item', () => {
    todoArray.addTodo(
      new Todo('Task list', false, todoArray.getAllTodos().length + 1),
    );
    renderTodos();
    expect(todoArray.getAllTodos().length).toBe(3);
  });
});