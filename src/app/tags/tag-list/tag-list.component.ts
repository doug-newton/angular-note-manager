import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TagsService } from 'src/app/tags.service';
import { Tags } from '../tags.model';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

  tags$: Observable<Tags> = this.tagsService.getTags()

  constructor(
    private tagsService: TagsService
  ) { }

  ngOnInit(): void {
  }

}
