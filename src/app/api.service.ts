import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from './notes/note.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>("http://localhost:8080/api/notes")
  }

  getNote(id: string): Observable<Note> {
    return this.http.get<Note>(`http://localhost:8080/api/notes/${id}`)
  }

  postNote(note: Note): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/notes', note)
  }
}
