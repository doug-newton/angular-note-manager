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

  reloadNotes() {
    console.log('reloading notes')
    this.notes$.subscribe(notes => {
      console.log('notes reloaded. nexting notesSubject')
      this.notesSubject$.next(notes)
    })
  }

  postNote(note: Note) {
    return this.apiService.postNote(note).pipe(
      tap(()=>{
        console.log('post note tap')
        this.reloadNotes()
      })
    )
  }

}