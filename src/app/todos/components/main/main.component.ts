import { TodoInterface } from './../../types/todo.interface';
import { TodoService } from './../../services/todos.service';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, combineLatest, Subject } from "rxjs";
import { map, takeUntil } from 'rxjs/operators';
import { FilterEnum } from '../../types/filter.enum';
import { ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'app-todos-main',
    templateUrl: './main.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {

    visibleTodos$: Observable<TodoInterface[]>;
    noTodoClass$: Observable<boolean>;
    isAllTodosSelected$: Observable<boolean>;
    editingId: string | null = null;
    tasks: TodoInterface[] = [];
    
    searchText:string = '';
    private ngUnsubscribe = new Subject<void>();

    constructor(private todoService: TodoService) {
        
    }

    ngOnInit(): void {

        
  
        this.todoService.getTasks().pipe(
            takeUntil(this.ngUnsubscribe)
        ).subscribe(
            tasks => {
                this.todoService.todos$.next(tasks);
                console.log("data of getTasks ===> ", tasks);
            },
            error => {
                console.log("Logged Error: ", error);
            }
        );

        this.noTodoClass$ = this.todoService.todos$.pipe(
            map(tasks => tasks.length === 0),
            takeUntil(this.ngUnsubscribe)
        );

        // this.visibleTodos$ = combineLatest(
        //     this.todoService.todos$,
        //     this.todoService.filter$
        // ).pipe(
        //     map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        //         console.log("combine =>", todos, filter)
        //         if(filter === FilterEnum.active){
        //             console.log("inside active filter");
        //             return todos.filter(todo => !todo.isComplete)
        //         }
        //         else if(filter === FilterEnum.completed){
        //             console.log("inside completed filter");
        //             return todos.filter(todo => todo.isComplete)
        //         }
        //         return todos;
        //     }),
        //     takeUntil(this.ngUnsubscribe)
        // );
        this.todoService.searchText$
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((searchText) => {
          this.searchText = searchText;
          this.updateVisibleTodos();
        });
        
        
        this.isAllTodosSelected$ = this.todoService.todos$.pipe(
            map((todos) => todos.every((todo) => todo.isComplete)),
            takeUntil(this.ngUnsubscribe)
        );
    }

    
    updateVisibleTodos(): void {
        this.visibleTodos$ = combineLatest(
            this.todoService.todos$,
            this.todoService.filter$,
            this.todoService.searchText$
        ).pipe(
            map(([todos, filter, searchText]: [TodoInterface[], FilterEnum, string]) => {
                console.log("SEARCH TEXT====>", searchText);
                console.log("FILTER====>", filter);
    
                let filteredTodos = todos;
    
                if (searchText) {
                    filteredTodos = filteredTodos.filter(todo =>
                        todo.title.toLowerCase().includes(searchText.toLowerCase())
                    );
                }
    
                if (filter === FilterEnum.active) {
                    filteredTodos = filteredTodos.filter(todo => !todo.isComplete);
                } else if (filter === FilterEnum.completed) {
                    filteredTodos = filteredTodos.filter(todo => todo.isComplete);
                }
    
                return filteredTodos;
            }),
            takeUntil(this.ngUnsubscribe)
        );
    
    
    }
    
      

    
    
    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    toggleAllTodos(event : Event): void {
        const target = event.target as HTMLInputElement
        console.log("Target===>",target);
        this.todoService.toggleAll(target.checked);
    }

    setEditingId(editingId: string | null): void {
        console.log("maincom ts seteditingID", editingId);
        this.editingId = editingId;
    }
    
    removeTodoHandler(taskId: string): void {
        const confirmstatus = window.confirm('Are you sure you want to delete?');
        if(confirmstatus){
            this.todoService.removeTodo(taskId);
        }
        else{
            console.log("cancelled deleting the task");
            
        }
        
    }

    toggleTodoHandler(taskId: string): void {
        this.todoService.toggleTodo(taskId);
    }

    changeTodoHandler(event:{taskId: string, newTitle: string, isComplete: boolean}): void {
        this.todoService.changeTodo(event.taskId, event.newTitle, event.isComplete);
    }
}
