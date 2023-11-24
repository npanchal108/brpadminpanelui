import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserprocesstimeService } from '../shared/userprocesstime.service';
import { LoadingService } from '../services/loading.service';
import * as XLSX from "xlsx"
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-usercartreport',
  templateUrl: './usercartreport.component.html',
  styleUrls: ['./usercartreport.component.css']
})
export class UsercartreportComponent implements OnInit {
  cartItems:any;
  cartItemParam:any=[];
  cartExport:any=[];
  memRefNo:any;
  userType:any;
  userroles:any;
  sortedColumn:string = '';
  ascending = true;

  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute, private userprocesstimeService: UserprocesstimeService, private toastr: ToastrService, private router: Router, private loadingService: LoadingService) { }

  ngOnInit() {
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.userroles = localStorage.getItem('Role');
    this.clearSearch();
  }

  toggleSort(column: string) {
    if (this.sortedColumn === column) {
      this.ascending = !this.ascending;
    } else {
      this.sortedColumn = column;
      this.ascending = true;
    }
  }

  ExportToExcell(){

  }

  clearSearch(){

  }

  ApplyFilter(){
    this.spinner.show();
    this.cartItemParam.memRefNo=this.memRefNo;
    this.userprocesstimeService.GetUserCartItemDetails(this.cartItemParam).subscribe((data: any) => {
      console.log('data',data);
      this.cartItems = data;
      console.log('this.cartItems',this.cartItems);
      if(this.cartItems!=undefined && this.cartItems!=null && this.cartItems.length>0){
        for(var i=0;i<this.cartItems.length;i++){
          var getnewiem={
            Customer:this.cartItems[i].Customer,
            UserName:this.cartItems[i].UserName,
            FirstName:this.cartItems[i].FirstName,
            LastName:this.cartItems[i].LastName,
            Item:this.cartItems[i].Item,
            Quantity:this.cartItems[i].Quantity,
            Price:this.cartItems[i].Price,
            DayDate:this.cartItems[i].DayDate
          }
          this.cartExport.push(getnewiem);
        } 
      }
      this.spinner.hide();
    });
  }
}
