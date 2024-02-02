import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubuserService } from '../../services/subuser.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-subuserlist',
  templateUrl: './subuserlist.component.html',
  styleUrls: ['./subuserlist.component.css']
})
export class SubuserlistComponent {
  subUserList: any;
  customerId: number;
  memRefNo: string;
  page: number = 1;
  totalPage: number;
  filteredSubUserList: any[] = [];
  searchText: string = '';
  showtype: number = 1;
  UserID: number;
  FirstName: string;
  LastName: string;
  MemberRefNo: string;
  Password: string;
  Email: string;
  Mobile: string;
  IsActive: boolean;
  IsLocked: boolean;
  roles = ['User Profile',
    'Sub Users',
    'Mail Settings',
    'Data Sync Settings',
    'Logo Settings',
    'Website Settings',
    'E-Mail Template',
    'Page Management',
    'Manufracturer',
    'Products',
    'Bulk Upload',
    'Navigation Settings',
    'Banners Settings',
    'User Cart Report',
    'Activity Logs',
    'Filters Sortings',
    'SEO Management',
    'Delete Caching'
  ];
  targetRoles: any[] = [];

  constructor(private toastr: ToastrService, private spinner: NgxSpinnerService, private subuserService: SubuserService, private router: Router, private route: ActivatedRoute, private loadingService: LoadingService) {

    this.route.params.subscribe(params => {
      this.customerId = parseInt(this.route.snapshot.paramMap.get('id'));
      this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
      this.getSubUserList(this.page);
    });
  }
  onMoveToTarget(event: any): void {
    event.items.forEach(item => {
      if (!this.targetRoles.includes(item)) {
        this.targetRoles.push(item);
      }
    });
  }
  onMoveToSource(event: any): void {
    this.targetRoles = this.targetRoles.filter(item => !event.items.includes(item));
  }
  getSubUserList(pageNo) {
    this.spinner.show();
    this.subuserService.GetSubusersList(this.customerId, this.memRefNo, this.searchText, pageNo).subscribe(res => {
      this.subUserList = res;
      this.filteredSubUserList = this.subUserList;
      try {
        this.totalPage = res[0].TotalPage;
      } catch (Ex) {
        this.totalPage = 1;
      }
      this.showtype = 1;
      this.spinner.hide();
    });

    return pageNo;
  }
  OnAddUser(userID: number) {
    this.resetInputFields();
    this.UserID = userID;
    if (this.UserID > 0) {
      this.getSubUser(this.UserID);
    }
    this.showtype = 2;
  }
  resetInputFields() {
    this.FirstName = "";
    this.LastName = "";
    this.Mobile = "";
    this.MemberRefNo = "";
    this.Email = "";
    this.targetRoles = [];
  }
  getSubUser(userId) {
    this.spinner.show();
    this.subuserService.getUserById(userId).subscribe((res: User) => {
      console.log('res', res);
      this.UserID = res.UserID,
        this.FirstName = res.FirstName,
        this.LastName = res.LastName,
        this.Email = res.Email,
        this.Mobile = res.Mobile,
        this.MemberRefNo = res.MemberRefNo,
        this.IsActive = res.IsActive,
        this.customerId = res.UserParent,
        this.targetRoles = JSON.parse(res.TabAccess);
      this.spinner.hide();
    });
  }
  back() {
    this.getSubUserList(1);
  }
  validateForm(): boolean {
    if (this.FirstName == undefined || this.FirstName == "") {
      this.toastr.error("Please enter First Name");
      return false;
    }
    if (this.LastName == undefined || this.LastName == "") {
      this.toastr.error("Please enter Last Name");
      return false;
    }
    if (this.Mobile == undefined || this.Mobile == "") {
      this.toastr.error("Please enter Mobile");
      return false;
    }
    if (this.Email == undefined || this.Email == "") {
      this.toastr.error("Please enter Email");
      return false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.Email)) {
        this.toastr.error("Please enter a valid Email");
        return false;
      }
    }
    if (this.MemberRefNo == undefined || this.MemberRefNo == "") {
      this.toastr.error("Please enter User ID");
      return false;
    }
    if ((!(this.UserID > 0) && (this.Password == undefined || this.Password == ""))) {
      this.toastr.error("Please enter Password");
      return false;
    }
    if (this.targetRoles == undefined || this.targetRoles.length < 1) {
      this.toastr.error("Please select Assigned Role");
      return false;
    }
    return true;
  }
  SaveSubuser() {
    if (!this.validateForm()) {
      return;
    }
    let user = {
      UserID: this.UserID,
      FirstName: this.FirstName,
      LastName: this.LastName,
      Email: this.Email,
      Mobile: this.Mobile,
      MemberRefNo: this.MemberRefNo,
      Password: this.Password,
      UserParent: this.customerId,
      IsActive: this.IsActive,
      TabAccess: this.targetRoles.length > 0 ? JSON.stringify(this.targetRoles) : null
    }
    this.spinner.show();
    this.subuserService.insertSubUser(user).subscribe((data: any) => {
      this.spinner.hide();
      if (data.Status == "Success") {
        this.toastr.success(data.Message);
        this.resetInputFields();
        this.back();
      }
      else {
        this.toastr.error(data.Message);
      }
    });
  }
}
