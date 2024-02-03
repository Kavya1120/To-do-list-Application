import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodosComponent } from "src/app/todos/components/todolist/todos.component";
import { HeaderComponent } from "src/app/todos/components/header/header.component";
import { TodoService } from "./services/todos.service";
import { MainComponent } from "./components/main/main.component";
import { FilterEnum } from "./types/filter.enum";

const routes: Routes = [
    {
        path:'',
        component: TodosComponent,
    },
]

@NgModule({
    declarations:[TodosComponent,HeaderComponent,MainComponent],
    imports:[RouterModule.forChild(routes)],
    providers: [TodoService]
})

export class ToDosModule{}