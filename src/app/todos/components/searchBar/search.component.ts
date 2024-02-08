import { TodoService } from './../../services/todos.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todos-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  searchText: string = ''
  constructor(private todoservice: TodoService) {}

  changeText(event: Event){
    const target = event.target as HTMLInputElement
    this.searchText = target.value;
}

  updateSearchText(): void {
    this.todoservice.setSearchText(this.searchText);
  }
  clearSearchText(): void{
    this.searchText = ""
    this.todoservice.setSearchText(this.searchText);
  }
}
