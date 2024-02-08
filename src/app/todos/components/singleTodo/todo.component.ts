import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { TodoInterface } from "../../types/todo.interface";
import { TodoService } from "../../services/todos.service";

@Component({
    selector: 'app-single-todo',
    templateUrl: './todo.component.html'
})

export class SingleTodoComponent implements OnInit,OnChanges{
  @Input('todo') todoProps: TodoInterface;
  @Input('isEditing') isEditingProps: boolean;
  @Input('tasks') taskProps: TodoInterface[] = [];
  @Output('setEditingId') setEditingIdEvent: EventEmitter<
  string | null> = new EventEmitter();
  @Output() removeTodoEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() toggleTodoEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() changeTodoEvent: EventEmitter<{ taskId: string, newTitle: string, isComplete: boolean }> = new EventEmitter<{ taskId: string, newTitle: string, isComplete: boolean }>();

  editingText:string = '';
  @ViewChild('textInput') textInput: ElementRef;

  constructor(private todosService: TodoService){

  }
  ngOnInit(): void {
    this.editingText = this.todoProps.title;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }
  

  setTodoInEditMode(): void{
    this.setEditingIdEvent.emit(this.todoProps.task_Id);
  }

  removeTodo():void{
    // this.todosService.removeTodo(this.todoProps.task_Id)
    this.removeTodoEvent.emit(this.todoProps.task_Id);
  }

  // toggleTodo(): void{
  //   this.todosService.toggleTodo(this.todoProps.task_Id)
  //   this.toggleTodoEvent.emit(this.todoProps.task_Id);
  // }

  changeText(event: Event):void{
    const value = (event.target as HTMLInputElement).value
    this.editingText = value

  }

  changeTodoStatus(event: Event): void {
    this.toggleTodoEvent.emit(this.todoProps.task_Id);
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
        this.todoProps.isComplete = true;
        
    }
    else{
      this.todoProps.isComplete = false;
    }
    this.changeTodo();
}
  
  // changeTodo(changeItem:Event): void{
  //   console.log("eduhu",changeItem);
  //   this.todosService.changeTodo(this.todoProps.task_Id, this.editingText)
  //   this.setEditingIdEvent.emit(null)
  // }
  changeTodo(): void {
    console.log("change todo called, checking isComplete status", this.todoProps.isComplete);
    
    this.changeTodoEvent.emit({ taskId: this.todoProps.task_Id, newTitle: this.editingText, isComplete: this.todoProps.isComplete });
    this.setEditingIdEvent.emit(null);
  }
}

