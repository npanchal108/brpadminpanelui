import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Common } from './common.model';

@Injectable()
export class SeomanagementService {

  common: Common;

  constructor(private http: HttpClient) {
    this.common = new Common();
  }
  GetAllItNodeTreeMetaList(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/SEOManagement/GetAllItNodeTreeMetaList?UserMemRefNo=' + memRefNo , { headers: reqHeader });
  }

  GetAllItemMetaList(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/SEOManagement/GetAllItemMetaList?UserMemRefNo=' + memRefNo , { headers: reqHeader });
  }

  GetAllProdLineMetaList(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/SEOManagement/GetAllProdLineMetaList?UserMemRefNo=' + memRefNo , { headers: reqHeader });
  }

  GetAllMajClsMetaList(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/SEOManagement/GetAllMajClsMetaList?UserMemRefNo=' + memRefNo , { headers: reqHeader });
  }

  GetItNodeTreeMetaList(memRefNo: string, filterQuery:string,pageNo: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/SEOManagement/GetItNodeTreeMetaList?UserMemRefNo=' + memRefNo + '&filterQuery=' + filterQuery + '&pageno=' + pageNo, { headers: reqHeader });
  }

  GetItemMetaList(memRefNo: string, filterQuery:string,pageNo: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/SEOManagement/GetItemMetaList?UserMemRefNo=' + memRefNo + '&filterQuery=' + filterQuery + '&pageno=' + pageNo, { headers: reqHeader });
  }

  GetItProdLineMetaList(memRefNo: string, filterQuery:string,pageNo: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/SEOManagement/GetItProdLineMetaList?UserMemRefNo=' + memRefNo + '&filterQuery=' + filterQuery + '&pageno=' + pageNo, { headers: reqHeader });
  }

  GetMajclsMetaList(memRefNo: string, filterQuery:string,pageNo: number) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/SEOManagement/GetMajclsetaList?UserMemRefNo=' + memRefNo + '&filterQuery=' + filterQuery + '&pageno=' + pageNo, { headers: reqHeader });
  }

  UpdateTreeNodeMetaDetails(metaModel) {
    return this.http.post(this.common.RootUrl + '/SEOManagement/UpdateTreeNodeMeta',metaModel);
  }
  UpdateItemMeta(metaModel) {
    return this.http.post(this.common.RootUrl + '/SEOManagement/UpdateItemMeta',metaModel);
  }
  UpdateProdlineMeta(metaModel) {
    return this.http.post(this.common.RootUrl + '/SEOManagement/UpdateProdlineMeta',metaModel);
  }
  UpdateItMajClsMeta(metaModel) {
    return this.http.post(this.common.RootUrl + '/SEOManagement/UpdateItMajClsMeta',metaModel);
  }
  ImportItTreeNodeMetaData(itTreeNodeListModel) {
    return this.http.post(this.common.RootUrl + '/SEOManagement/ImportItTreeNodeMetaData',itTreeNodeListModel);
  }
  ImportItemMetaData(itemListModel) {
    return this.http.post(this.common.RootUrl + '/SEOManagement/ImportItemMetaData',itemListModel);
  }
  ImportProdLineMetaData(ProdLineListModel) {
    return this.http.post(this.common.RootUrl + '/SEOManagement/ImportProdLineMetaData',ProdLineListModel);
  }
  ImportMajClsMetaData(majClsListModel) {
    return this.http.post(this.common.RootUrl + '/SEOManagement/ImportMajClsMetaData',majClsListModel);
  }
}
