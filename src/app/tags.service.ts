import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Tags } from './tags/tags.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(
    private apiService: ApiService
  ) { }

  getTags(): Observable<Tags> {
    return this.apiService.getTags()
  }
}
