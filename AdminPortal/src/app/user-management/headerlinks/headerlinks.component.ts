import { Component, OnInit, ChangeDetectorRef,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailConfigService } from '../../services/mailbox-config.service.';
import { LoadingService } from '../../services/loading.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-headerlinks',
  templateUrl: './headerlinks.component.html',
  styleUrls: ['./headerlinks.component.css']
})
export class HeaderlinksComponent implements OnInit {
  memRefNo: string;
  headerlinklist:any;
  linkid:any;
  linkname:any;
  linkurl:any;
  seq:any;
  popover:any;
  types:any='both';
  userType: string;
  id:string;
  showtype:any;
  parentseq:any;
  ismenu:any;
  filteredHeaderlinkList: any[] = [];
  searchText: string = '';
  constructor(private dialog: MatDialog,private route: ActivatedRoute, private MailConfigService:MailConfigService,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.sendMessage('start');
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.sendMessage('stop');
  this.getheaderlinks();  
  }
  OnAddheaderlink(){
    this.showtype=2;
    this.linkname=null;
    this.linkurl=null;
    this.seq=null;
    this.popover=false;
    this.types='both';
    this.parentseq=null;
    this.ismenu=null;
  }

  getheaderlinks(){
    this.showtype=1;
    this.sendMessage('start');
    this.MailConfigService.GetHeaderlinklist(this.memRefNo).subscribe((data: any) => {
      this.headerlinklist = data;
      this.filteredHeaderlinkList = this.headerlinklist;
      this.sendMessage('stop');   
    });
  }
  applyFilter() {
    this.filteredHeaderlinkList = this.headerlinklist.filter(item => {
      return Object.values(item).some((value: any) =>
        value && value.toString().toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
   
  }
  onEditLink(linkid){
    this.showtype=2;
    this.GetHeaderlinkByID(linkid);
  }
  openDialog(linkid): void {
    let dialogRef = this.dialog.open(Deleteheaderlinkdialog, {
      width: '400px',
      data: { memRefNo: this.memRefNo,linkid:linkid }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getheaderlinks();
    });
  }

  GetHeaderlinkByID(linkid){
    // this.sendMessage('start');
    this.MailConfigService.GetHeaderlinkByID(this.memRefNo,linkid).subscribe((data: any) => {
      this.linkid = data.linkid;
      this.linkname = data.linkname;
      this.linkurl = data.linkurl;
      this.seq = data.seq;
      this.popover = data.popover;
      this.types = data.types;
      this.parentseq = data.parent_seq;
      this.ismenu = data.ismenu == null ? false : true;
      // this.sendMessage('stop');   
    });
  }
  DeleteHeaderlinkByID(linkid){    
  this.sendMessage('start');
    this.MailConfigService.DeleteHeaderlinkByID(this.memRefNo,linkid).subscribe((data: any) => {      
      this.sendMessage('stop');   
    });
  }
  UpdateHeaderlinkByID(){
    if(this.linkname==undefined || this.linkname==null || this.linkname==''){
      this.toastr.error("Insert Link Name");
    }
    else if(this.linkurl==undefined || this.linkurl==null || this.linkurl==''){
      this.toastr.error("Insert Link URL");
    }
    else if(this.seq==undefined || this.seq==null || this.seq==''){
      this.toastr.error("Insert Link sequence");
    }
    else{
    this.sendMessage('start');
    this.MailConfigService.UpdateHeaderlinkByID(this.linkid,this.linkname,this.linkurl,this.seq,this.popover ,this.memRefNo,this.types,this.parentseq,this.ismenu).subscribe((data: any) => {      
      this.toastr.success("Data Updated Successfully");
      this.sendMessage('stop');   
      this.getheaderlinks();
    });
  }
  }

  sendMessage(message): void {
  //  this.loadingService.LoadingMessage(message);
  }

}

@Component({
  selector: 'Deleteheaderlinkdialog',
  templateUrl: 'Deleteheaderlinkdialog.html',
})
export class Deleteheaderlinkdialog {

  constructor(
    private MailConfigService:MailConfigService,
    private toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<Deleteheaderlinkdialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private loadingService: LoadingService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  onYesClick(memRefNo,linkid): void {
    
    this.MailConfigService.DeleteHeaderlinkByID(memRefNo,linkid).subscribe(res => {
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