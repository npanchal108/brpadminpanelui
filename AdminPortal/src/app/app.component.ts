import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public loading = false;
  subscription: Subscription;

  constructor(public location: Location, private loadingService: LoadingService) {
    this.subscription = this.loadingService.getMessage().subscribe(message => {
      if (message.text == 'start') {
        setTimeout(() => {
          this.loading = true;
        });
      }

      if (message.text == 'stop') {
        this.loading = false;
      }

    });
  }

  isLogin(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);

    if (titlee.includes(path)) {
      return false;
    }
    else {
      return true;
    }
  }
}
