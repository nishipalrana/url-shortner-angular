import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { OriginalUrlResponse } from '../original-url-response';

@Component({
  selector: 'app-originalurl',
  templateUrl: './originalurl.component.html',
  styleUrls: ['./originalurl.component.css']
})
export class OriginalurlComponent implements OnInit {
  userUrl: string = '';
  response: OriginalUrlResponse;
  outputUrl: string;
  showSpinner: boolean = false;
  errorMessage: string;

  constructor(private appService: AppService) {}

  onCopy() {
    navigator.clipboard
      .writeText(this.outputUrl)
      .then()
      .catch(e => console.error(e));
  }

  onReset() {
    this.userUrl = undefined;
    this.outputUrl = undefined;
    this.errorMessage = undefined;
    this.showSpinner = false;
  }

  showResponseUrl() {
    this.showSpinner = true;
    this.appService.getOriginalUrl(this.userUrl).subscribe({
      next: data => {
        this.response = data;
        this.outputUrl = this.response.result.url;
        this.showSpinner = false;
      },
      error: err => {
        this.errorMessage = err;
        this.showSpinner = false;
        this.outputUrl = '';
      }
    });
    this.userUrl = undefined;
  }

  ngOnInit() {}
}
