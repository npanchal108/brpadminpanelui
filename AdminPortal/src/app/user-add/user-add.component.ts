import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user: User;
  roles: any;
  projecttypes: any;
  id: number;
  userType: string;
  userroles: string;
  isdesable = false;
  constructor(private userService: UserService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private loadingService: LoadingService) { }


  ngOnInit() {
    this.user = new User();
    this.getRoles();
    this.id = parseInt(localStorage.getItem('UserId'));
    this.userType = localStorage.getItem('UserType')
    this.userroles = localStorage.getItem('Role');
    if (this.userroles == 'Admin') {
      this.isdesable = false;
    }
    else {
      this.isdesable = true;
    }
    this.getProjectType();

    if (!isNaN(this.id) && this.id > 0) {
      this.getUser(this.id);
    }
  }

  ngAfterContentChecked(): void {
    this.id = parseInt(localStorage.getItem('UserId'));
    this.userType = localStorage.getItem('UserType');
    this.userroles = localStorage.getItem('Role');
  }

  getProjectType() {
    this.userService.getProjectType().subscribe(res => {
      this.projecttypes = res;
    });
  }

  OnSubmit(form: NgForm) {
    if (this.user.UserID > 0) {

    }
    else {
      this.toastr.success("Web Site creation and Data Syncronization is in process please Wait...");
    }
   
    this.userService.insertUser(this.user, this.userType).subscribe((data: any) => {
      if (data.Status == "Success") {
        //form.resetForm();
        this.toastr.success(data.Message);
        this.router.navigate(['/userlist', this.userType]);
      }
      else {
        this.toastr.error(data.Message);
      }
    });
  }

  getRoles() {
    this.userService.getRoles().subscribe(res => {
      this.roles = res;
    });
  }

  getUser(userId) {
    this.userService.getUserById(userId).subscribe((res: User) => {
      this.user = res;
      this.user.Password = "";
      this.user.ButtenText = "Update";
    });
  }

  back() {
    this.router.navigate(['/userlist', this.userType]);
  }
}
