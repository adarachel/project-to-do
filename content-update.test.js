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
 
 const checkTodoStatus = (status) => {
   let state;
   if (status === true) {
     state = 'checked';
   } else {
     state = '';
   }
   return state;
 };
 
 const renderTodos = () => {
   document.body.innerHTML = '<div id="todo-list"></div>';
   todoArray.getAllTodos().forEach((todo) => {
     const todoElement = document.createElement('div');
     todoElement.classList.add('todo');
     todoElement.innerHTML = `
                               <input type="text" value="${todo}" />
                               <input type="checkbox"  ${checkTodoStatus(todo.completed)}/>  
                             `;
     document.querySelector('#todo-list').appendChild(todoElement);
   });
 };
 
 beforeAll(() => {
   renderTodos();
 });
 
 describe('Manipulate update', () => {
   test('Update or edit the task description', () => {
     const newTask = new Todo('Its okay', false, 1);
     todoArray.updateTodo(1, newTask);
     const newTask2 = new Todo('Its okay', false, 2);
     todoArray.updateTodo(2, newTask2);
     renderTodos();
     expect(todoArray.getAllTodos()[1].description).toBe('Its okay');
   });

   test('check completed status', () => {
     todoArray.changeCompleted(1);
     renderTodos();
     expect(todoArray.getAllTodos()[0].completed).toBe(true);
   });
 
   test('check dom element is checked completed in checkbox', () => {
     const checkbox = document.querySelectorAll('input[type="checkbox"]');
     expect(checkbox[0].checked).toBe(true);
   });
 
   test('Clear all completed tasks', () => {
     todoArray.clearAllTodos();
     renderTodos();
     expect(todoArray.getAllTodos().length).toBe(2);
   });
 });