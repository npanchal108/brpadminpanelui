import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Login } from '../shared/login.model';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../services/loading.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login;

  isLoginError: boolean = false;
  Errormsg: string = '';

  constructor(private userService: UserService, private router: Router, private loadingService: LoadingService) {
    const md5 = new Md5();
  }

  ngOnInit() {
    this.login = new Login();
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }

  OnSubmit(form: NgForm) {
    this.sendMessage('start');
    this.userService.userLogin(form.value.UserName, Md5.hashStr(form.value.Password)).subscribe((data: any) => {
      if (data.Status == "Failed") {
        this.Errormsg = 'Invalid UserName Or Password';
        this.isLoginError = true;
        this.sendMessage('stop');
      }
      else if(data.Status == "Activation"){
        this.Errormsg = 'User Activation Required';
        this.isLoginError = true;
        this.sendMessage('stop');
      }
      else {
        localStorage.setItem('AuthenticationToken', data.AuthenticationToken);
        localStorage.setItem('MemberReferenceNo', data.MemRefNo);
        localStorage.setItem('LoginUserID', data.UserID);
        localStorage.setItem('PrivateChannel', data.PrivateChannel);
        localStorage.setItem('Role', data.Role);
        localStorage.setItem('TabAccess', data.TabAccess);
        localStorage.setItem('UserParent', data.UserParent);
        console.log('data==>',data);
        if (data.Role == "Admin") {
          this.router.navigate(['/userlist/Admin']);
        }
        else if(data.Role == "Subuser"){
          // console.log('UserParent',data.UserParent);
          // console.log('UserType',data.Role);
          // console.log('MemRefNo',data.UserParentMemberRefNo);
          // console.log('UserID',data.UserID);
          localStorage.setItem('UserId', data.UserParent);
          localStorage.setItem('UserType', "Client");
          localStorage.setItem('MemRefNo', data.UserParentMemberRefNo);
          this.router.navigate(['/useradd', data.UserID, data.Role]);
        }
        else {
          localStorage.setItem('UserId', data.UserID);
          localStorage.setItem('UserType', data.Role);
          localStorage.setItem('MemRefNo', data.MemRefNo);
          this.router.navigate(['/useradd', data.UserID, data.Role]);
        }
      }
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.Errormsg = 'Something went wrong.Please contact your Administrator.';
        this.sendMessage('stop');
      });
  }
}
