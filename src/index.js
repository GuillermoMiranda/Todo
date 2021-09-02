import { Todo, TodoList } from './classes'; //no indico el archivo luego de la carpeta "classes" porque por defecto buscara el archivo index.js en esa carpeta, y ahi estan todas las importaciones.
import { crearTodoHtml } from './js/componentes';

import './styles.css';

export const todoList = new TodoList();

todoList.todos.forEach(todo => crearTodoHtml( todo ));

todoList.todos[3].imprimirClase();


console.log('todos' , todoList.todos);