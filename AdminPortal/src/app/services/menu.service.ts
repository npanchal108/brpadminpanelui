import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from '../model/menu.model';
import { Common } from './common.model';


@Injectable()
export class MenuService {
  
  common:Common;
  
  constructor(private http: HttpClient) { 
    this.common = new Common();
  }

  
  getMenu(memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/UserMenu/GetAllUserMenu?UserMemRefNo=' + memRefNo, { headers: reqHeader });
  }

  addMenu(menu: Menu, memRefNo: string) {
    const body: Menu = {
      MenuID: menu.MenuID,
      Title: menu.Title,
      Linkurl: menu.Linkurl,
      Rank: menu.Rank,
      Active: menu.Active,
      ParentID: menu.ParentID,
      ButtenText: '',
      UserMemRefNo: memRefNo
    }
    console.log(body);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.post(this.common.RootUrl + '/UserMenu/InsertUserMenu', body, { headers: reqHeader });
  }

  getMenuByID(menuId: number, memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/UserMenu/GetUserMenuDataByID?UserMenuID=' + menuId + '&UserMemRefNo=' + memRefNo, { headers: reqHeader });
  }

  deleteMenu(menuId: number, memRefNo: string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'AuthenticationToken': localStorage.getItem('AuthenticationToken'), 'MemberReferenceNo': localStorage.getItem('MemberReferenceNo') });
    return this.http.get(this.common.RootUrl + '/UserMenu/DeleteUserMenu?UserMenuID=' + menuId + '&UserMemRefNo=' + memRefNo, { headers: reqHeader });

  }
}
