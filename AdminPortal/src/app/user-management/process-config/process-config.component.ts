import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MailConfig } from '../../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProcessTime } from '../../shared/processtime.model';
import { UserProcessTimes } from '../../shared/userprocesstime.model';
import { Common } from '../../services/common.model';
import { UserprocesstimeService } from '../../shared/userprocesstime.service';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import * as XLSX from "xlsx"
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-process-config',
  templateUrl: './process-config.component.html',
  styleUrls: ['./process-config.component.css']
})
export class ProcessConfigComponent implements OnInit {
  memRefNo: string;
  userProcessTimes: UserProcessTimes;
  schedulerData: any = [];  
  userSchedulerConfig:any=[];  
  userType: string;
  processtimes: any;
  foods: string[] = ['Daily', 'Weekly', 'Monthly'];  
  foods1: string[] = ['Hourly', 'Daily'];
  foods2: string[] = ['5 Mins', '15 Mins', '30 Mins'];
  toppingList: string[] =['it_compl','it_majcls','it_prodline',
  'it_tree_link','it_tree_node','oe_totcodes','salesman',
  'states','sy_codes','sy_company','sy_contact','sy_country',
  'sy_param','sy_paycodes',
  'sy_prof_label','sy_shipvia','sy_terms','it_sales_restriction',
  'vendor','wa_item','warehouse',
  'item','cu_shipto','customer']

  date: any= new Date();
  settings = {
    bigBanner: false,
    timePicker: true,
    format: 'MMM/dd/yyyy hh:mm a',
    defaultOpen: false
  }
  userroles:string;
  isdesable=false;
  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute, private userprocesstimeService: UserprocesstimeService, private toastr: ToastrService, private router: Router, private loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) {
    
  }

  ngOnInit() {
    this.spinner.show();
    this.getProcessTimeList();
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.userroles = localStorage.getItem('Role');
    if(this.userroles=='Admin'){
      this.isdesable=false;
    }
    else{
      this.isdesable=true;
    }
    // this.userprocesstimeService.getUserProcessTime(this.memRefNo).subscribe((data: any) => {
    //   this.userProcessTimes = data;
    //   this.userProcessTimes.MemRefNo = this.memRefNo;
    // });
    this.userprocesstimeService.GetSchedulerConfigByUserID(this.memRefNo).subscribe((data: any) => {
      this.userSchedulerConfig = data;
      console.log('this.userSchedulerConfig',this.userSchedulerConfig);
      for(var i=0;i<this.userSchedulerConfig.length;i++){
        if(this.userSchedulerConfig[i].SchedulerName=='Scheduler1'){
          this.schedulerData.SchedulerTime1=this.userSchedulerConfig[i].SchedulerTime;
        }
        if(this.userSchedulerConfig[i].SchedulerName=='Scheduler2'){
          this.schedulerData.SchedulerTime2=this.userSchedulerConfig[i].SchedulerTime;
          this.schedulerData.Table2=JSON.parse(this.userSchedulerConfig[i].SchedulerTables);
        }
        if(this.userSchedulerConfig[i].SchedulerName=='Scheduler3'){
          this.schedulerData.SchedulerTime3=this.userSchedulerConfig[i].SchedulerTime;
          this.schedulerData.Table3=JSON.parse(this.userSchedulerConfig[i].SchedulerTables);
        }
      }
    });
    
    this.spinner.hide();
  }

  
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  getProcessTimeList() {
    this.userprocesstimeService.getProcessTimeList().subscribe((data: any) => {
      this.processtimes = data;
    });
  }

  SyncNow() {
    this.spinner.show();
    var geturl = location.origin + '/' + this.memRefNo + 'Api/ecommerce/DataMigration';
    console.log(geturl);
    this.userprocesstimeService.SyncNow(geturl).subscribe((data: any) => {
      this.spinner.hide();
      this.toastr.success(data);
    });
    this.spinner.hide();
  }

  AllProductImages(){
    this.spinner.show();
    var geturl = location.origin + '/' + this.memRefNo + 'Api/ecommerce/SetAllProductImages';
    this.userprocesstimeService.setallimages(geturl).subscribe((data: any) => {
      this.spinner.hide();
      this.toastr.success(data);
    });
    this.spinner.hide();
  }

  ProductImages(){
    this.spinner.show();
    var geturl = location.origin + '/' + this.memRefNo + 'Api/ecommerce/SetProductImages';
    this.userprocesstimeService.setallimages(geturl).subscribe((data: any) => {
      this.spinner.hide();
      this.toastr.success(data);
    });
    this.spinner.hide();
  }

  AllTreeImages(){
    this.spinner.show();
    var geturl = location.origin + '/' + this.memRefNo + 'Api/ecommerce/SetAllTreeImages';
    this.userprocesstimeService.setallimages(geturl).subscribe((data: any) => {
      this.spinner.hide();
      this.toastr.success(data);
    }); 
  }
  CompressAllImages(){
    this.spinner.show();
    var geturl = location.origin + '/' + this.memRefNo + 'Api/ecommerce/Compressallimages';
    this.userprocesstimeService.setallimages(geturl).subscribe((data: any) => {
      this.spinner.hide();
      this.toastr.success(data);
    }); 
  }
  TreeImages(){
    this.spinner.show();
    var geturl = location.origin + '/' + this.memRefNo + 'Api/ecommerce/SetTreeImages';
    this.userprocesstimeService.setallimages(geturl).subscribe((data: any) => {
      this.spinner.hide();
      this.toastr.success(data);
    });
  }

  ImageNow() {
    this.spinner.show();
    var geturl = location.origin + '/' + this.memRefNo + 'Api/ecommerce/Setallimages';

    this.userprocesstimeService.setallimages(geturl).subscribe((data: any) => {
      this.spinner.hide();
      this.toastr.success(data);
    });
  }
  AllImageNow() {
    this.spinner.show();
    var geturl = location.origin + '/' + this.memRefNo + 'Api/ecommerce/SetallNewimages';
    this.userprocesstimeService.setallNewimages(geturl).subscribe((data: any) => {
      this.spinner.hide();
      this.toastr.success(data);
    });
    this.spinner.hide();
  }

  OnSubmit(form: NgForm) {
    // this.spinner.show();
    // this.userprocesstimeService.insertUser(form.value).subscribe((data: any) => {
    //   if (data.Status == "Success") {
    //     form.resetForm();
    //     this.toastr.success(data.Message);
    //     this.router.navigate(['/userlist', this.userType]);
    //   }
    //   else {
    //     this.toastr.error(data.Message);
    //   }
    //   this.spinner.hide();
    // });

    console.log()
  }

  addScheduler1Config(form: NgForm) {
    var data = form.value;
    var model = {
      "MemRefNo": this.memRefNo,
      "SchedulerName": "Scheduler1",
      "SchedulerTime": data.SchedulerTime1,
      "SchedulerTables": JSON.stringify(data.Table1)
    };
    this.userprocesstimeService.insertScheduler1(model).subscribe((data: any) => {
      if (data.Status == "Success") {
        this.toastr.success("Scheduler inserted successfully.");
        this.ngOnInit();
      }
      else {
        this.toastr.success("Something went wrong. Please try again later.");
      }
    });
  }

  addScheduler2Config(form: NgForm) {
    var data = form.value;
    var model = {
      "MemRefNo": this.memRefNo,
      "SchedulerName": "Scheduler2",
      "SchedulerTime": data.SchedulerTime2,
      "SchedulerTables": JSON.stringify(data.Table2)
    };
    this.userprocesstimeService.insertScheduler1(model).subscribe((data: any) => {
      if (data.Status == "Success") {
        this.toastr.success("Scheduler inserted successfully.");
        this.ngOnInit();
      }
      else {
        this.toastr.success("Something went wrong. Please try again later.");
      }
    });
  }

  addScheduler3Config(form: NgForm) {
    var data = form.value;
    var model = {
      "MemRefNo": this.memRefNo,
      "SchedulerName": "Scheduler3",
      "SchedulerTime": data.SchedulerTime3,
      "SchedulerTables": JSON.stringify(data.Table3)
    };
    this.userprocesstimeService.insertScheduler1(model).subscribe((data: any) => {
      if (data.Status == "Success") {
        this.toastr.success("Scheduler inserted successfully.");
        this.ngOnInit()
      }
      else {
        this.toastr.success("Something went wrong. Please try again later.");
      }
    });
  }

  back() {
    this.router.navigate(['/userlist', this.userType]);
  }

  syncTblNow() {
    this.spinner.show();
    var geturl = location.origin + '/' + this.memRefNo + 'Api/ecommerce/syncasperconfig';

    var model = {
      "LastSync": this.getdatetime(new Date(this.date)),
      "TableNames": JSON.stringify(this.schedulerData.Table4)
    }

    this.userprocesstimeService.syncTblNow(model, geturl).subscribe((data: any) => {
      this.spinner.hide();
      this.toastr.success(data);
    });
    this.spinner.hide();
  }

  getdatetime(dt) {
    var res = "";
    try{    
    res += this.formatdigits(dt.getMonth() + 1);
    res += "/";
    res += this.formatdigits(dt.getDate());
    res += "/";
    res += this.formatdigits(dt.getFullYear());
    res += " ";
    res += this.formatdigits(dt.getHours() > 12 ? dt.getHours() - 12 : dt.getHours());
    res += ":";
    res += this.formatdigits(dt.getMinutes());
    res += ":";
    res += this.formatdigits(dt.getSeconds());
    var ampm;
    if (dt.getHours() > 11) {
      ampm = " PM";
    }
    else {
      ampm = " AM";
    }
    //res += " " + dt.getHours() > 11 ? " PM" : " AM";
    res += " " + ampm;
  }catch(ex){}
    return res;
  }

  formatdigits(val) {
    val = val.toString();
    return val.length == 1 ? "0" + val : val;
  }

  tabChanged(event: MatTabChangeEvent) {
  }

}
