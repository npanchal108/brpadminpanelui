import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Common } from './common.model';
import { User } from './../shared/user.model';
import { Md5 } from 'ts-md5';

@Injectable()
export class SubuserService {
  common: Common;

  constructor(private http: HttpClient) {
    this.common = new Common();
  }

  GetSubusersList(customerId:number,memRefNo: string,filterQuery: string,pageno:number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/SubUsers/GetSubusersList?userParent=' + customerId + '&memRefNo=' + memRefNo + '&filterQuery=' + filterQuery + '&pageno=' + pageno, { headers: reqHeader });
  }
  
  getUserById(userId) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/Account/GetUserDataForEdit?UserID=' + userId, { headers: reqHeader });
  }

  insertSubUser(user) {
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
      IsActive: user.IsActive,
      IsLocked: false,
      LastUpdatedBy: +localStorage.getItem('LoginUserID'),
      type: 'Subuser',
      ButtenText: '',
      MemberRefNo: user.MemberRefNo,
      HostName: null,
      ProjectTypeID:null,
      ApiUserName: null,
      ApiPassword: null,
      CompanyID: null,
      ApiEndPoint: null,
      NotificationEmails: null,
      UserParent:user.UserParent,
      TabAccess:user.TabAccess
    }
    console.log('insertSubUser',body);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.post(this.common.RootUrl + '/SubUsers/AddUpdateSubUser', body, { headers: reqHeader });
  }
}
