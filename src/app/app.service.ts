import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OriginalUrlResponse } from './original-url-response';
import { ResponseData } from './response';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl: string = 'https://api.shrtco.de/v2/';

  shortenedUrlReponse$: Observable<ResponseData>;
  originalUrlResponse$: Observable<OriginalUrlResponse>;
  outputUrls: string[] = [];
  //The explicit way of writing private http: HttpClient
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  getShortenedUrl(userUrl?: string): Observable<ResponseData> {
    if (!userUrl) {
      return throwError('Input cannot be blank');
    }
    const options = userUrl
      ? { params: new HttpParams().set('url', userUrl) }
      : {};
    this.shortenedUrlReponse$ = this.http
      .get<ResponseData>(this.baseUrl + 'shorten', options)
      .pipe(catchError(this.handleError));

    return this.shortenedUrlReponse$;
  }

  getOriginalUrl(userUrl?: string): Observable<OriginalUrlResponse> {
    if (!userUrl) {
      return throwError('Input cannot be blank');
    }
    let code = userUrl.substring(userUrl.lastIndexOf('/') + 1);

    const options = code ? { params: new HttpParams().set('code', code) } : {};

    this.originalUrlResponse$ = this.http
      .get<OriginalUrlResponse>(this.baseUrl + 'info', options)
      .pipe(catchError(this.handleError));

    return this.originalUrlResponse$;
  }

  private handleError(err: HttpErrorResponse) {
    console.log('In handle Error method');
    console.log(err.error.error);
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error Occured: ${err.error.message}`;
    } else {
      errorMessage = `Error Occured: ${err.error.error} [HTTP Status]: ${
        err.status
      }`;
    }
    return throwError(errorMessage);
  }

  saveLocalData(output?: string[]) {
    this.outputUrls = this.getLocalData() ?? [];
    this.outputUrls.push(output[0]);
    localStorage.setItem('outputUrlArray', JSON.stringify(this.outputUrls));
  }

  getLocalData(): string[] {
    let result: string[] = JSON.parse(localStorage.getItem('outputUrlArray'));
    return result;
  }
}
