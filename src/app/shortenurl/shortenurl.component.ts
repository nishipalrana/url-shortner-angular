import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ResponseData } from '../response';

@Component({
  selector: 'app-shortenurl',
  templateUrl: './shortenurl.component.html',
  styleUrls: ['./shortenurl.component.css']
})
export class ShortenurlComponent {
  userUrl: string;
  response: ResponseData;
  outputUrl: string;
  flag: boolean = false;

  onReset() {
    this.userUrl = '';
    this.outputUrl = '';
    this.flag = false;
  }

  showResponseUrl() {
    this.flag = true;
    console.log(this.userUrl);
    this.appService.getShortenedUrl(this.userUrl).subscribe(data => {
      this.response = data;
      this.outputUrl = this.response.result.short_link;
    });
    this.userUrl = '';
  }

  constructor(private appService: AppService) {}
}
