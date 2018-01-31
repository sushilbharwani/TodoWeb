import { Component, OnInit } from '@angular/core';
import { Todo } from '../Model/todo';
import { TodoService } from '../Services/todo.service';
import { Store } from '@ngrx/store';
import { ACTIONS } from '../Reducers/todoreducer';
import {TodoActions } from '../Actions/TodoActions';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  providers: [TodoService]
})
export class TodolistComponent implements OnInit {
 todolist: Todo[] = [];

 constructor(private todoService: TodoService, private store: Store<any>, private todoActions: TodoActions) {

  }

 ngOnInit() {

   this.store.select('todoreducer').subscribe(result => {
     console.log(result);
     this.todolist = <Todo[]>result;
   });

   this.todoActions.getTodos();
   /*
   this.todolist.push( <Todo>{title: 'Title 1', description: 'Desc 1'});
   this.todolist.push( <Todo>{title: 'Title 2', description: 'Desc 2'});
   this.todolist.push( <Todo>{title: 'Title 3', description: 'Desc 3'});
   this.todolist.push( <Todo>{title: 'Title 4', description: 'Desc 4'});
   */
 }

 removeTodo(id) {
   this.todoActions.removeTodos(id);
 }

}
