import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MailConfig } from '../../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MailConfigService } from '../../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';


@Component({
  selector: 'app-safiltersortlist',
  templateUrl: './safiltersortlist.component.html',
  styleUrls: ['./safiltersortlist.component.css']
})
export class safiltersortlistComponent implements OnInit {
  memRefNo: string;
  configlist:any;
  userType: string;
  id:string;
  constructor(private dialog: MatDialog,private route: ActivatedRoute, private MailConfigService:MailConfigService,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.sendMessage('start');
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    
    this.MailConfigService.GetsafiltersortList(this.memRefNo).subscribe((data: any) => {
      this.configlist = data;
      this.sendMessage('stop');
   
    });
  }

  onEditconf(ConfigId){
    this.router.navigate(['/addsafiltersort',this.id,this.memRefNo, ConfigId]);
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }

  openDialog(linkid): void {
    let dialogRef = this.dialog.open(Deletesafiltersort, {
      width: '400px',
      height: '400px',
      data: { memRefNo: this.memRefNo,linkid:linkid }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
@Component({
  selector: 'Deletesafiltersort',
  templateUrl: 'Deletesafiltersort.html',
})
export class Deletesafiltersort {

  constructor(
    private MailConfigService:MailConfigService,
    private toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<Deletesafiltersort>,
    @Inject(MAT_DIALOG_DATA) public data: any, private loadingService: LoadingService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  onYesClick(memRefNo,linkid): void {
    
    this.MailConfigService.DeletesafiltersortByID(memRefNo,linkid).subscribe(res => {
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