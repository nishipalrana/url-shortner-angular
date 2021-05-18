import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { OriginalUrlResponse } from './original-url-response';
import { ResponseData } from './response';

@Injectable()
export class AppService {
  baseUrl: string = 'https://api.shrtco.de/v2/';

  shortenedUrlReponse$: Observable<ResponseData>;
  originalUrlResponse$: Observable<OriginalUrlResponse>;

  getShortenedUrl(userUrl: string): Observable<ResponseData> {
    const options = userUrl
      ? { params: new HttpParams().set('url', userUrl) }
      : {};
    this.shortenedUrlReponse$ = this.http.get<ResponseData>(
      this.baseUrl + 'shorten',
      options
    );
    return this.shortenedUrlReponse$;
  }

  getOriginalUrl(userUrl: string): Observable<OriginalUrlResponse> {
    let code = 'Gp44lr';

    const options = code ? { params: new HttpParams().set('code', code) } : {};
    return this.http.get<OriginalUrlResponse>(this.baseUrl + 'info', options);
  }

  constructor(private http: HttpClient) {}
}
