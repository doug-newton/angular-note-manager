import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit, OnDestroy {

  note: Note = {
    _id: '',
    title: '',
    body: '',
    book: '',
    tags: []
  }
  subscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        switchMap(params => {
          return this.notesService.getNote(params['id'])
        })
      )
      .subscribe(note => {
        this.note = note
      })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

}
