import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MailConfig } from '../../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MailConfigService } from '../../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';


@Component({
  selector: 'app-userconfiglist',
  templateUrl: './userconfiglist.component.html',
  styleUrls: ['./userconfiglist.component.css']
})
export class UserconfiglistComponent implements OnInit {
  memRefNo: string;
  configlist:any;
  userType: string;
  id:string;
  constructor(private route: ActivatedRoute, private MailConfigService:MailConfigService,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.sendMessage('start');
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    
    this.MailConfigService.getConfigList(this.memRefNo).subscribe((data: any) => {
      this.configlist = data;
      this.sendMessage('stop');
   
    });
  }

  onEditconf(ConfigId){
    this.router.navigate(['/addconfig',this.id,this.memRefNo, ConfigId]);
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }

}
