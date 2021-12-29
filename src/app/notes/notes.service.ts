import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, Subject, Subscription, tap } from "rxjs";
import { ApiService } from "../api.service";
import { Note } from "./note.model";

@Injectable({
    providedIn: 'root'
})
export class NotesService {

  notesSubject$: BehaviorSubject<Note[]> = new BehaviorSubject([])
  notes$: Observable<Note[]> = this.apiService.getNotes().pipe(
    tap(notes=> {
      this.notesSubject$.next(notes)
    })
  )

  constructor(
    private apiService: ApiService
  ){
    this.notes$.subscribe()
  }

  getNote(id: string): Note | undefined {
    return this.notesSubject$.getValue().find(note => {
      return note._id === id
    })
  }

}