import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { MailConfig } from '../../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailConfigService } from '../../services/mailbox-config.service.';
import { LoadingService } from '../../services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-userconfiglist',
  templateUrl: './userconfiglist.component.html',
  styleUrls: ['./userconfiglist.component.css']
})
export class UserconfiglistComponent implements OnInit  {
  memRefNo: string;
  configlist:any;
  userType: string;
  id:string;
  filteredConfigList: any[] = [];
  searchText: string = '';
  page: number = 1;
  totalPage: number;
  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute, private MailConfigService:MailConfigService,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.spinner.show();
    this.searchText = localStorage.getItem('configSearchText');
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.getConfigList();
  }
  getConfigList(){
    this.MailConfigService.getConfigList(this.memRefNo).subscribe((data: any) => {
      this.spinner.hide();
      this.configlist = data;
      this.applyFilter();
    });
  }
  applyFilter() {
    if(this.searchText){
      localStorage.setItem('configSearchText', this.searchText);
      this.filteredConfigList = this.configlist?.filter(item => {
        return Object.values(item).some((value: any) =>
          value && value.toString().toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
      this.page = 1;
    }else{
      this.filteredConfigList = this.configlist;
    }
  }
  onReset(){
    this.searchText = '';
    localStorage.setItem('configSearchText', this.searchText);
    this.getConfigList();
  }
  onEditconf(ConfigId){
    //this.router.navigate(['/addconfig',this.id,this.memRefNo, ConfigId], { queryParams: { searchText: this.searchText } });
    this.router.navigate(['/addconfig',this.id,this.memRefNo, ConfigId]);
  }
  pageChanged(event: any): void {
    this.page = event;
  }
 
}
