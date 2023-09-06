import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserprocesstimeService } from '../../shared/userprocesstime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../services/loading.service';
import { MailConfigService } from '../../services/mailbox-config.service.';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-logo-upload',
  templateUrl: './logo-upload.component.html',
  styleUrls: ['./logo-upload.component.css']
})
export class LogoUploadComponent implements OnInit {
  memRefNo: string;
  userType: string;
  configlist: any;
  id: string;
  page: number = 1;
  totalPage: number;
  userroles: string;
  isdesable = false;
  filteredConfigList: any[] = [];
  searchText: string = '';

  constructor(private spinner: NgxSpinnerService,private MailConfigService: MailConfigService, private userprocesstimeService: UserprocesstimeService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router, private loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) { }
  SelectedFile: File = null;
  ngOnInit() {
    this.spinner.show();
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.userroles = localStorage.getItem('Role');
    if (this.userroles == 'Admin') {
      this.isdesable = false;
    }
    else {
      this.isdesable = true;
    }
    this.MailConfigService.getColorConfigList(this.memRefNo).subscribe(Reqs => {
      this.spinner.hide();
      this.configlist = Reqs;
      this.filteredConfigList = this.configlist.filter(i => i.ColorConfigKey == "Logo");
      if (this.isdesable == true) {
        var getnewlist = [];
        getnewlist.push(this.configlist[0]);
        this.configlist = getnewlist;
      }
    });

  }
  applyFilter() {
    this.filteredConfigList = this.configlist.filter(item => {
      return Object.values(item).some((value: any) =>
        value && value.toString().toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
    this.page = 1;
  }
  onEditconf(ConfigId) {
    this.router.navigate(['/addwebdesign', this.id, this.memRefNo, ConfigId]);
  }

  onFileSelected(event) {
    this.SelectedFile = <File>event.target.files[0];
  }
  OnUpload() {
    this.spinner.show();
    const fd = new FormData();
    fd.append('image', this.SelectedFile, this.SelectedFile.name);
    fd.append('memRefNo', this.memRefNo);
    this.userprocesstimeService.LogoUploadUser(fd).subscribe((data: any) => {
      this.spinner.hide();
      this.toastr.success(data.Message);
    });
  }
  back() {
    this.router.navigate(['/userlist', this.userType]);
  }
  pageChanged(event: any): void {
    this.page = event;
  }
}
