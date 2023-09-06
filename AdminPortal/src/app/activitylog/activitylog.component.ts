import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserprocesstimeService } from '../shared/userprocesstime.service';
import { LoadingService } from '../services/loading.service';
import * as XLSX from "xlsx"
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-activitylog',
  templateUrl: './activitylog.component.html',
  styleUrls: ['./activitylog.component.css']
})
export class ActivitylogComponent implements OnInit {

  Activitylog:any=[];
  Activitylogs:any;
  ActivitylogsExport:any=[];
  logtypeslist: string[] = ['Advanced Search', 'Final Order Log', 'Log','Login','Search','Search By Brand','Search By Menu','Temp Order Log'];
  memRefNo:any;
  userType:any;
  userroles:any;
  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute, private userprocesstimeService: UserprocesstimeService, private toastr: ToastrService, private router: Router, private loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.userroles = localStorage.getItem('Role');
    this.clearactivitylog();
  }
  searchactivitylog(){
    this.spinner.show();
    this.Activitylog.memRefNo=this.memRefNo;
    this.userprocesstimeService.GetActivitylogsearch(this.Activitylog).subscribe((data: any) => {
      this.Activitylogs = data;
      if(this.Activitylogs!=undefined && this.Activitylogs!=null && this.Activitylogs.length>0){
        for(var i=0;i<this.Activitylogs.length;i++){
          var getnewiem={
            LogType:this.Activitylogs[i].LogType,
            Description:this.Activitylogs[i].Description,
            SearchKeyword:this.Activitylogs[i].SearchKeyword,
            CustID:this.Activitylogs[i].CustID,
            UserId:this.Activitylogs[i].UserId,
            ClientIP:this.Activitylogs[i].ClientIP,
            LogDate:this.Activitylogs[i].LogDate,
          }
          this.ActivitylogsExport.push(getnewiem);
        } 
      }
      this.spinner.hide();
    });

  }
  exporttoxlsx(){
    if(this.ActivitylogsExport!=undefined && this.ActivitylogsExport!=null && this.ActivitylogsExport.length>0){
    //let element = document.getElementById("excel-table");
    const WS: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.ActivitylogsExport);
    //const WS: XLSX.WorkSheet=XLSX.utils.table_to_book(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,WS,"ActivityLog");
    XLSX.writeFile(wb,"ActivityLog.xlsx");
    }
    else{
      this.toastr.info("There is nothing to export");
    }

  }
  clearactivitylog(){
    this.Activitylog.LogType=null;
    this.Activitylog.SearchKeyword=null;
    this.Activitylog.Description=null;
    this.Activitylog.ActivityLogId=0;
    this.Activitylog.CustID=null;
    this.Activitylog.UserId=null;
    this.Activitylog.ClientIP=null;
    this.Activitylog.FromDate=null;
    this.Activitylog.ToDate=null;
    this.Activitylog.memRefNo=this.memRefNo;
    this.Activitylogs=[];
  }

}
