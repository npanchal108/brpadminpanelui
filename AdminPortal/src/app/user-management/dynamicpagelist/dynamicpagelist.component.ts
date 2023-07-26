import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MailConfig } from '../../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MailConfigService } from '../../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';


@Component({
  selector: 'app-dynamicpagelist',
  templateUrl: './dynamicpagelist.component.html',
  styleUrls: ['./dynamicpagelist.component.css']
})
export class dynamicpagelistComponent implements OnInit {
  memRefNo: string;
  mailconfiglist:any;
  userType: string;
  id:string;
   
  constructor(private dialog: MatDialog,private route: ActivatedRoute, private MailConfigService:MailConfigService,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.sendMessage('start');
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');    
    this.MailConfigService.Getdynamicpagelist(this.memRefNo).subscribe((data: any) => {
      this.mailconfiglist = data;
      this.sendMessage('stop');   
    });
  }
  openDialog(PageID): void {
    let dialogRef = this.dialog.open(Deletedynamicpagedialog, {
      width: '400px',
      height: '400px',
      data: { memRefNo: this.memRefNo,PageID:PageID }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
 
  onEditconf(ConfigId){
    this.router.navigate(['/adddynamicpage',this.id,this.memRefNo,ConfigId]);
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
}


@Component({
  selector: 'Deletedynamicpagedialog',
  templateUrl: 'Deletedynamicpagedialog.html',
})
export class Deletedynamicpagedialog {

  constructor(
    private MailConfigService:MailConfigService,
    private toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<Deletedynamicpagedialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private loadingService: LoadingService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
 
  onYesClick(memRefNo,PageID): void {
    
    this.MailConfigService.Deletedynamicpage(memRefNo,PageID).subscribe(res => {
      if (res) {
        this.toastr.success("Record deleted successfully");
      }
      else {
        this.toastr.error("Something went wrong. Please try again.");
      }
    
    });
    this.dialogRef.close();
  }
}