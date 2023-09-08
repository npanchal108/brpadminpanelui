import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailConfigService } from '../services/mailbox-config.service.';
import { LoadingService } from '../services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class productlistComponent implements OnInit {
  @ViewChild('checkAll') checkAll: ElementRef;

  memRefNo: string;
  productlist: any = [];
  userType: string;
  id: string;
  page: number = 1;
  totalPage: number;

  filteredProductlist: any[];
  searchText: string = '';
  filterActive: number = -1;
  selectedIds: string[] = [];

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private MailConfigService: MailConfigService, private toastr: ToastrService, private router: Router, private loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchText = params['searchText'];
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.getProductList(this.page)
  }
  pageChanged(event: number) {
    this.page = event
    this.resetCheckBoxSelectState();
    if (this.filterActive == -1) {
      this.getProductList(event);
    } else {
      this.onFilterActiveChange(this.filterActive);
    }
  }
  getProductList(pageNo: number): number {
    this.spinner.show();
    //this.MailConfigService.Getproductlist(this.memRefNo, pageNo).subscribe((data: any) => {
    this.MailConfigService.GetFilteredproductlist(this.memRefNo, this.searchText, this.filterActive, this.page).subscribe((data: any) => {
      this.spinner.hide();
      this.productlist = data;
      this.filteredProductlist = this.productlist;
      try {
        this.totalPage = data[0].TotalPage;
      } catch (Ex) {
        this.totalPage = 1;
      }
      this.page = pageNo;
    });
    return this.page;
  }
  onFilterActiveChange(value: number) {
    this.filteredProductlist = [];
    if (this.filterActive != value) {
      this.page = 1;
    }
    this.filterActive = value;
    this.spinner.show();
    try {
      this.MailConfigService.GetFilteredproductlist(this.memRefNo, this.searchText, value, this.page).subscribe((data: any) => {
        this.spinner.hide();
        this.productlist = data;
        this.filteredProductlist = this.productlist;
        if (this.filteredProductlist.length > 0) {
          this.totalPage = this.filteredProductlist[0].TotalPage;
          this.page = this.page;
        }
      })
    } catch (ex) {
      this.spinner.hide();
      this.toastr.error("Error occured please try again");
    }
    return this.page;
  }
  applyFilter() {
    if (this.searchText) {
      this.spinner.show();
      this.MailConfigService.GetFilteredproductlist(this.memRefNo, this.searchText, this.filterActive, 1).subscribe((data: any) => {
        this.productlist = data;
        this.filteredProductlist = this.productlist;
        try {
          this.totalPage = data[0].TotalPage;
        } catch (Ex) {
          this.totalPage = 1;
        }
        this.spinner.hide();
        this.page = 1;
        return this.page;
      });
    } else {
      this.getProductList(this.page);
    }
  }

  onEditconf(itemDocID) {
    this.router.navigate(['/addproduct', this.id, this.memRefNo, itemDocID], { queryParams: { searchText: this.searchText } });
    //this.router.navigate(['/addproduct', this.id, this.memRefNo, itemDocID]);
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }

  selectAllCheckbox(event) {
    if (event.target.checked) {
      this.filteredProductlist.forEach(item => {
        this.selectedIds.push(item.item1);
      });
    } else {
      this.selectedIds = []
    }
  }
  onReset() {
    this.searchText = '';
    this.filterActive = -1;
    this.getProductList(1);
  }
  selectItem(item: any) {
    this.updateSelectedIds(item);
  }

  updateSelectedIds(item: any) {
    const index = this.selectedIds.indexOf(item);
    if (index !== -1) {
      this.selectedIds.splice(index, 1);
    } else {
      this.selectedIds.push(item);
    }
  }

  OnApplyActiveDeactive(activeFlag) {
    var getItemModel = {
      "memRefNo": this.memRefNo,
      "items": this.selectedIds,
      "isItemActive": activeFlag,
    }
    this.MailConfigService.UpdateBulkActiveInActive(getItemModel).subscribe((data: any) => {
      this.filterActive = -1;
      if (data == true || data == "true") {
        this.resetCheckBoxSelectState();
        this.toastr.success("Sucessfully Updated");
        this.getProductList(1);
      }
      else {
        this.resetCheckBoxSelectState();
        this.toastr.error("Error occured please try again");
      }
    });
  }

  resetCheckBoxSelectState() {
    this.checkAll.nativeElement.checked = false;
    const customEvent = {
      target: {
        checked: false
      }
    };
    this.selectAllCheckbox(customEvent);
  }
}
