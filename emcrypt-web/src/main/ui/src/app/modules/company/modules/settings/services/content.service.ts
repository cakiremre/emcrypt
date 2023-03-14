import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from 'src/app/common/services/base-service';
import { Content } from '../model/content';
import { ContentApi } from './api/content-api.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService extends BaseService<Content> {
  instantiate(): Content {
    return new Content();
  }
  constructor(contentApi: ContentApi) {
    super(contentApi);
  }
}
