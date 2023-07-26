import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MailConfig } from '../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MailConfigService } from '../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../services/loading.service';


@Component({
  selector: 'app-addconfig',
  templateUrl: './addconfig.component.html',
  styleUrls: ['./addconfig.component.css']
})
export class AddconfigComponent implements OnInit {
  memRefNo: string;
  config:any;
  
  cid: number;
  uid:any;
  constructor(private route: ActivatedRoute, private MailConfigService:MailConfigService,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.sendMessage('start');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.cid = parseInt(this.route.snapshot.paramMap.get('userType'));
    
    this.uid = parseInt(this.route.snapshot.paramMap.get('id'));
    this.MailConfigService.getWebConfig(this.memRefNo,this.cid).subscribe((data: any) => {
      this.config = data;
      this.sendMessage('stop');
   
    });
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  OnSubmit(form: NgForm) {
    
    this.sendMessage('start');
    this.MailConfigService.UpdateWebConfig(this.memRefNo,this.config.ConfigId,form.value.ConfigKey,form.value.ConfigValue).subscribe((data: any) => {
      if (data == true || data == "true") {
        form.resetForm();
        this.toastr.success("Sucessfully Updated");
        //this.router.navigate(['/userlist', 'Client']);
        localStorage.setItem('TabIndex', '4');
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
    localStorage.setItem('TabIndex', '4');
    this.router.navigate(['/manageuser',this.uid ,this.memRefNo, 'Client']);
  }

}
