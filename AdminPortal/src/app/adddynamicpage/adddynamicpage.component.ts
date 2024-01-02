import { Component, OnInit, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailConfigService } from '../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../services/loading.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

interface PageType {
  key: string;
  value: string;
}

@Component({
  selector: 'app-adddynamicpage',
  templateUrl: './adddynamicpage.component.html',
  styleUrls: ['./adddynamicpage.component.css']
})

export class adddynamicpageComponent implements OnInit, PipeTransform {
  memRefNo: string;
  Mailtemplate: any;
  SelectedFile: File = null;
  ImageUrl: any;
  cid: number;
  uid: any;
  pageType: string;
  pageTypes: PageType[] = [
    { key: 'blogs', value: 'blogs' },
    { key: 'info', value: 'info' },
    { key: 'our-lines', value: 'our-lines' },
    { key: 'services', value: 'services' }
  ];
  companyDomainValue: string;
  searchPageNameQuery:string;
  selectedTabName:string;
  editorConfig = {
    placeholder: 'Enter your text here',
    height: '300px',
  };
  constructor(private datePipe: DatePipe, private sanitizer: DomSanitizer, private route: ActivatedRoute, private MailConfigService: MailConfigService, private toastr: ToastrService, private router: Router, private loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) { }
  cleanURL(oldURL: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }

  checkfile() {
    console.log('this.SelectedFile', this.SelectedFile);
  }
  onFileSelected(event) {
    this.SelectedFile = <File>event.target.files[0];
    if (!this.SelectedFile.type.startsWith('image/')) {
      this.toastr.error('Please select a valid image file (JPEG, PNG, GIF, etc.).');
      return;
    }
  }


  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchPageNameQuery = params['searchText'];
      this.selectedTabName = params['selectedTabName'];
    });
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.cid = parseInt(this.route.snapshot.paramMap.get('userType'));
    this.uid = parseInt(this.route.snapshot.paramMap.get('id'));
    this.pageType = this.route.snapshot.paramMap.get('activeTab');
    const currentDate = new Date();
    this.MailConfigService.getConfigList(this.memRefNo).subscribe((data: any) => {
      const companyDomainConfig = data.filter(i => i.ConfigKey == 'CompanyDomain');
      this.companyDomainValue = companyDomainConfig.length > 0 ? companyDomainConfig[0].ConfigValue : '';
    });
    if (this.cid > 0) {
      this.MailConfigService.GetdynamicpageByID(this.memRefNo, this.cid).subscribe((data: any) => {
        this.Mailtemplate = data;
        this.Mailtemplate.Sequence = this.Mailtemplate.Sequence === null ? 999 : this.Mailtemplate.Sequence;
        this.Mailtemplate.createDate = this.datePipe.transform(this.Mailtemplate.createDate, 'dd-MM-yyyy');
      });
    }
    else {
      this.Mailtemplate = [];
      this.Mailtemplate.PageName = '';
      this.Mailtemplate.PageTitle = '';
      this.Mailtemplate.PageDescription = '';
      this.Mailtemplate.PageKeywords = '';
      this.Mailtemplate.PageContent = '';
      this.Mailtemplate.Sequence = 999;
      this.Mailtemplate.IsActive = 1;
      this.Mailtemplate.createDate = this.datePipe.transform(currentDate, 'dd-MM-yyyy').toString();
    }
  }
  OnSubmit(form: NgForm) {

    if ((this.Mailtemplate.imageurl == undefined || this.Mailtemplate.imageurl == ' ' || this.Mailtemplate.imageurl == null) && (this.SelectedFile == undefined || this.SelectedFile == null)) {
      this.toastr.error('Please Select The Image File');
      return;
    }

    const fd = new FormData();
    if (this.SelectedFile != undefined && this.SelectedFile != null) {
      fd.append('FileName', this.SelectedFile.name);
      fd.append('image', this.SelectedFile, this.SelectedFile.name);
    }
    fd.append('memRefNo', this.memRefNo);
    fd.append('PageID', this.Mailtemplate.PageID);
    fd.append('PageName', form.value.PageName);
    fd.append('PageTitle', form.value.PageTitle);
    fd.append('PageDescription', form.value.PageDescription);
    fd.append('PageKeywords', form.value.PageKeywords);
    fd.append('PageContent', form.value.PageContent);
    fd.append('PageType',this.pageType.toLocaleLowerCase());
    fd.append('Sequence', form.value.Sequence);
    if(form.value.IsActive == 1){
      fd.append('IsActive', 'true');
    }else{
      fd.append('IsActive', 'false');
    }
    fd.append('ImageUrl', this.Mailtemplate.imageurl);
    this.MailConfigService.Updatedynamicpage(fd).subscribe((data: any) => {
      if (data == true || data == "true") {
        form.resetForm();
        this.toastr.success("Sucessfully Updated");
        this.router.navigate(['/dynamicpages', this.uid, this.memRefNo, this.cid], { queryParams: { searchPageNameQuery: this.searchPageNameQuery,selectedTabName : this.selectedTabName } });
       // this.router.navigate(['/dynamicpages', this.uid, this.memRefNo, this.cid]);
      }
      else {
        this.toastr.error("Error occured please try again");
      }
    });
  }
  back() {
    this.router.navigate(['/dynamicpages', this.uid, this.memRefNo, this.cid], { queryParams: { searchPageNameQuery: this.searchPageNameQuery,selectedTabName : this.selectedTabName } });
  }

}
