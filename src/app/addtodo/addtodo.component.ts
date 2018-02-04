import { Component, OnInit } from '@angular/core';
import { TodoActions } from '../Actions/TodoActions';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent implements OnInit {

  constructor(private todoAction: TodoActions, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(f) {
  this.todoAction.addTodos(f);
  this.router.navigate(['/dashboard']);
}


}
