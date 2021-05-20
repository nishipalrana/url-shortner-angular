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
  userUrl: string = '';
  response: OriginalUrlResponse;
  outputUrl: string;
  flag: boolean = false;
  errorFlag: boolean = false;
  errorMessage: string;

  onCopy() {
    navigator.clipboard
      .writeText(this.outputUrl)
      .then()
      .catch(e => console.error(e));
  }

  onReset() {
    this.userUrl = '';
    this.outputUrl = '';
    this.flag = false;
    this.errorFlag = false;
  }

  showResponseUrl() {
    this.flag = true;
    this.errorFlag = false;
    this.appService.getOriginalUrl(this.userUrl).subscribe({
      next: data => {
        (this.response = data), (this.outputUrl = this.response.result.url);
      },
      error: err => {
        (this.errorMessage = err),
          (this.errorFlag = true),
          (this.flag = false),
          (this.outputUrl = '');
      }
    });
    this.userUrl = '';
  }

  constructor(private appService: AppService) {}

  ngOnInit() {}
}
