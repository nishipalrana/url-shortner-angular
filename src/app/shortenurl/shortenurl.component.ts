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
  errorMessage: string;
  flag: boolean = false;
  errorFlag: boolean = false;

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
    console.log(this.userUrl);
    this.appService.getShortenedUrl(this.userUrl).subscribe({
      next: data => {
        (this.response = data),
          (this.outputUrl = this.response.result.short_link);
      },
      error: err => {
        (this.errorMessage = err), (this.errorFlag = true), (this.flag = false);
      }
    });
    this.userUrl = '';
  }

  constructor(private appService: AppService) {}
}
