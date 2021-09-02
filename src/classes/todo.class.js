

export class Todo {

    static fronJson({id, tarea, completado, creado}){  //este metodo estatico de la clase se usa para convertir los los todos que vienen del localstorage (ya no como instancias de la clase, sino como un Json que viene del localstorage), pero si no son instancias de una clase los metodos de esa clase ya no se podran usar porque los objetos comunes {} no tienen esa posibiliad. Es decir estoy reconstruyendo una instancia del Todo a partir de un objeto guardado en el local storage.

        const tempTodo = new Todo (tarea);

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }


    constructor (tarea){
        this.tarea = tarea;

        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();


    }

    imprimirClase() {
        console.log(`${this.tarea} - ${this.id}`);
    }
}