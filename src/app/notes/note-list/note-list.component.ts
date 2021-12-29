import { Component, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  notes!: Note[]

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.notes = this.notesService.notes
  }

}
