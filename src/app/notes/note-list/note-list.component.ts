import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {

  notes: Note[]
  subscription: Subscription

  constructor(
    private notesService: NotesService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.notesService.notes$.subscribe(notes => {
      this.notes = notes
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
