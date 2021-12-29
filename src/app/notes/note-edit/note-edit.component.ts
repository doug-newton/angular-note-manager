import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subscription, switchMap } from 'rxjs';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesService: NotesService
  ) { }

  note: Note = {
    _id: '',
    title: '',
    body: '',
    book: '',
    tags: []
  }
  subscription: Subscription
  noteForm: FormGroup

  ngOnInit(): void {
    this.initForm()
    this.subscription = this.route.params
    .pipe(
      filter(params => {
        return params['id'] !== undefined
      }),
      switchMap(params=>{
      return this.notesService.getNote(params['id'])
    }))
    .subscribe(note => {
      this.note = note
      this.initForm()
    })
  }

  initForm() {
    this.noteForm = new FormGroup({
      _id: new FormControl(this.note._id),
      title: new FormControl(this.note.title),
      book: new FormControl(this.note.book),
      body: new FormControl(this.note.body),
      tags: new FormArray((this.note.tags ? this.note.tags : []).map(
        tag => new FormControl(tag)
      ))
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  get tagControls() {
    return (<FormArray>this.noteForm.get('tags')).controls
  }


  onSubmit() {
    if (this.noteForm.value._id === '') {
      this.notesService.postNote(this.noteForm.value).subscribe(result => {
        this.router.navigate(['../', result.insertedId], { relativeTo: this.route })
      })
    }
  }

}
