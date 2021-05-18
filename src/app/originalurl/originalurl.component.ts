import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { OriginalUrlResponse } from '../original-url-response';
import { ResponseData } from '../response';

@Component({
  selector: 'app-originalurl',
  templateUrl: './originalurl.component.html',
  styleUrls: ['./originalurl.component.css']
})
export class OriginalurlComponent implements OnInit {
  userUrl: string;
  response: OriginalUrlResponse;
  outputUrl: string;
  flag: boolean = false;

  onReset() {
    this.userUrl = '';
    this.outputUrl = '';
    this.flag = false;
  }

  showResponseUrl() {
    this.flag = true;
    this.appService.getOriginalUrl(this.userUrl).subscribe(data => {
      this.response = data;
      this.outputUrl = this.response.result.url;
    });
    this.userUrl = '';
  }

  constructor(private appService: AppService) {}

  ngOnInit() {}
}
