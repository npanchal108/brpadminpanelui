import { Component, OnInit, ChangeDetectorRef, Inject, ViewChild } from '@angular/core';
import { MailConfig } from '../../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MailConfigService } from '../../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';

interface PageType {
  key: string;
  value: string;
}


@Component({
  selector: 'app-dynamicpagelist',
  templateUrl: './dynamicpagelist.component.html',
  styleUrls: ['./dynamicpagelist.component.css']
})
export class dynamicpagelistComponent implements OnInit {
  memRefNo: string;
  mailconfiglist: any;
  userType: string;
  id: string;
  page: number = 1;
  totalPage: number;
  blogPageList: any[];
  infoPageList: any[];
  servicesPageList: any[];
  ourlinesPageList: any[];
  companyDomainValue: string;
  searchPageNameQuery: string = '';
  searchPageTypeQuery: string = '';
  @ViewChild('tabGroup') tabGroup: any;
  selectedTabName: string;

  pageType: PageType[] = [
    { key: 'blogs', value: 'blogs' },
    { key: 'info', value: 'info' },
    { key: 'our-lines', value: 'our-lines' },
    { key: 'services', value: 'services' }
  ];

  constructor(private spinner: NgxSpinnerService, private dialog: MatDialog, private route: ActivatedRoute, private MailConfigService: MailConfigService, private toastr: ToastrService, private router: Router, private loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');

    this.MailConfigService.getConfigList(this.memRefNo).subscribe((data: any) => {
      const companyDomainConfig = data.filter(i => i.ConfigKey == 'CompanyDomain');
      this.companyDomainValue = companyDomainConfig.length > 0 ? companyDomainConfig[0].ConfigValue : '';
    });
    this.getDynamicPageData();
  }
  getDynamicPageData() {
    this.spinner.show();
    this.MailConfigService.Getdynamicpagelist(this.memRefNo).subscribe((data: any) => {
      this.mailconfiglist = data;
      this.getDynamicPageList();
      this.applyFilter(this.selectedTabName.toLowerCase());
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);
    });
  }
  getTabIndexByName(tabName: string): number {
    const tabs = this.tabGroup._tabs; // Get the tab labels
    for (let i = 0; i <= tabs.length; i++) {
      if (tabs._results[i].textLabel === tabName) {
        return i;
      }
    }
    return -1;
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      this.searchPageNameQuery = params['searchPageNameQuery'];
      this.selectedTabName = params['selectedTabName'];
    });
    if (this.selectedTabName) {
      let tabIndex = this.getTabIndexByName(this.selectedTabName);
      this.tabGroup.selectedIndex = tabIndex;
    } else {
      this.tabGroup.selectedIndex = 0;
    }
    const selectedIndex = this.tabGroup.selectedIndex;
    this.selectedTabName = this.tabGroup._tabs._results[selectedIndex].textLabel;
    this.getDynamicPageData();
  }

  onReset(selectedTab) {
    this.searchPageNameQuery = '';
    this.selectedTabName = selectedTab;
    this.getDynamicPageData();
  }
  getDynamicPageList() {
    this.spinner.show();
    this.blogPageList = this.mailconfiglist?.filter((i) => i.ptype == 'blogs');
    this.infoPageList = this.mailconfiglist?.filter((i) => i.ptype == 'info');
    this.ourlinesPageList = this.mailconfiglist?.filter((i) => i.ptype == 'our-lines');
    this.servicesPageList = this.mailconfiglist?.filter((i) => i.ptype == 'services');
    this.spinner.hide();
  }
  tabChanged(event: MatTabChangeEvent) {
    this.spinner.show();
    const selectedIndex = this.tabGroup.selectedIndex;
    this.selectedTabName = this.tabGroup._tabs._results[selectedIndex].textLabel;
    this.searchPageNameQuery = this.searchPageNameQuery;
    this.getDynamicPageData()
    if(this.mailconfiglist && this.mailconfiglist.length > 0){
      this.applyFilter(this.selectedTabName.toLowerCase());
      this.spinner.hide();
    }
  }
  applyFilter(pType) {
    const lowerCasePageNameQuery = this.searchPageNameQuery ? this.searchPageNameQuery.toLowerCase().trim() : '';
    switch (pType) {
      case 'blogs':
        this.blogPageList = this.mailconfiglist?.filter(o => o.PageName.includes(lowerCasePageNameQuery) && o.ptype == pType);
        break;
      case 'info':
        this.infoPageList = this.mailconfiglist?.filter(o => o.PageName.includes(lowerCasePageNameQuery) && o.ptype == pType);
        break;
      case 'services':
        this.servicesPageList = this.mailconfiglist?.filter(o => o.PageName.includes(lowerCasePageNameQuery) && o.ptype == pType);
        break;
      case 'our-lines':
        this.ourlinesPageList = this.mailconfiglist?.filter(o => o.PageName.includes(lowerCasePageNameQuery) && o.ptype == pType);
        break;
      default:
        console.log('Unknown Status');
        break;
    }

  }

  openDialog(PageID): void {
    let dialogRef = this.dialog.open(Deletedynamicpagedialog, {
      width: '400px',
      height: '400px',
      data: { memRefNo: this.memRefNo, PageID: PageID }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onEditconf(ConfigId) {
    this.router.navigate(['/adddynamicpage', this.id, this.memRefNo, ConfigId, this.selectedTabName], { queryParams: { searchPageNameQuery: this.searchPageNameQuery, selectedTabName: this.selectedTabName } });
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  pageChanged(event: any): void {
    this.page = event;
  }
}


@Component({
  selector: 'Deletedynamicpagedialog',
  templateUrl: 'Deletedynamicpagedialog.html',
})
export class Deletedynamicpagedialog {

  constructor(
    private MailConfigService: MailConfigService,
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

  onYesClick(memRefNo, PageID): void {

    this.MailConfigService.Deletedynamicpage(memRefNo, PageID).subscribe(res => {
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