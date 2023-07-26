import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin: boolean = false;
  constructor(private router: Router) {
  }

  ngOnInit() {
    localStorage.getItem("Role") == "Admin" ? this.isAdmin = true : this.isAdmin = false;
    //    this.menuItems = ROUTES.filter(menuItem => menuItem);
    // $.getScript('../../assets/js/sidebar-moving-tab.js');
  }

  GoToClient() {
    $('.nav li').removeClass('active');
    $('#liCustomer').addClass('active');
    this.sidebarClose();
    this.router.navigate(['/userlist', 'Client'])

  }
  GoToAdmin() {
    $('.nav li').removeClass('active');
    $('#liAdmin').addClass('active');
    this.sidebarClose();
    this.router.navigate(['/userlist', 'Admin'])

  }
  GoToDashboard() {
    $('.nav li').removeClass('active');
    $('#liDashboard').addClass('active');
    this.sidebarClose();
    this.router.navigate(['/dashboard'])

  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('nav-open');
    $('.navbar-toggle').removeClass('toggled');
  };
  Logout() {
    this.sidebarClose();
    localStorage.removeItem('AuthenticationToken');
    localStorage.removeItem('MemberReferenceNo');
    localStorage.removeItem('LoginUserID');
    this.router.navigate(['/login']);
  }
}
