import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './notes/note.model';
import { Tags } from './tags/tags.model';

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

  getNotesWithTag(tag: string): Observable<Note[]> {
    return this.http.get<Note[]>(`http://localhost:8080/api/tags/${tag}`)
  }

  getNote(id: string): Observable<Note> {
    return this.http.get<Note>(`http://localhost:8080/api/notes/${id}`)
  }

  postNote(note: Note): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/notes', note)
  }

  putNote(note: Note): Observable<any> {
    return this.http.put<any>('http://localhost:8080/api/notes', note)
  }

  getTags(): Observable<Tags> {
    return this.http.get<Tags>('http://localhost:8080/api/tags')
  }
}
