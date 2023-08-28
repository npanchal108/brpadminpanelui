import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  id: number;
  userType: string;
  memRefNo:string;

  isAdmin:boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }
tabindex:any;
  ngOnInit() {
    localStorage.getItem("Role") == "Admin" ? this.isAdmin = true : this.isAdmin = false;
    this.tabindex = localStorage.getItem("TabIndex");
    if(this.tabindex==null || this.tabindex==undefined){
      this.tabindex='0';
    }
   
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.userType = this.route.snapshot.paramMap.get('userType');
  }

}
