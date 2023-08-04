import { Component, OnInit, ChangeDetectorRef, Inject, ViewChild } from '@angular/core';
import { MailConfig } from '../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MailConfigService } from '../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class productlistComponent implements OnInit {
  memRefNo: string;
  productlist: any = [];
  userType: string;
  id: string;
  page = 1;
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private MailConfigService: MailConfigService, private toastr: ToastrService, private router: Router, private loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.sendMessage('start');
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.MailConfigService.Getproductlist(this.memRefNo).subscribe((data: any) => {
      this.productlist = data;
      this.sendMessage('stop');
    });
  }
  
  onEditconf(ConfigId) {
    this.router.navigate(['/adddynamicpage', this.id, this.memRefNo, ConfigId]);
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
}
