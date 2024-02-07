import { TodoService } from './../../services/todos.service';
import { Component } from "@angular/core";

@Component({
    selector : 'app-todos-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent {
    text: string = '';

    constructor(private todoService: TodoService){
        // this.todoService.todos$.subscribe((todos) => {
        //     console.log("todos Subject ==> ",todos );
        // })
    }
    changeText(event: Event){
        const target = event.target as HTMLInputElement
        this.text = target.value;
       
    }

    // addTodo(): void{
    //     // console.log("from addtodo", this.text);
    //     this.todoService.addTodo(this.text)
    //     this.text = ''
    // }

    addTodo(): void {
        if (this.text.trim() !== '') {
            this.todoService.addTodo(this.text)
            this.text = '';
        }
    }

    
}