import { Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailConfigService } from '../services/mailbox-config.service.';
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
  page: number = 1;
  totalPage: number;

  filteredProductlist: any[];
  searchText: string = '';

  constructor(private route: ActivatedRoute, private MailConfigService: MailConfigService, private toastr: ToastrService, private router: Router, private loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.sendMessage('start');
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.getProductList(this.page)
  }
  getProductList(pageNo : number): number {
    this.MailConfigService.Getproductlist(this.memRefNo,pageNo).subscribe((data: any) => {
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
  // GetProductByFilter(pageNo){
  //   this.MailConfigService.GetFilteredproductlist(this.memRefNo,this.searchQuery,pageNo).subscribe((data: any) => {
  //     this.productlist = data;
  //     this.filteredProductlist = this.productlist;
  //     try {
  //       this.totalPage = data[0].TotalPage;
  //     } catch (Ex) {
  //       this.totalPage = 1;
  //     }
  //     this.page = 1;
  //     return this.page;
  //   });
  // }
  // clearFilter(){
  //   this.searchQuery = '';
  //   this.page = 1;
  //   this.getProductList(this.page);
  // }
  applyFilter() {
    this.filteredProductlist = this.productlist.filter(item => {
      return Object.values(item).some((value: any) =>
        value && value.toString().toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
    //this.page = 1;
  }

  onEditconf(itemDocID) {
    this.router.navigate(['/addproduct', this.id, this.memRefNo, itemDocID]);
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }

  selectAllCheckbox() {
    this.filteredProductlist.forEach(item => {
      this.updateSelectedIds(item.item1);
    });
  }

  selectItem(item: any) {
    this.updateSelectedIds(item);
  }

  updateSelectedIds(item: any) {
    if (item.selected) {
      this.selectedIds.push(item);
    } else {
      const index = this.selectedIds.indexOf(item);
      if (index !== -1) {
        this.selectedIds.splice(index, 1);
      }
    }
  }

  selectedIds: string[] = [];
}
