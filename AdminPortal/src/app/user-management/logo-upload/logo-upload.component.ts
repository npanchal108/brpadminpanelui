import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserprocesstimeService } from '../../shared/userprocesstime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../services/loading.service';
import { MailConfigService } from '../../services/mailbox-config.service.';

@Component({
  selector: 'app-logo-upload',
  templateUrl: './logo-upload.component.html',
  styleUrls: ['./logo-upload.component.css']
})
export class LogoUploadComponent implements OnInit {
  memRefNo: string;
  userType: string;
  configlist:any;
  id:string;
  userroles:string;
  isdesable=false;
  constructor(private MailConfigService:MailConfigService,private userprocesstimeService: UserprocesstimeService,private route: ActivatedRoute,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) { }
SelectedFile:File=null;
  ngOnInit() {
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType'); 
    this.sendMessage('start');
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.userroles = localStorage.getItem('Role');
    if(this.userroles=='Admin'){
      this.isdesable=false;
    }
    else{
      this.isdesable=true;
    }
    this.MailConfigService.getColorConfigList(this.memRefNo).subscribe(Reqs => {
            this.configlist =Reqs;      
            
            if(this.isdesable==true){
              var getnewlist =[];
              getnewlist.push(this.configlist[0]);
              this.configlist =getnewlist;
            }
      this.sendMessage('stop');
   
    });
    
  }
  onEditconf(ConfigId){
    this.router.navigate(['/addcolorconfig',this.id,this.memRefNo, ConfigId]);
  }

  onFileSelected(event){
    this.SelectedFile=<File>event.target.files[0];    
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
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
  back() {
    this.router.navigate(['/userlist', this.userType]);
  }
}
