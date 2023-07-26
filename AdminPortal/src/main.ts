import {enableProdMode} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { XHRBackend } from '@angular/http';

import { AppComponent }         from './app/app.component';
import { Location, LocationStrategy, HashLocationStrategy} from '@angular/common';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
