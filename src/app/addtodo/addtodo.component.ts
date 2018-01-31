import { Component, OnInit } from '@angular/core';
import { TodoActions } from '../Actions/TodoActions';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent implements OnInit {

  constructor(private todoAction: TodoActions) { }

  ngOnInit() {
  }

  onSubmit(f) {
  this.todoAction.addTodos(f);
}


}
