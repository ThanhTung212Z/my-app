import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { TodoService } from './todo.service'; // import serivce của chúng ta

@Component({
  selector: 'app-todo',
  
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService] // Khai báo thêm providers
})
export class TodoComponent implements OnInit {
  public todos;
  public newTodo;
  public activeTasks;
  constructor(private todoService: TodoService) { }
  getTodos(){
    return this.todoService.get().then(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo => todo.isDone).length;
    });
  }
  addTodos(){
    this.todoService.add({title: this.newTodo, isDone:false}).then(() => {
      return this.getTodos();
    }).then(() => {
      this.newTodo = ''; // clear input form value
    });
  }
  updateTodo(todo, newValue) {
    todo.title = newValue;
    return this.todoService.put(todo).then(() => {
      todo.editing = false;
      return this.getTodos();
    });
  }
  destroyTodo(todo) {
    this.todoService.delete(todo).then(() => {
      return this.getTodos();
    });
  }
  ngOnInit() {
    this.getTodos();
  }
  
}