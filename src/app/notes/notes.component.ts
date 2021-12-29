import { Component, OnInit } from '@angular/core';

interface Note {
  _id: string
  title: string
  body: string
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: Note[] = [
    {_id: 'fasdfasd', title: 'hello world', body: 'this is a random note'},
    {_id: 'fasdfase', title: 'hello world again', body: 'this is another random note'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
