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
  currentUserRole:string 
  currentUserAccesses :any

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
    this.currentUserRole = localStorage.getItem("Role")
    this.isAdmin = localStorage.getItem("Role") == "Admin" ? true : false;
    this.userId = parseInt(localStorage.getItem('UserId'));
    this.userType = localStorage.getItem('UserType');
    this.userroles = localStorage.getItem('Role');
    this.memRefNo = localStorage.getItem('memRefNo');
    this.currentUserAccesses = JSON.parse(localStorage.getItem('TabAccess'));
  }

  ngAfterContentChecked(): void {
    if (this.isAdmin == false && localStorage.getItem('UserId')) {
      this.isDrawerDisabled = false
      this.openSidebar = true;
    }
    else {
      if (this.router.url != "/useradd/0/Client" && this.router.url != "/useradd/0/Admin" && this.router.url != "/userlist/Client" && this.router.url != "/userlist/Admin" && localStorage.getItem('UserType') == "Client" && localStorage.getItem('UserId')) {
        this.isDrawerDisabled = false
        this.openSidebar = true;
      } else {
        this.isDrawerDisabled = true;
        this.openSidebar = false;
      }
    }
    this.userId = parseInt(localStorage.getItem('UserId'));
    this.userType = localStorage.getItem('UserType');
    this.userroles = localStorage.getItem('Role');
    this.memRefNo = localStorage.getItem('MemRefNo');
  }

  checkActiveClass(key) {
    return this.activeMenus.map(element => {
      if (element && element[key]) {
        if(element[key].some(a => this.router.url.includes(a))){
          return 'active'
        }
      }
      return ''
    });
  }

  canShowThisMenu(key: string): boolean {
    if(key == "Website Settings" && this.currentUserRole != 'Admin'){
      return false;
    }
    if(this.currentUserRole != 'Subuser') return true;
    const lowerCaseArray = this.currentUserAccesses.map(item => item.toLowerCase());
    const lowerCaseValue = key.toLowerCase();
    return lowerCaseArray.includes(lowerCaseValue);
  }
}
