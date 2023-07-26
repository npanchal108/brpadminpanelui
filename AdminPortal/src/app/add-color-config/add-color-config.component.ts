import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MailConfig } from '../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MailConfigService } from '../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../services/loading.service';
import { UserprocesstimeService } from '../shared/userprocesstime.service';


@Component({
  selector: 'app-add-color-config',
  templateUrl: './add-color-config.component.html',
  styleUrls: ['./add-color-config.component.css']
})
export class AddColorConfigComponent implements OnInit {
  memRefNo: string;
  config:any;
  
  cid: number;
  uid:any;
  OldValue:any;
  constructor(private route: ActivatedRoute,private userprocesstimeService: UserprocesstimeService, private MailConfigService:MailConfigService,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) { }
  SelectedFile:File=null;
  ngOnInit() {
    this.sendMessage('start');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.cid = parseInt(this.route.snapshot.paramMap.get('userType'));
    this.uid = parseInt(this.route.snapshot.paramMap.get('id'));
    this.MailConfigService.getColorConfig(this.memRefNo,this.cid).subscribe((data: any) => {
      this.config = data;
      this.OldValue=data.ColorValue;
      
      this.sendMessage('stop');   
    });
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  OnSubmit(form: NgForm) {
    
    this.sendMessage('start');
    console.log(this.config);
    this.MailConfigService.UpdateColorConfig(this.memRefNo,this.config.ColorConfigID,this.config.ColorConfigKey,this.config.ColorValue,this.OldValue).subscribe((data: any) => {
      if (data == true || data == "true") {
        form.resetForm();
        this.toastr.success("Sucessfully Updated");
        localStorage.setItem('TabIndex', '3');
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
    localStorage.setItem('TabIndex', '3');
    this.router.navigate(['/manageuser',this.uid ,this.memRefNo, 'Client']);
  }
  onFileSelected(event){
    this.SelectedFile=<File>event.target.files[0];    
  }
  OnUpload(){
    this.sendMessage('start');
    const fd = new FormData();
    fd.append('image',this.SelectedFile,this.SelectedFile.name);
     fd.append('memRefNo',this.memRefNo);        
    this.userprocesstimeService.LogoUploadUser(fd).subscribe((data: any) => {      
      this.sendMessage('stop');
      this.toastr.success(data.Message);      
    });
    this.sendMessage('stop');
  }

}
