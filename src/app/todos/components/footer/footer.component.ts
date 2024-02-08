import { filter } from 'rxjs';
import { FilterEnum } from './../../types/filter.enum';
import { Observable } from 'rxjs';
import { TodoService } from './../../services/todos.service';
import { Component } from "@angular/core";
import { map } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";



@Component({
    selector: 'app-todos-footer',
    templateUrl: './footer.component.html'
    
})

export class FooterComponent{

    activeCount$: Observable<number>;
    noTodosClass$: Observable<boolean>;
    itemsLeftText$: Observable<string>;
    filter$: Observable<FilterEnum>;
    filterEnum = FilterEnum;
    constructor(private todosService: TodoService, private toastr: ToastrService){
        this.noTodosClass$ = this.todosService.todos$.pipe(
            map((todos) => todos.length === 0)
        )

        this.activeCount$ = this.todosService.todos$.pipe(
            map((todos) => todos.filter((todo) => !todo.isComplete).length)
        )

        this.itemsLeftText$ = this.activeCount$.pipe(
            map((activeCount) => `item${activeCount > 1 ? 's' : ''} left`)
        )

        this.filter$ = this.todosService.filter$
    }

    changeFilter(event: Event, filterName: FilterEnum): void{
        event.preventDefault();
        this.todosService.changeFilter(filterName);
    }

    deleteAllTasks(): void {
        const confirmstatus = window.confirm('Are you sure you want to delete?');
        if(confirmstatus){
            this.todosService.removeAllTasks()
        }
        else{
            console.log("cancelled deleting the task");
        }
      }
      
      
      
      
}