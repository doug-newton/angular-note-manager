import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NotesComponent } from './notes/notes.component';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full" },
  {
    path: 'notes', component: NotesComponent, children: [
      { path: 'new', component: NoteEditComponent },
      { path: ':id', component: NoteDetailComponent },
      { path: ':id/edit', component: NoteEditComponent },
    ]
  },
  { path: 'tags', component: TagsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
