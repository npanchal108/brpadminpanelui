import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  location: Location;

  constructor(location: Location, private router: Router) {
    this.location = location;
  }

  ngOnInit() {
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(2);
    }
    titlee = titlee.split('/').pop();
    titlee = titlee.substring(0, 1).toUpperCase() + titlee.substring(1);
    
    return titlee;
  }

  Logout() {
    localStorage.removeItem('AuthenticationToken');
    localStorage.removeItem('MemberReferenceNo');
    localStorage.removeItem('LoginUserID');
    localStorage.removeItem('TabIndex');
    this.router.navigate(['/login']);
  }
  
}
