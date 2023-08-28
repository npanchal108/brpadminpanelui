import { Component, OnInit } from '@angular/core';
import { NavigationEnd,ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin: boolean = false;
  showFiller = false;
  userId : number;
  userType: string;
  userroles: string;
  memRefNo: string;
  isDrawerDisabled: boolean = true;
  openSidebar:boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    localStorage.getItem("Role") == "Admin" ? this.isAdmin = true : this.isAdmin = false;
    this.userId = parseInt(localStorage.getItem('UserId'));
    this.userType = localStorage.getItem('UserType');
    this.userroles = localStorage.getItem('Role');
    this.memRefNo = localStorage.getItem('MemRefNo');
  }

  ngAfterContentChecked(): void {
    if(this.router.url != "/userlist/Client" && this.router.url != "/userlist/Admin" && localStorage.getItem('UserType') == "Client" && localStorage.getItem('UserId')){
      this.isDrawerDisabled = false
      this.openSidebar = true;
    }else{
      this.isDrawerDisabled = true;
      this.openSidebar = false;
    }
    this.userId = parseInt(localStorage.getItem('UserId'));
    this.userType = localStorage.getItem('UserType');
    this.userroles = localStorage.getItem('Role');
    this.memRefNo = localStorage.getItem('MemRefNo');
  }

  // isMobileMenu() {
  //   if ($(window).width() > 991) {
  //     return false;
  //   }
  //   return true;
  // };
}
