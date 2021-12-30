import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, Subject, Subscription, tap } from "rxjs";
import { ApiService } from "../api.service";
import { Note } from "./note.model";

@Injectable({
    providedIn: 'root'
})
export class NotesService {

  notesSubject$: BehaviorSubject<Note[]> = new BehaviorSubject([])
  notes$: Observable<Note[]> = this.apiService.getNotes()

  constructor(
    private apiService: ApiService
  ){
    this.notes$.subscribe()
  }

  getNote(id: string): Observable<Note> {
    return this.apiService.getNote(id)
  }

  filterNotesByTag(tag: string) {
    this.notes$.subscribe(notes => {
      this.notesSubject$.next(notes.filter(note => {
        if (note.tags === undefined) return false
        if (note.tags === null) return false
        return note.tags.indexOf(tag) !== -1
      }))
    })
  }

  reloadNotes() {
    this.notes$.subscribe(notes => {
      this.notesSubject$.next(notes)
    })
  }

  postNote(note: Note) {
    return this.apiService.postNote(note).pipe(
      tap(()=>{
        this.reloadNotes()
      })
    )
  }

  putNote(note: Note) {
    return this.apiService.putNote(note).pipe(
      tap(()=>{
        this.reloadNotes()
      })
    )
  }

}