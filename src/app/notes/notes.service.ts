import { Injectable } from "@angular/core";
import { Note } from "./note.model";

@Injectable({
    providedIn: 'root'
})
export class NotesService {
  notes: Note[] = [
    {_id: 'fasdfasd', title: 'hello world', body: 'this is a random note'},
    {_id: 'fasdfase', title: 'hello world again', body: 'this is another random note'},
  ]

}