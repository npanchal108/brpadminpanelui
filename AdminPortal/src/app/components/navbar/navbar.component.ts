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
  isAdmin: boolean = false;
  customerName :string;
  constructor(location: Location, private router: Router) {
    this.location = location;
  }

  ngOnInit() {
    localStorage.getItem("Role") == "Admin" ? this.isAdmin = true : this.isAdmin = false;
    this.customerName = localStorage.getItem('MemberReferenceNo');
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
    localStorage.removeItem('MemRefNo');
    localStorage.removeItem('Role');
    localStorage.removeItem('UserType');
    localStorage.removeItem('UserId');
    localStorage.removeItem('MemRefNo');
    this.router.navigate(['/login']);
  }
  sidebarOpen() {
    const body = document.getElementsByTagName('body')[0]
    body.classList.add('nav-open');
    $('.navbar-toggle').addClass('toggled');
  };
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('nav-open');
    $('.navbar-toggle').removeClass('toggled');
  };
  sidebarToggle() {
    const body = document.getElementsByTagName('body')[0];
     if(!body.classList.contains('nav-open')){
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
      };

}
