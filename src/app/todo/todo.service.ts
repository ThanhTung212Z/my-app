import { Injectable } from '@angular/core';

const LANGUAGES = [
  { title: 'HTML', isDone: true },
  { title: 'RUBY ON RAILS', isDone: false },
  { title: 'ANGULAR', isDone: false },
  { title: 'JQUERY', isDone: false },
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor() { }
  get() {
    return new Promise(resolve => resolve(LANGUAGES));
  }
  add(data) {
    return new Promise(resolve => {
      LANGUAGES.push(data);
      resolve(data);
    });
  }
  put(changed) {
    return new Promise(resolve => {
      const index = LANGUAGES.findIndex(todo => todo === changed);
      LANGUAGES[index].title = changed.title;
      resolve(changed);
    });
  }
  delete(selected) {
    return new Promise(resolve => {
      const index = LANGUAGES.findIndex(todo => todo === selected);
      LANGUAGES.splice(index, 1);
      resolve(true);
    });
  }
}
