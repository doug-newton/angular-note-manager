import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {

  notes: Note[]
  notesChangedSubscription: Subscription
  tagFilterSubscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService
  ) {
    const tag = this.route.snapshot.params['tag']
    console.log(tag)
  }

  ngOnInit(): void {
    this.notesChangedSubscription = this.notesService.notesSubject$.subscribe(notes => {
      this.notes = notes
    })
    this.notesService.reloadNotes()

    this.tagFilterSubscription = this.route.params.pipe(
      filter(params => {
        return params['tag'] !== undefined
      }),
      map(params => {
        return params['tag']
      })).subscribe(tag => {
        this.notesService.filterNotesByTag(tag)
      })
  }

  ngOnDestroy(): void {
      this.notesChangedSubscription.unsubscribe()
  }

}
