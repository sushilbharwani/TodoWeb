import { TodoService } from '../Services/todo.service';
import { Store } from '@ngrx/store';
import { ACTIONS } from '../Reducers/todoreducer';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoActions {

    constructor(private todoService: TodoService, private store: Store<any>) {

    }

    getTodos() {
        this.todoService.getTodos().subscribe(result => {
           // console.log(result);
            this.store.dispatch(
              {
                  type: ACTIONS.GET_TODO,
                  payload: result
              }
            );
           });
    }

    addTodos(todoObj) {
         this.todoService.addTodo(todoObj).subscribe(result => {
         this.store.dispatch(
             {
               type: ACTIONS.ADD_TODO,
               payload: result
             }
         );

        });
    }

    removeTodos(id) {
        this.todoService.removeTodo(id).subscribe(result => {
        this.store.dispatch(
            {
              type: ACTIONS.ADD_TODO,
              payload: result
            }
        );

       });
   }

   updateTodos(todoObj) {
    this.todoService.updateTodo(todoObj).subscribe(result => {
    this.store.dispatch(
        {
          type: ACTIONS.ADD_TODO,
          payload: result
        }
    );

   });
}

}
