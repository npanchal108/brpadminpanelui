import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  UploadFolder(modelparam) {
    this.common.RootUrl
    return this.http.post(this.common.RootUrl + '/Banners/UploadFolder',modelparam);
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
  GetUserCartItemDetails(cartItemParam) {
    var cartItemParamviewmodel={
      memRefNo:cartItemParam.memRefNo,
      ItemName: cartItemParam.SearchItem ? cartItemParam.SearchItem.trim() : null,
      UserId:cartItemParam.SearchUser ? cartItemParam.SearchUser.trim() : null,
      Customer:cartItemParam.SearchCustomer ? cartItemParam.SearchCustomer.trim() : null,
      FromDate:cartItemParam.FromDate,
      ToDate:cartItemParam.ToDate
    }
    return this.http.post(this.common.RootUrl + '/CompanyProfile/GetUserCartItemDetails', cartItemParamviewmodel);
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
    return this.http.post(this.common.RootUrl + '/ecommerce/PostUserImage', dorms);
  }

  insertScheduler1(data) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.post(this.common.RootUrl + '/ecommerce/AddSchedulerConfig', data, { headers: reqHeader });
  }

  syncTblNow(data, url) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.post(url, data, { headers: reqHeader });
  }
}
