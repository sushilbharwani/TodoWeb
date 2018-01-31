import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodolistComponent } from './todolist/todolist.component';
import { AddtodoComponent } from './addtodo/addtodo.component';
import { FooterComponent } from './footer/footer.component';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { todoreducer } from '../app/Reducers/todoreducer';
import { TodoActions } from '../app/Actions/TodoActions';
import { TodoService } from '../app/Services/todo.service';
import {ApiService} from '../app/Services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodolistComponent,
    AddtodoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    StoreModule.provideStore({todoreducer})
  ],
  providers: [TodoActions, TodoService , ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
