import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full" },
  { path: 'notes', component: NotesComponent, children: [
    { path: ':id', component: NoteDetailComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
