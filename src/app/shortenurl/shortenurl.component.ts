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
  outputUrl: string[] = [];
  errorMessage: string;
  showSpinner: boolean = false;
  history: string[] = [];

  constructor(private appService: AppService) {}

  onCopy(url) {
    navigator.clipboard
      .writeText(url)
      .then()
      .catch(e => console.error(e));
  }

  onReset() {
    this.userUrl = undefined;
    this.errorMessage = undefined;
    this.outputUrl.length = 0;
    this.showSpinner = false;
    this.history = [];
  }

  showResponseUrl() {
    this.history = [];
    this.showSpinner = true;
    console.log(this.userUrl);
    this.appService.getShortenedUrl(this.userUrl).subscribe({
      next: data => {
        this.response = data;
        this.outputUrl.push(this.response.result.short_link);
        this.appService.saveLocalData(this.outputUrl);
        this.outputUrl.push(this.response.result.short_link2);
        this.showSpinner = false;
      },
      error: err => {
        this.errorMessage = err;
        this.showSpinner = false;
      }
    });
    this.userUrl = '';
  }

  showHistory() {
    this.outputUrl = [];
    this.history = this.appService.getLocalData();
  }
}
