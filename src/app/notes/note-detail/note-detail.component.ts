import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {

  note!: Note

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.note = this.notesService.getNote(params['id'])!
    })
  }

}
