import { Todo } from "./todo.class";


export class TodoList {

    constructor (){

        //this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo){

        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){

        this.todos = this.todos.filter( todo => todo.id != id); //en el array quedan los que NO tienen el id que le estoy pasando a la funcion.
        this.guardarLocalStorage();
    }

    marcarCompletado( id ) {

        for( const todo of this.todos) {
            console.log(id, todo.id);

            if(todo.id == id) {
                todo.completado = !todo.completado;
                break;
            }
        }

    }

    eliminarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado); //en el array solo quedan los que NO estan completados  
        this.guardarLocalStorage();     
    }

    guardarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify( this.todos));
    }

    cargarLocalStorage() {
        this.todos = (localStorage.getItem('todo'))
                            ? JSON.parse( localStorage.getItem('todo')) 
                            : [];

        this.todos = this.todos.map( obj => Todo.fronJson( obj));
    }
}