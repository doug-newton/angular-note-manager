import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TagsService } from '../tags.service';
import { Tags } from './tags.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags$: Observable<Tags> = this.tagsService.getTags()

  constructor(
    private tagsService: TagsService
  ) { }

  ngOnInit(): void {
  }

}
