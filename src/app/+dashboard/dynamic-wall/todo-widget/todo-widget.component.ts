import { Component, OnInit } from '@angular/core';
import {Todo} from "./todo";
import {TodoService} from "./todo.service";

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html'
})
export class TodoWidgetComponent implements OnInit {

  public newTodo: Todo;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
  }

  createTodo() {
    this.todoService.createTodo(this.newTodo);
    this.newTodo = null

  }

  toggleAdd() {
    if (this.newTodo) {
      this.newTodo = null
    } else {
      this.newTodo = new Todo();
      this.newTodo.state = 'Important'

    }
  }
}
