import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, filter, from, Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {

  note: Note
  subscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService
  ) { }

  ngOnInit(): void {

    this.subscription = combineLatest([
      this.route.params, this.notesService.notesSubject$
    ]).pipe(
      filter(val => {
        return val[1].length > 0
      })
    ).subscribe(([params, notes]) =>
      this.note = this.notesService.getNote(params['id'])
    )
  }

}
