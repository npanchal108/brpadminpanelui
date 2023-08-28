import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { Login } from './login.model';
import { Common } from '../services/common.model';
import { Md5 } from 'ts-md5';


@Injectable()
export class UserService {

  common: Common;

  constructor(private http: HttpClient) {
    this.common = new Common();
  }


  userLogin(userName, password) {
    const body: Login = {
      UserName: userName,
      Password: password,
      IsRememberPassword: false,
      Param: '',
      LoginType: true
    }
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True', 'Access-Control-Allow-Origin': '*' });
    return this.http.post(this.common.RootUrl + '/Account/Login', JSON.stringify(body), { headers: reqHeader });
  }

  insertUser(user: User, type: string) {
    if (user.Password != undefined && user.Password != null && user.Password != '') {
      user.Password = Md5.hashStr(user.Password).toString();
    }
    const body: User = {
      UserID: user.UserID,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Mobile: user.Mobile,
      IsActive: true,
      IsLocked: false,
      LastUpdatedBy: +localStorage.getItem('LoginUserID'),
      type: type,
      ButtenText: '',
      MemberRefNo: user.MemberRefNo,
      HostName: user.HostName,
      ProjectTypeID: user.ProjectTypeID,
      ApiUserName: user.ApiUserName,
      ApiPassword: user.ApiPassword,
      CompanyID: user.CompanyID,
      ApiEndPoint: user.ApiEndPoint,
      NotificationEmails: user.NotificationEmails,
    }
    console.log(body);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.post(this.common.RootUrl + '/Account/InsertNewUser', body, { headers: reqHeader });
  }

  getUsers(type: string, pageNo: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/Account/GetUserListToDisplay?type=' + type + '&Email=&Mobile=0&MemberRefNo=&HostName=&pageno=' + pageNo, { headers: reqHeader });
  }

  getProjectType() {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/Account/GetProjectTypelist', { headers: reqHeader });
  }

  getRoles() {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/Account/GetUserRolesList', { headers: reqHeader });
  }

  getUserById(userId) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/Account/GetUserDataForEdit?UserID=' + userId, { headers: reqHeader });
  }

  deleteUser(userId) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/Account/DeactivateUser?UserID=' + userId + '&Active=false', { headers: reqHeader });

  }
}
