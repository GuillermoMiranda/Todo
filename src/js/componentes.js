
import { Todo } from "../classes";
import { todoList } from "../index";


//Referencias en el Html

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltors = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${(todo.completado)? 'completed':''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado)? 'checked':''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
            <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild); //esto lo hago para que no inserte el div en el html. El div se crea para poder poner todo el codigo adentro, pero cuando se inserta en HTML se inserta a partir de <li>. eso se indica con firstElementChild.

    return div.firstElementChild; //aca es el primer hijo del div
}

//eventos

txtInput.addEventListener('keyup', (event)=>{

    if (event.keyCode === 13 && txtInput.value.length > 0) {

        const nuevoTodo = new Todo( txtInput.value);
        todoList.nuevoTodo( nuevoTodo)

        crearTodoHtml (nuevoTodo);
        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', (event) =>{

    const nombreElemento = event.target.localName;  //input, label, button
    const todoElemento = event.target.parentElement.parentElement; //"subo hasta llegar al LI que tiene el ID"
    const todoId = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input')){
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed')
    
    } else if ( nombreElemento.includes('button')) {

        todoList.eliminarTodo( todoId);
        divTodoList.removeChild( todoElemento);
    }

    console.log(todoList)

})

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length-1; i >= 0; i--) { //recorre el listado html de abajo hacia arriba

        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')){

            divTodoList.removeChild(elemento);
        }
    }

});

ulFiltors.addEventListener('click', (event) => {

    const filtro = event.target.text;

    if(!filtro) {return} //filtro trae los texto de los tres botones, es decir, Todos Pendientes o Completados, pero si presiono entre los botones trae UNDEFINED. aca estos haciendo que si es undefined salga del listener.

    anchorFiltros.forEach( elem => elem.classList.remove('selected')); //aca recorre todos los botones seleccionados con la clase "filtro" con un querySelectorAll y les saca la clase selected para que ninguno tenga el recuadrito de que esta seleccionado. Como paso siguiente le pose esa clase al boton que haya sido cliqueado.

    event.target.classList.add('selected');



    for( const elemento of divTodoList.children) {

        elemento.classList.remove('hidden'); //aca a todos los elementos del DIV los pone visibles y luego filtrara de acuerdo a el texto del boton que haya presionado

        const completado = elemento.classList.contains('completed');

        switch (filtro) {

            case 'Pendientes':
                if (completado ){
                    elemento.classList.add('hidden')
                }
            break;

            case 'Completados':
                if (!completado ){
                    elemento.classList.add('hidden')
                }
            break;



        }
    }
})