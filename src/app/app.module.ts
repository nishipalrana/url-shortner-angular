import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { ShortenurlComponent } from './shortenurl/shortenurl.component';
import { OriginalurlComponent } from './originalurl/originalurl.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
const routes = [
  { path: 'home', component: HomeComponent },
  { path: 'shortenUrl', component: ShortenurlComponent },
  { path: 'originalUrl', component: OriginalurlComponent },
  { path: 'about', component: AboutComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,
    RouterModule.forRoot(routes),
    
  ],
  declarations: [
    AppComponent,
    ShortenurlComponent,
    OriginalurlComponent,
    HomeComponent,
    AboutComponent
  ],
  bootstrap: [AppComponent],
  providers: [AppService,{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppModule {}
