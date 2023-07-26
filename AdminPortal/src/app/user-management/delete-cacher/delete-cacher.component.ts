import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MailConfig } from '../../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MailConfigService } from '../../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';


@Component({
  selector: 'app-delete-cacher',
  templateUrl: './delete-cacher.component.html',
  styleUrls: ['./delete-cacher.component.css']
})
export class DeleteCacherComponent implements OnInit {
  memRefNo: string;
  userType: string;
  cacherlist:any;
  constructor(private route: ActivatedRoute, private MailConfigService:MailConfigService,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.sendMessage('start');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    try{
    this.MailConfigService.GetAllMemoryCacher(this.memRefNo).subscribe((data: any) => {            
      this.cacherlist = data;
      this.sendMessage('stop');   
    });
  }
  catch(e){
    this.sendMessage('stop');   
  }
  }

  DeleteAllMemoryCacher(){
    this.MailConfigService.AllDeleteMemoryCacher(this.memRefNo).subscribe((data: any) => {            
        var getflag=data;
        if(getflag==true){
            this.toastr.info("All memory Cacher Cleared...")
        }
        else{
          this.toastr.error("Error is occured please try again....")
        }
    });
  }

  Deletecacher(keyname){
    this.MailConfigService.DeleteMemoryCacher(this.memRefNo,keyname).subscribe((data: any) => {            
      this.MailConfigService.GetAllMemoryCacher(this.memRefNo).subscribe((data: any) => {            
        this.cacherlist = data;
      });
    });
  }

  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }

}
