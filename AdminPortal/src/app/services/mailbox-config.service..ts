import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MailConfig } from '../model/mail-config.model';
import { Common } from './common.model';


@Injectable()
export class MailConfigService {

  common: Common;

  constructor(private http: HttpClient) {
    this.common = new Common();
  }

  addMailConfig(mail: MailConfig, memRefNo: string) {
    const body: MailConfig = {
      UserID: 0,
      MailBoxName: memRefNo,
      SMTPServer: mail.SMTPServer,
      SMTPPort: mail.SMTPPort,
      UserName: mail.UserName,
      Password: mail.Password,
      IsSSL: mail.IsSSL,
      MailFrom: mail.MailFrom,
      ReplyTo: mail.ReplyTo,
      IsActive: true,
      memRefNo: memRefNo,
      DisplayName: mail.DisplayName,
      Company: mail.Company
    }
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.post(this.common.RootUrl + '/UserMailBox/InsertUserMailBox', body, { headers: reqHeader });
  }

  getMailConfig(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/UserMailBox/GetUserMailBoxDataByUserID?memRefNo=' + memRefNo, { headers: reqHeader });
  }

  GetAllMemoryCacher(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.userurl + memRefNo + 'Api/ecommerce/GetAllMemoryCacher1', { headers: reqHeader });
  }
  DeleteMemoryCacher(memRefNo: string, keyName: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.userurl + memRefNo + 'Api/ecommerce/DeleteMemoryCacher?keyName=' + keyName, { headers: reqHeader });
  }
  AllDeleteMemoryCacher(memRefNo: string) {
    return this.http.get(this.common.userurl + memRefNo + 'Api/ecommerce/DeleteAllMemoryCacher');
  }

  getWebConfig(memRefNo: string, id: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetConfigByID?memRefNo=' + memRefNo + '&configid=' + id, { headers: reqHeader });
  }
  Getsafiltersort(memRefNo: string, id: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/Getsafiltersort?memRefNo=' + memRefNo + '&configid=' + id, { headers: reqHeader });
  }
  getColorConfig(memRefNo: string, id: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetColorConfigByID?memRefNo=' + memRefNo + '&configid=' + id, { headers: reqHeader });
  }
  getMailTemplate(memRefNo: string, id: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetMailtemplateByID?memRefNo=' + memRefNo + '&configid=' + id, { headers: reqHeader });
  }
  GetdynamicpageByID(memRefNo: string, id: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetdynamicpageByID?memRefNo=' + memRefNo + '&pageid=' + id, { headers: reqHeader });
  }
  Deletedynamicpage(memRefNo: string, id: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/Deletedynamicpage?memRefNo=' + memRefNo + '&configid=' + id, { headers: reqHeader });
  }
  Getdynamicpagelist(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/Getdynamicpagelist?UserMemRefNo=' + memRefNo , { headers: reqHeader });
  }
  Getproductlist(memRefNo: string, pageNo: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/Getproductlist?UserMemRefNo=' + memRefNo + '&pageno=' + pageNo, { headers: reqHeader });
  }
  GetFilteredproductlist(memRefNo: string, filterQuery:string ,pageNo: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetFilteredproductlist?UserMemRefNo=' + memRefNo + '&filterQuery=' + filterQuery +  '&pageno=' + pageNo, { headers: reqHeader });
  }
  GetproductDocBYId(memRefNo: string,item: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetItemDocByID?memRefNo=' + memRefNo + '&item=' +  item , { headers: reqHeader });
  }
  GetItemPriceByItem(memRefNo: string,item: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetItemPriceByItem?memRefNo=' + memRefNo + '&item=' +  item , { headers: reqHeader });
  }
  DeleteItemDocByID(memRefNo: string, itemDocId: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/DeleteItemDocByID?memRefNo=' + memRefNo + '&itemDocId=' + itemDocId, { headers: reqHeader });
  }
  UpdateImageDocument(itemDocModel) {
    return this.http.post(this.common.RootUrl + '/CompanyProfile/UpdateItemDocument',itemDocModel);
  }
  UpdateItemPrice(memRefNo: string, item: string, price: number, ItemIsActive : boolean) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/UpdateItemPrice?memRefNo=' + memRefNo + '&item=' + item + '&price=' + price + '&isItemActive=' + ItemIsActive , { headers: reqHeader });
  }
  UpdateItemPriceBulk(itemsPriceListModel) {
    return this.http.post(this.common.RootUrl + '/CompanyProfile/UpdateItemPriceList',itemsPriceListModel);
  }
  UpdateItemDocumentList(itemsDocumentListModel) {
     return this.http.post(this.common.RootUrl + '/CompanyProfile/UpdateItemDocumentList',itemsDocumentListModel);
   }
  Updatedynamicpage(pagemodels) {
    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    //return this.http.post(this.common.RootUrl + '/CompanyProfile/Updatedynamicpage',pagemodels, { headers: reqHeader });
    return this.http.post(this.common.RootUrl + '/CompanyProfile/Updatedynamicpage',pagemodels);
  }

  UpdateWebConfig(memRefNo: string, configid: number, configkey: string, configvalue: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/UpdateWebConfigs?memRefNo=' + memRefNo + '&configid=' + configid + '&configkey=' + configkey + '&configvalue=' + configvalue, { headers: reqHeader });
  }
  Updatesafilterorder(memRefNo: string, configid: number, configkey: string, configvalue: number,sorder:number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/Updatesafilterorder?memRefNo=' + memRefNo + '&configid=' + configid + '&configkey=' + configkey + '&configvalue=' + configvalue + '&sorder=' + sorder, { headers: reqHeader });
  }
  UpdateColorConfig(memRefNo: string, configid: number, configkey: string, configvalue: string, OldValue: string) {
    var ColorConfigView = {
      "memRefNo": memRefNo,
      "configid": configid,
      "configkey": configkey,
      "configvalue": configvalue,
      "OldValue": OldValue,
    }
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.post(this.common.RootUrl + '/CompanyProfile/UpdateColorConfigs', ColorConfigView, { headers: reqHeader });
  }
  UpdateMailTemplate(model) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.post(this.common.RootUrl + '/CompanyProfile/UpdateMailTemplate', model, { headers: reqHeader });
  }

  getConfigList(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetConfigsList?UserMemRefNo=' + memRefNo, { headers: reqHeader });
  }
  GetsafiltersortList(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetsafiltersortList?UserMemRefNo=' + memRefNo, { headers: reqHeader });
  }
  getColorConfigList(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/ColorGetConfigsList?UserMemRefNo=' + memRefNo, { headers: reqHeader });
  }
  getMailtemplateList(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetMailTemplateList?UserMemRefNo=' + memRefNo, { headers: reqHeader });
  }

  GetHeaderlinklist(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetHeaderlinklist?memRefNo=' + memRefNo, { headers: reqHeader });
  }
  GetHeaderlinkByID(memRefNo: string, linkid: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/GetHeaderlinkByID?memRefNo=' + memRefNo + '&linkid=' + linkid, { headers: reqHeader });
  }
  DeleteHeaderlinkByID(memRefNo: string, linkid: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/DeleteHeaderlinkByID?memRefNo=' + memRefNo + '&linkid=' + linkid, { headers: reqHeader });
  }
  DeletesafiltersortByID(memRefNo: string, sortid: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/CompanyProfile/DeletesafiltersortByID?memRefNo=' + memRefNo + '&sortid=' + sortid, { headers: reqHeader });
  }
  UpdateHeaderlinkByID(linkid: number, linkname: string, linkurl: string, seq: number, popover: boolean, memRefNo: string,types:string,parentseq:number,ismenu:boolean) {
    var headerlinkView = {
      linkid: linkid,
      linkname: linkname,
      linkurl: linkurl,
      seq: seq,
      popover: popover,
      memRefNo: memRefNo,
      types:types,
      parentseq : parentseq,
      ismenu:ismenu == true ? 1 : null
    }
    console.log('Payload headerlinkView',headerlinkView);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.post(this.common.RootUrl + '/CompanyProfile/UpdateHeaderlinkByID', headerlinkView, { headers: reqHeader });
  }



  deleteMailConfig(memRefNo: string, company: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/UserMailBox/DeleteUserMailBox?memRefNo=' + memRefNo + '&company=' + company, { headers: reqHeader });

  }
}
