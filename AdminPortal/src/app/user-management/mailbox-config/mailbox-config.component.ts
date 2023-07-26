import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MailConfig } from '../../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MailConfigService } from '../../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { UserprocesstimeService } from '../../shared/userprocesstime.service';

@Component({
  selector: 'app-mailbox-config',
  templateUrl: './mailbox-config.component.html',
  styleUrls: ['./mailbox-config.component.css']
})
export class MailboxConfigComponent implements OnInit {
  memRefNo: string;
  mail:MailConfig;
  userType: string;
  userroles:string;
  isdesable=false;
  Mailconfiglist:any;
  flag:boolean=true; 
  constructor(private route: ActivatedRoute,private userprocesstimeService: UserprocesstimeService, private MailConfigService:MailConfigService,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) { 
    //setTimeout(() => { changeDetectorRef.detectChanges(); })
  }

  sendtestingmail(){
    this.sendMessage('start');
    var geturl = location.origin + '/' + this.memRefNo + 'Api/DistOneApi/SendTestingEmail?company_sy='+this.mail.Company;
    
    this.userprocesstimeService.SyncNow(geturl).subscribe((data: any) => {
      this.sendMessage('stop');
      this.toastr.success(data);
    });
    this.sendMessage('stop'); 
}
// send the message and get a callback with an error or details of the message that was sent



  ngOnInit() {
    this.sendMessage('start');
    this.flag=true;
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.userroles = localStorage.getItem('Role');
    if(this.userroles=='Admin'){
      this.isdesable=false;
    }
    else{
      this.isdesable=true;
    }
    //this.mail = new MailConfig();
    this.MailConfigService.getMailConfig(this.memRefNo).subscribe((data: any) => {
      this.Mailconfiglist = data;
      this.sendMessage('stop');
   
    });
  }
  oncreatenew(){
    this.mail = new MailConfig();
    this.flag=false;
  }

  onEditconf(getmailbox){
    this.mail = new MailConfig();
    if(getmailbox!=undefined && getmailbox!=null && getmailbox.UserName!=''){
    this.mail =getmailbox;
    }
    this.flag=false;
  }
  sendMessage(message): void {
//    this.loadingService.LoadingMessage(message);
  }
  OnSubmit(form: NgForm) {
    
    this.sendMessage('start');
    this.MailConfigService.addMailConfig(this.mail, this.memRefNo).subscribe((data: any) => {
      this.sendMessage('stop');
      if (data.Status == "Success") {
        form.resetForm();
        this.toastr.success(data.Message);
        this.ngOnInit();
      }
      else {
        this.toastr.error(data.Message);
      }      
    });
  }
  back() {
    this.ngOnInit();
  }
  Delete() {    
    this.sendMessage('start');
    this.MailConfigService.deleteMailConfig(this.memRefNo,this.mail.Company).subscribe((data: any) => {
      this.sendMessage('stop');
      if (data.Status == "Success") {        
        this.toastr.success(data.Message);
        this.ngOnInit();
      }
      else {
        this.toastr.error(data.Message);
      }      
    });
  }
  

  
}
