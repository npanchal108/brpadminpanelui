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
  totalServicesPages: number;
  totalBlogPages: number;
  totalInfoPages: number;
  totalOurlinePages: number;
  blogPageList: any[];
  infoPageList: any[];
  servicesPageList: any[];
  ourlinesPageList: any[];
  companyDomainValue: string;
  searchPageNameQuery: string = '';
  searchBlogPageNameQuery: string = '';
  searchinfoPageNameQuery: string = '';
  searchOutlinesPageNameQuery: string = '';
  searchServicesPageNameQuery: string = '';
  searchPageTypeQuery: string = '';
  @ViewChild('tabGroup') tabGroup: any;
  selectedTabName: string;
  currentTab: number = -1
  searchText: string;
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
      this.searchPageNameQuery = params['searchText'];
      this.selectedTabName = params['selectedTabName'];
    });
    this.currentTab = this.tabGroup.selectedIndex;
    this.selectedTabName = this.tabGroup._tabs._results[this.currentTab].textLabel;
  }

  onReset(selectedTab) {
    switch (this.currentTab) {
      case 0:
        this.searchBlogPageNameQuery = ""
        this.applyFilter("blogs")
        break;
      case 1:
        this.searchinfoPageNameQuery = "";
        this.applyFilter("info")
        break;
      case 2:
        this.searchOutlinesPageNameQuery = "";
        this.applyFilter("our-lines")
        break;
      case 3:
        this.searchServicesPageNameQuery = "";
        this.applyFilter("services")
        break;
      default:
        this.searchPageNameQuery = ""
    }
  }
  getDynamicPageList() {
    this.spinner.show();
    this.blogPageList = this.mailconfiglist?.filter((i) => i.ptype == 'blogs');
    this.totalBlogPages = this.blogPageList.length

    this.infoPageList = this.mailconfiglist?.filter((i) => i.ptype == 'info');
    this.totalInfoPages = this.infoPageList.length

    this.ourlinesPageList = this.mailconfiglist?.filter((i) => i.ptype == 'our-lines');
    this.totalOurlinePages = this.ourlinesPageList.length;

    this.servicesPageList = this.mailconfiglist?.filter((i) => i.ptype == 'services');
    this.totalServicesPages = this.servicesPageList.length

    this.setTotalPages()
    this.spinner.hide();
  }

  setTotalPages() {
    switch (this.currentTab) {
      case 0:
        this.totalPage = this.blogPageList.length;
        break;

      case 1:
        this.totalInfoPages = this.infoPageList.length;
        break;

      case 2:
        this.totalOurlinePages = this.ourlinesPageList.length;
        break;

      case 3:
        this.totalServicesPages = this.servicesPageList.length;
        break;
      
      default:
        this.totalPage = 0
    }
  }
  setSearchText(){
    switch (this.currentTab) {
      case 0:
        this.searchText = this.searchBlogPageNameQuery;
        break;
      case 1:
        this.searchText = this.searchinfoPageNameQuery;
        break;
      case 2:
        this.searchText = this.searchOutlinesPageNameQuery;
        break;
      case 3:
        this.searchText = this.searchServicesPageNameQuery;
        break;
      default:
        this.searchText = '';
    }
  }

  tabChanged(event: MatTabChangeEvent) {
    console.log(event)
    this.currentTab = event.index
    this.selectedTabName = this.tabGroup._tabs._results[this.currentTab].textLabel;
  }
  applyFilter(pType) {
    let lowerCasePageNameQuery = ''
    switch (pType) {
      case 'blogs':
        lowerCasePageNameQuery = this.searchBlogPageNameQuery ? this.searchBlogPageNameQuery.toLowerCase().trim() : '';
        if (lowerCasePageNameQuery != '') {
          this.blogPageList = this.mailconfiglist.filter(i => i.PageTitle.toLowerCase().includes(lowerCasePageNameQuery) && i.ptype == pType);
        } else {
          this.blogPageList = this.mailconfiglist?.filter((i) => i.ptype == pType);
        }
        this.setTotalPages()
        break;
      case 'info':
        lowerCasePageNameQuery = this.searchinfoPageNameQuery ? this.searchinfoPageNameQuery.toLowerCase().trim() : '';
        if (lowerCasePageNameQuery != '') {
          this.infoPageList = this.mailconfiglist.filter(i => i.PageTitle.toLowerCase().includes(lowerCasePageNameQuery) && i.ptype == pType);
        } else {
          this.infoPageList = this.mailconfiglist?.filter((i) => i.ptype == pType);
        }
        this.setTotalPages()
        break;
      case 'services':
        
        lowerCasePageNameQuery = this.searchServicesPageNameQuery ? this.searchServicesPageNameQuery.toLowerCase().trim() : '';
        if (lowerCasePageNameQuery != '') {
          this.servicesPageList = this.mailconfiglist.filter(i => i.PageTitle.toLowerCase().includes(lowerCasePageNameQuery) && i.ptype == pType);
        } else {
          this.servicesPageList = this.mailconfiglist?.filter((i) => i.ptype == pType);
        }
        this.setTotalPages()
        break;
      case 'our-lines':
        lowerCasePageNameQuery = this.searchOutlinesPageNameQuery ? this.searchOutlinesPageNameQuery.toLowerCase().trim() : '';
        if (lowerCasePageNameQuery != '') {
          this.ourlinesPageList = this.mailconfiglist.filter(i => i.PageTitle.toLowerCase().includes(lowerCasePageNameQuery) && i.ptype == pType);
        } else {
          this.ourlinesPageList = this.mailconfiglist?.filter((i) => i.ptype == pType);
        }
        this.setTotalPages()
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
    this.setSearchText();
    console.log('this.selectedTabName',this.selectedTabName);
    console.log('this.searchText',this.searchText);
    this.router.navigate(['/adddynamicpage', this.id, this.memRefNo, ConfigId, this.selectedTabName], { queryParams: { searchPageNameQuery: this.searchText, selectedTabName: this.selectedTabName } });
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