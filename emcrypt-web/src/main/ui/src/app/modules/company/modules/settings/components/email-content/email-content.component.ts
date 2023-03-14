import { Component, OnInit, OnDestroy } from '@angular/core';
import { HasSubscription, Language } from 'src/app/common/models/model';
import { Content } from '../../model/content';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-email-content',
  templateUrl: './email-content.component.html',
  styleUrls: ['./email-content.component.scss']
})
export class EmailContentComponent extends HasSubscription implements OnInit, OnDestroy{

  contents: Content[] = [];
  languages = Object.values(Language);

  constructor(private contentService: ContentService){
    super();
  }
  ngOnInit(): void {
    let contents = this.contentService.list().subscribe((data) => {
      this.contents = data;
      console.log(this.contents);
    });
  }
  ngOnDestroy(): void {
    super.onDestroy();
  }

}
