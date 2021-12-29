import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit, OnDestroy {

  note: Note
  subscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

}
