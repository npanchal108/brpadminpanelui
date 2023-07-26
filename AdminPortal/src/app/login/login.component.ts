import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Login } from '../shared/login.model';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../services/loading.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@Component({
  providers: [Md5, RecaptchaModule, RecaptchaFormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login;

  isLoginError: boolean = false;
  Errormsg: string = '';
  captcha1: string = null;

  constructor(private userService: UserService, private _md5: Md5, private router: Router, private loadingService: LoadingService) { }

  ngOnInit() {
    this.login = new Login();
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  // resolved(captchaResponse: string) {
  //   this.captcha1 = captchaResponse;
  //   if (this.captcha1 != null) {
  //     this.isLoginError = false;
  //   }
  // }


  OnSubmit(form: NgForm) {
    // if(this.captcha1==null){
    //   this.Errormsg='Please Click on Captcha CheckBox';
    //   this.isLoginError=true;

    // }
    // else{
    this.sendMessage('start');
    this.userService.userLogin(form.value.UserName, Md5.hashStr(form.value.Password)).subscribe((data: any) => {
      if (data.Status == "Failed") {
        this.Errormsg = 'Invalid UserName Or Password';
        this.isLoginError = true;
        this.sendMessage('stop');
      }
      else {
        localStorage.setItem('AuthenticationToken', data.AuthenticationToken);
        localStorage.setItem('MemberReferenceNo', data.MemRefNo);
        localStorage.setItem('LoginUserID', data.UserID);
        localStorage.setItem('PrivateChannel', data.PrivateChannel);
        localStorage.setItem('Role', data.Role);
        if (data.Role == "Admin")
          this.router.navigate(['/dashboard']);
        else
          this.router.navigate(['/manageuser', data.UserID, data.MemRefNo, data.Role]);
        this.sendMessage('stop');
      }

    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.sendMessage('stop');
      });

  }
  // }
}
