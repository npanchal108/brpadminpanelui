import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyProfile } from '../model/company-profile.model';
import { Common } from './common.model';


@Injectable()
export class CompanyProfileService {

  common:Common;

  constructor(private http: HttpClient) { 
    this.common = new Common();
  }

  

  addCompanyProfile(companyProfile: CompanyProfile, memRefNo: string) {
    const body: CompanyProfile = {
      UserMemRefNo:memRefNo,
      CompanyID: companyProfile.CompanyID,
      CompanyName: companyProfile.CompanyName,
      CompanyAddress: companyProfile.CompanyAddress,
      CompanyInfo: companyProfile.CompanyInfo,
      CompanyVision: companyProfile.CompanyVision,
      CompanyMission: companyProfile.CompanyMission,
      CompanyEmail: companyProfile.CompanyEmail,
      CompanyContact1: companyProfile.CompanyContact1,
      CompanyContact2:companyProfile.CompanyContact2,
      CompanyMobile1:companyProfile.CompanyMobile1,
      CompanyMobile2:companyProfile.CompanyMobile2,
      ButtenText:''
    }
    console.log(body);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.post(this.common.RootUrl + '/CompanyProfile/InsertCompanyProfile', body, { headers: reqHeader });
  }
  
  getCompanyProfileList(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetAllCompanyProfile?UserMemRefNo=' + memRefNo, { headers: reqHeader });
  }
  
  getCompanyProfileByID(companyId: number, memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetCompanyProfileDataByID?CompanyProfileID=' + companyId + '&UserMemRefNo=' + memRefNo, { headers: reqHeader });
  }

  GetManufracturerItemDocList(memRefNo: string, pageNo: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetManufracturerItemDocList?memRefNo=' + memRefNo + '&pageno=' + pageNo, { headers: reqHeader });
  }

  GetFilteredManufracturerItemDocList(memRefNo: string, filterQuery:string, pageNo: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetFilteredManufracturerItemDocList?memRefNo=' + memRefNo + '&filterQuery=' + filterQuery + '&pageno=' + pageNo, { headers: reqHeader });
  }
  
  //Add delete call here
  deleteCompanyProfile(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/DeleteCompanyProfile?UserMemRefNo=' + memRefNo, { headers: reqHeader });

  }

  //Add API call here
  getCompanyProfileByMemRefNo(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetCompanyProfileDataByID?UserMemRefNo=' + memRefNo, { headers: reqHeader });
  }
}
