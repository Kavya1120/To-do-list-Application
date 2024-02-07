import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subject} from "rxjs";
import { TodoInterface } from "../types/todo.interface";
import { FilterEnum } from "../types/filter.enum";
import { HttpClient } from '@angular/common/http';
import { ToastrService } from "ngx-toastr";
import {takeUntil } from 'rxjs/operators';


@Injectable()
export class TodoService implements OnDestroy{
    todos$ =  new BehaviorSubject<TodoInterface[]>([]);
    filter$ =  new BehaviorSubject<FilterEnum>(FilterEnum.all)
    
    private ngUnsubscribe = new Subject<void>();
    private apiUrl = 'http://localhost:5291/api/ToDoList';
    
    constructor(private http: HttpClient, private toastr: ToastrService){
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    getTasks(): Observable<TodoInterface[]>{
        return this.http.get<TodoInterface[]>(this.apiUrl);
    }

   
    
    addTodo(title: string): void {
        const newTodo: TodoInterface = {
            title,
            description: 'test',
            dueDate: new Date('2024-02-02T06:03:44.177Z'),
            isComplete: false,
            createdDate: new Date('2024-02-02T06:03:44.177Z'),
            modifiedDate: new Date('2024-02-02T06:03:44.177Z'),
        };
        
        this.http.post<TodoInterface>(`${this.apiUrl}`, newTodo).pipe(
            takeUntil(this.ngUnsubscribe)).subscribe(
            (response) => {
                console.log('Task added successfully', response); 
                this.toastr.success("Task added successfully");
                this.getTasks().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
                    (todos) => {
                        this.todos$.next(todos);
                    },
                    (error) => {
                        console.error('Error fetching tasks after adding a new todo:', error);
                        this.toastr.error("'Error fetching tasks after adding a new todo")
                    }
                );
            },
            (error) => {
                console.error('Error adding task', error);
            }
        )
        
    }
    

    

    toggleAll(isCompleted: boolean): void{
        const updatedTodos = this.todos$.getValue().map(todo => {
            return{
                ...todo,
                isCompleted
            }
        });
        this.todos$.next(updatedTodos)
    }

    changeFilter(filterName: FilterEnum): void{
        this.filter$.next(filterName);
    }

    
    updateTask(id: string, updatedTask: TodoInterface): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put(url, updatedTask);
    }
    changeTodo(id: string, text: string, isCompleteStatus: boolean): void {
        const updatedTodos = this.todos$.getValue().map(todo => {
            if (todo.task_Id === id) {
                todo.title = text;
                todo.isComplete = isCompleteStatus;
                this.updateTask(id, todo).pipe(
                    takeUntil(this.ngUnsubscribe) 
                ).subscribe(
                    () => {
                        console.log('Task updated successfully');
                        this.toastr.success("Task updated successfully");
                        this.getTasks().pipe(
                            takeUntil(this.ngUnsubscribe) 
                        ).subscribe(
                            (todos) => {
                                this.todos$.next(todos);
                            },
                            (error) => {
                                console.error('Error fetching tasks after updating a new todo:', error);
                                this.toastr.error("'Error fetching tasks after adding a new todo")
                            }
                        );
                    },
                    (error) => {
                        console.error('Error updating task', error);
                        this.todos$.next([...this.todos$.getValue()]);
                    }
                );
            }
            return todo;
        });
    
        
    }

    deleteTask(id: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url);
      }
    
     deleteAllTasks(): Observable<any> {
        return this.http.delete(this.apiUrl);
  }
    removeTodo(id: string){
        const updatedTodos = this.todos$
        .getValue()
        .filter(todo =>
            todo.task_Id !== id,
            this.deleteTask(id).pipe(
                takeUntil(this.ngUnsubscribe) 
            ).subscribe(
                () => {
                    console.log('Task deleted successfully');
                    this.toastr.success("Task deleted successfully");
                    this.getTasks().pipe(
                        takeUntil(this.ngUnsubscribe) 
                    ).subscribe(
                        (todos) => {
                            this.todos$.next(todos);
                        },
                        (error) => {
                            console.error('Error fetching tasks after deleting a new todo:', error);
                            this.toastr.error("'Error fetching tasks after adding a new todo")

                        }
                    );
                },
                (error) => {
                    console.error('Error updating task', error);
                    this.todos$.next([...this.todos$.getValue()]);
                }
            )
            )
        this.todos$.next(updatedTodos)
    }

    removeAllTasks(): void {
        this.deleteAllTasks()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(
            (response) => {
              console.log('All tasks deleted successfully', response);
              this.toastr.success("All tasks deleted successfully");

              this.getTasks()
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(
                  (todos) => {
                    this.todos$.next(todos);
                  },
                  (error) => {
                    console.error('Error fetching tasks after deleting all tasks:', error);
                    this.toastr.error("Error fetching tasks after deleting all tasks");
                  }
                );
            },
            (error) => {
              console.error('Error deleting tasks:', error);
              this.toastr.error('Error deleting tasks');
            }
          );
      }


    
     toggleTodo(id:string): void{
        const updatedTodos = this.todos$.getValue().map(todo => {
            if(todo.task_Id === id){
                return{
                    ...todo,
                    isCompleted: !todo.isComplete
                }
            }
            return todo
        });
        this.todos$.next(updatedTodos)
     }
     
}