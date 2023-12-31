import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MailConfig } from '../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MailConfigService } from '../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../services/loading.service';



@Component({
  selector: 'app-addsafiltersort',
  templateUrl: './addsafiltersort.component.html',
  styleUrls: ['./addsafiltersort.component.css']
})
export class addsafiltersortComponent implements OnInit {
    memRefNo: string;
  
  Name:string='';
  stype:number=1;
  sorder:number=999;
  cid: number;
  uid:any;
  constructor(private route: ActivatedRoute, private MailConfigService:MailConfigService,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    //this.sendMessage('start');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.cid = parseInt(this.route.snapshot.paramMap.get('userType'));
    
    this.uid = parseInt(this.route.snapshot.paramMap.get('id'));
    if(this.cid!=undefined && this.cid!=null && this.cid>0){
    this.MailConfigService.Getsafiltersort(this.memRefNo,this.cid).subscribe((data: any) => {
      var getdata = data;
      this.Name=getdata.Name;
      this.stype=getdata.stype;
      this.sorder=getdata.sorder;
//      this.sendMessage('stop');
   
    });
  }
  else{
  //  this.sendMessage('stop');
  }
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  OnSubmit(form: NgForm) {
    
    this.sendMessage('start');
    this.MailConfigService.Updatesafilterorder(this.memRefNo,this.cid,this.Name,this.stype,this.sorder).subscribe((data: any) => {
      if (data == true || data == "true") {
        form.resetForm();
        this.toastr.success("Sucessfully Updated");
        //this.router.navigate(['/userlist', 'Client']);
        localStorage.setItem('TabIndex', '8');
        this.router.navigate(['/manageuser',this.uid ,this.memRefNo, 'Client']);
      }
      else {
        this.toastr.error("Error occured please try again");
      }
      this.sendMessage('stop');
    });
  }
  back() {
    // this.router.navigate(['/userlist', 'Client']);
    localStorage.setItem('TabIndex', '8');
    this.router.navigate(['/manageuser',this.uid ,this.memRefNo, 'Client']);
  }

}
