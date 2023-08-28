import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MailConfig } from '../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.cid = parseInt(this.route.snapshot.paramMap.get('userType'));
    this.uid = parseInt(this.route.snapshot.paramMap.get('id'));
    this.MailConfigService.getColorConfig(this.memRefNo,this.cid).subscribe((data: any) => {
      this.config = data;
      this.OldValue=data.ColorValue;
    });
  }
  OnSubmit(form: NgForm) {
    this.MailConfigService.UpdateColorConfig(this.memRefNo,this.config.ColorConfigID,this.config.ColorConfigKey,this.config.ColorValue,this.OldValue).subscribe((data: any) => {
      if (data == true || data == "true") {
        form.resetForm();
        this.toastr.success("Sucessfully Updated");
        this.router.navigate(['/webdesign', this.uid,this.memRefNo,this.cid]);
      }
      else {
        this.toastr.error("Error occured please try again");
      }
    });
  }
  back() {
    this.router.navigate(['/webdesign', this.uid,this.memRefNo,this.cid]);
  }
  onFileSelected(event){
    this.SelectedFile=<File>event.target.files[0];    
  }
  OnUpload(){
    const fd = new FormData();
    fd.append('image',this.SelectedFile,this.SelectedFile.name);
     fd.append('memRefNo',this.memRefNo);        
    this.userprocesstimeService.LogoUploadUser(fd).subscribe((data: any) => {      
      this.toastr.success(data.Message);      
    });
  }

}
