import { Component, OnInit } from '@angular/core';
import { Note } from './note.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes!: Note[]

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.notes = this.notesService.notes
  }

}
