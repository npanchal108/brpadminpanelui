import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { Md5 } from 'ts-md5';
import { AsyncPipe } from '@angular/common';
declare var $: any;
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
    //this.sendMessage('start');
    this.user = new User();
    this.getRoles();
    // tslint:disable-next-line: radix
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.userroles = localStorage.getItem('Role');
    if (this.userroles == 'Admin') {
      this.isdesable = false;
    }
    else {
      this.isdesable = true;
    }
    this.getProjectType();
    if (this.userType == 'Admin') {
      $('.nav li').removeClass('active');
      $('#liAdmin').addClass('active');
    }
    else {
      $('.nav li').removeClass('active');
      $('#liCustomer').addClass('active');
    }

    if (!isNaN(this.id) && this.id > 0) {
      this.getUser(this.id);
    }
    //this.sendMessage('stop');
  }

  getProjectType() {

    this.userService.getProjectType().subscribe(res => {
      this.projecttypes = res;
    });
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  OnSubmit(form: NgForm) {
    this.sendMessage('start');
    if(this.user.UserID>0){

    }
    else{
    this.toastr.success("Web Site creation and Data Syncronization is in process please Wait...");
    }
    //this.user.Password=Md5.hashStr(this.user.Password).toString();
    this.userService.insertUser(this.user, this.userType).subscribe((data: any) => {
      this.sendMessage('stop');

      if (data.Status == "Success") {
        form.resetForm();
        this.toastr.success(data.Message);
        //this.router.navigate(['/userlist', this.userType]);
        //this.router.navigate(['/manageuser', this.user.UserID,this.user.MemberRefNo, this.userType]);
        window.location.reload();
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
    this.sendMessage('start');
    this.userService.getUserById(userId).subscribe((res: User) => {
      this.sendMessage('stop');
      this.user = res;
      this.user.Password="";
      this.user.ButtenText = "Update";
    });

  }

  back() {
    this.router.navigate(['/userlist', this.userType]);
  }
}
