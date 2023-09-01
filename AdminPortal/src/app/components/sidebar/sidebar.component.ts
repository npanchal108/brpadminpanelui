import { Component, OnInit } from '@angular/core';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin: boolean = false;
  showFiller = false;
  userId: number;
  userType: string;
  userroles: string;
  memRefNo: string;
  isDrawerDisabled: boolean = true;
  openSidebar: boolean = false;
  ignoreUrlList = ['/userlist/Client', '/userlist/Admin', '/useradd/0/Client'];

  activeMenus = [
    {'dynamic-pages' : ['dynamicpages', 'adddynamicpage']},
    {'products' : ['productlist', 'addproduct']},
    {'logosettings' : ['webdesign','addwebdesign']},
    {'websettings' : ['websiteconfigurations', 'addconfig']},
    {'mailsettings' : ['mailtemplate', 'addmailtemplate']},
    {'filtersorting' : ['safilterssort', 'addsafiltersort']},
  ]
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
    if(this.router.url != "/useradd/0/Client" && this.router.url != "/useradd/0/Admin" && this.router.url != "/userlist/Client" && this.router.url != "/userlist/Admin" && localStorage.getItem('UserType') == "Client" && localStorage.getItem('UserId')){
      this.isDrawerDisabled = false
      this.openSidebar = true;
    } else {
      this.isDrawerDisabled = true;
      this.openSidebar = false;
    }
    this.userId = parseInt(localStorage.getItem('UserId'));
    this.userType = localStorage.getItem('UserType');
    this.userroles = localStorage.getItem('Role');
    this.memRefNo = localStorage.getItem('MemRefNo');
  }

  checkActiveClass(key) {
    return key && this.activeMenus ? this.activeMenus.filter(x => x[key] && this.router.url.includes(x[key])).length == 1 ? 'active' : '' : ''
  }
  

  // isMobileMenu() {
  //   if ($(window).width() > 991) {
  //     return false;
  //   }
  //   return true;
  // };
}
