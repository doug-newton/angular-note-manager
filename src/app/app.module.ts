import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotesComponent } from './notes/notes.component';
import { HomeComponent } from './home/home.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotesComponent,
    HomeComponent,
    NoteListComponent,
    NoteDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
