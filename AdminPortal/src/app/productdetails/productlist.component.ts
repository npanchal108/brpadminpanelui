import { Component, OnInit, ChangeDetectorRef, Inject, ViewChild } from '@angular/core';
import { MailConfig } from '../model/mail-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MailConfigService } from '../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
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
  page = 1;
  
  filteredProductlist: any[];
  searchQuery: string = '';

  constructor(private route: ActivatedRoute, private MailConfigService: MailConfigService, private toastr: ToastrService, private router: Router, private loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.sendMessage('start');
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.MailConfigService.Getproductlist(this.memRefNo).subscribe((data: any) => {
      this.productlist = data;
      this.filteredProductlist = this.productlist;
      this.sendMessage('stop');
    });
  }
  applyFilter() {
    const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
    this.filteredProductlist = this.productlist.filter((i) => {
      return (
        i.item1.toLowerCase().includes(lowerCaseQuery)
      );
    });
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
    console.log('selectItem==>', item);
    this.updateSelectedIds(item);
  }

  updateSelectedIds(item: any) {
    console.log('updateSelectedIds==>', item);
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
