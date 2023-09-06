import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MailConfig } from '../../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailConfigService } from '../../services/mailbox-config.service.';
import { LoadingService } from '../../services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-delete-cacher',
  templateUrl: './delete-cacher.component.html',
  styleUrls: ['./delete-cacher.component.css']
})
export class DeleteCacherComponent implements OnInit {
  memRefNo: string;
  userType: string;
  cacherlist: any;
  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute, private MailConfigService: MailConfigService, private toastr: ToastrService, private router: Router, private loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.spinner.show();
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    try {
      this.MailConfigService.GetAllMemoryCacher(this.memRefNo).subscribe((data: any) => {
        this.cacherlist = data;
        this.spinner.hide();
      });
    }
    catch (e) {
      this.spinner.hide();
    }
  }

  DeleteAllMemoryCacher() {
    this.spinner.show();
    this.MailConfigService.AllDeleteMemoryCacher(this.memRefNo).subscribe((data: any) => {
      this.spinner.hide();
      var getflag = data;
      if (getflag == true) {
        this.toastr.info("All memory Cacher Cleared...")
      }
      else {
        this.toastr.error("Error is occured please try again....")
      }
    });
  }

  Deletecacher(keyname) {
    this.spinner.show();
    this.MailConfigService.DeleteMemoryCacher(this.memRefNo, keyname).subscribe((data: any) => {
      this.MailConfigService.GetAllMemoryCacher(this.memRefNo).subscribe((data: any) => {
        this.spinner.hide();
        this.cacherlist = data;
      });
    });
  }

  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }

}
