import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MailConfig } from '../../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailConfigService } from '../../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-mailtemplatelist',
  templateUrl: './mailtemplatelist.component.html',
  styleUrls: ['./mailtemplatelist.component.css']
})
export class MailtemplatelistComponent implements OnInit {
  memRefNo: string;
  mailconfiglist:any;
  userType: string;
  id:string;
  filteredMailConfigList: any[] = [];
  searchText: string = '';
  page: number = 1;
  totalPage: number;
  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute, private MailConfigService:MailConfigService,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.spinner.show();
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');    
    this.MailConfigService.getMailtemplateList(this.memRefNo).subscribe((data: any) => {
      this.mailconfiglist = data;
      this.filteredMailConfigList = this.mailconfiglist;
      this.spinner.hide();
    });
  }
  onEditconf(ConfigId){
    this.router.navigate(['/addmailtemplate',this.id,this.memRefNo,ConfigId]);
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  applyFilter() {
    this.filteredMailConfigList = this.mailconfiglist.filter(item => {
      return Object.values(item).some((value: any) =>
        value && value.toString().toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
    this.page = 1;
  }
  pageChanged(event: any): void {
    this.page = event;
  }
}
