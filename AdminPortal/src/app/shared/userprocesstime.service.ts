import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import 'rxjs/add/operator/map';
import { ProcessTime } from './processtime.model';
import { UserProcessTimes } from './userprocesstime.model';
import { Common } from '../services/common.model';

@Injectable()
export class UserprocesstimeService {
  common: Common;
  constructor(private http: HttpClient) {
    this.common = new Common();
  }
  getProcessTimeList() {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/UserMailBox/GetProcessTimesList', { headers: reqHeader });
  }
  GetBannerListforClient(memRefNo) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/Banners/GetBannerListforClient?memRefNo='+memRefNo, { headers: reqHeader });
  }
  GetBannerDetailsByID(memRefNo,bannerID) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/Banners/GetBannerDetailsByID?memRefNo='+memRefNo + '&bannerID='+bannerID, { headers: reqHeader });
  }
  PostBannerImage(imagemodel) {
    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    this.common.RootUrl
    // return this.http.post('http://localhost:38051' + '/Banners/PostBannerImage',imagemodel);
    return this.http.post(this.common.RootUrl + '/Banners/PostBannerImage',imagemodel);
  }

  insertUser(userProcessTimes: UserProcessTimes) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.post(this.common.RootUrl + '/UserMailBox/InsertUserProcessTimes', userProcessTimes, { headers: reqHeader });
  }

  getUserProcessTime(memRefNo) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/UserMailBox/GetUserProcessTimesByUserID?memRefNo=' + memRefNo, { headers: reqHeader });
  }
  GetSchedulerConfigByUserID(memRefNo) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/UserMailBox/GetSchedulerConfigByUserID?memRefNo=' + memRefNo, { headers: reqHeader });
  }
  GetActivitylogsearch(Activitylog) {
    console.log('activitylogviewnew ',Activitylog);
    var activitylogviewmodel={
     LogType:Activitylog.LogType,
     SearchKeyword:Activitylog.SearchKeyword,
     Description:Activitylog.Description,
     ActivityLogId:Activitylog.ActivityLogId,
     CustID:Activitylog.CustID,
     UserId:Activitylog.UserId,
     ClientIP:Activitylog.ClientIP,
     FromDate:Activitylog.FromDate,
     ToDate:Activitylog.ToDate,
     memRefNo:Activitylog.memRefNo
    }
    console.log('activitylogviewmodel ',activitylogviewmodel);
    // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    // return this.http.post(this.common.RootUrl + '/CompanyProfile/GetActivitylogsearch',activitylogview, { headers: reqHeader });
    return this.http.post(this.common.RootUrl + '/CompanyProfile/GetActivitylogsearch', activitylogviewmodel);
  }
  SyncNow(geturl) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(geturl, { headers: reqHeader });
  }
  setallimages(geturl) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(geturl, { headers: reqHeader });
  }
  setallNewimages(geturl) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(geturl, { headers: reqHeader });
  }

  LogoUploadUser(dorms) {
    return this.http.post(this.common.RootUrl + '/DistOneAPi/PostUserImage', dorms);
  }

  insertScheduler1(data) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.post(this.common.RootUrl + '/DistOneAPi/AddSchedulerConfig', data, { headers: reqHeader });
  }

  syncTblNow(data, url) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.post(url, data, { headers: reqHeader });
  }
}
