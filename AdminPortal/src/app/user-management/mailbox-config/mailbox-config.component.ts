import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MailConfig } from '../../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailConfigService } from '../../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { UserprocesstimeService } from '../../shared/userprocesstime.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-mailbox-config',
  templateUrl: './mailbox-config.component.html',
  styleUrls: ['./mailbox-config.component.css']
})
export class MailboxConfigComponent implements OnInit {
  memRefNo: string;
  mail: MailConfig;
  userType: string;
  userroles: string;
  isdesable = false;
  Mailconfiglist: any;
  flag: boolean = true;
  filteredMailConfigList: any[] = [];
  searchText: string = '';
  
  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute, private userprocesstimeService: UserprocesstimeService, private MailConfigService: MailConfigService, private toastr: ToastrService, private router: Router, private loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) {

  }

  sendtestingmail() {
    var geturl = location.origin + '/' + this.memRefNo + 'Api/ecommerce/SendTestingEmail?company_sy=' + this.mail.Company;

    this.userprocesstimeService.SyncNow(geturl).subscribe((data: any) => {
      this.toastr.success(data);
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.flag = true;
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.userroles = localStorage.getItem('Role');
    if (this.userroles == 'Admin') {
      this.isdesable = false;
    }
    else {
      this.isdesable = true;
    }
    
    this.MailConfigService.getMailConfig(this.memRefNo).subscribe((data: any) => {
      this.spinner.hide();
      this.Mailconfiglist = data;
      this.filteredMailConfigList = this.Mailconfiglist;
    });
  }
  applyFilter() {
    this.filteredMailConfigList = this.Mailconfiglist.filter(item => {
      return Object.values(item).some((value: any) =>
        value && value.toString().toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
  }
  oncreatenew() {
    this.mail = new MailConfig();
    this.flag = false;
  }

  onEditconf(getmailbox) {
    this.mail = new MailConfig();
    if (getmailbox != undefined && getmailbox != null && getmailbox.UserName != '') {
      this.mail = getmailbox;
    }
    this.flag = false;
  }

  OnSubmit(form: NgForm) {
    this.MailConfigService.addMailConfig(this.mail, this.memRefNo).subscribe((data: any) => {
      if (data.Status == "Success") {
        form.resetForm();
        this.toastr.success(data.Message);
        this.ngOnInit();
      }
      else {
        this.toastr.error(data.Message);
      }
    });
  }
  back() {
    this.ngOnInit();
  }
  Delete() {
    this.MailConfigService.deleteMailConfig(this.memRefNo, this.mail.Company).subscribe((data: any) => {
      if (data.Status == "Success") {
        this.toastr.success(data.Message);
        this.ngOnInit();
      }
      else {
        this.toastr.error(data.Message);
      }
    });
  }
}
