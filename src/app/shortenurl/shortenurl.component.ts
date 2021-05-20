import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ResponseData } from '../response';

@Component({
  selector: 'app-shortenurl',
  templateUrl: './shortenurl.component.html',
  styleUrls: ['./shortenurl.component.css']
})
export class ShortenurlComponent {
  userUrl: string = '';
  response: ResponseData;
  outputUrl: string[] = [];
  errorMessage: string;
  flag: boolean = false;
  errorFlag: boolean = false;
  history: string[] = [];
  historyFlag: boolean = false;

  onCopy(url) {
    navigator.clipboard
      .writeText(url)
      .then()
      .catch(e => console.error(e));
  }

  onReset() {
    this.userUrl = '';
    this.outputUrl = [];
    this.flag = false;
    this.errorFlag = false;
    this.historyFlag = false;
  }

  showResponseUrl() {
    this.outputUrl = [];
    this.flag = true;
    this.errorFlag = false;
    this.historyFlag = false;
    console.log(this.userUrl);
    this.appService.getShortenedUrl(this.userUrl).subscribe({
      next: data => {
        (this.response = data),
          this.outputUrl.push(this.response.result.short_link),
          this.appService.saveLocalData(this.outputUrl),
          this.outputUrl.push(this.response.result.short_link2),
          (this.flag = false);
      },
      error: err => {
        (this.errorMessage = err), (this.errorFlag = true), (this.flag = false);
      }
    });
    this.userUrl = '';
  }

  showHistory() {
    this.outputUrl = [];
    this.history = this.appService.getLocalData();
    console.log('In show history' + this.history);
    this.historyFlag = true;
  }

  constructor(private appService: AppService) {}
}
