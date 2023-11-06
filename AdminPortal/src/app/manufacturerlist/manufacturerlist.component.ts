import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyProfileService } from '../services/company-profile.service';
import { LoadingService } from '../services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MailConfigService } from '../services/mailbox-config.service.';

interface ItemType {
  key: string;
  value: string;
}

interface DocName {
  key: string;
  value: string;
}
@Component({
  selector: 'app-manufacturerlist',
  templateUrl: './manufacturerlist.component.html',
  styleUrls: ['./manufacturerlist.component.css']
})
export class ManufacturerlistComponent implements OnInit {
  memRefNo: string;
  manufracturelist: any = [];
  userType: string;
  id: string;
  page: number = 1;
  totalPage: number;

  filteredmanufracturelistlist: any[];
  searchText: string = '';

  constructor(private dialog: MatDialog,private spinner: NgxSpinnerService, private route: ActivatedRoute, private CompanyProfileService: CompanyProfileService, private toastr: ToastrService, private router: Router, private loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchText = params['searchText'];
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.getManufracturerList(this.page);
  }
  pageChanged(event: number) {
    this.page = event;
    this.getManufracturerList(event);
  }
  getManufracturerList(pageNo: number): number {
    this.spinner.show();
    //this.MailConfigService.Getproductlist(this.memRefNo, pageNo).subscribe((data: any) => {
    this.CompanyProfileService.GetManufracturerItemDocList(this.memRefNo, this.page).subscribe((data: any) => {
      this.spinner.hide();
      this.manufracturelist = data;
      console.log('this.manufracturelist===>',this.manufracturelist);
      this.filteredmanufracturelistlist = this.manufracturelist;
      try {
        this.totalPage = data[0].TotalPage;
      } catch (Ex) {
        this.totalPage = 1;
      }
      this.page = pageNo;
    });
    return this.page;
  }
  applyFilter() {
    if (this.searchText) {
      this.spinner.show();
      this.CompanyProfileService.GetFilteredManufracturerItemDocList(this.memRefNo, this.searchText, 1).subscribe((data: any) => {
        this.manufracturelist = data;
        this.filteredmanufracturelistlist = this.manufracturelist;
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
      this.getManufracturerList(this.page);
    }
  }
  onReset() {
    this.searchText = '';
    this.getManufracturerList(1);
  }
  OnAddManufracturerItemDoc(MemRefNo,ItemDocId, Item, DocType, DocTypeName, DocTypeTextUrl): void {
    let dialogRef = this.dialog.open(DialogAddEditManufracturerItemDoc, {
        width: '700px',
        data: {
            memRefNo: MemRefNo,
            itemDocId: ItemDocId,
            item: Item,
            docType: DocType,
            docTypeName: DocTypeName,
            docTypeTextUrl: DocTypeTextUrl
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getManufracturerList(1);
    });
}
}

@Component({
  selector: 'dialog-add-edit-manufracturer-itemdoc',
  templateUrl: 'dialog-add-edit-manufracturer-itemdoc.html',
})
export class DialogAddEditManufracturerItemDoc {

  constructor(
      private MailConfigService: MailConfigService,
      private toastr: ToastrService,
      private router: Router,
      public dialogRef: MatDialogRef<DialogAddEditManufracturerItemDoc>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

  selectedfileType: string;
  selectedDocName: string;
  itemContent: any;
  docTypeName: string;
  docTypeId: number;
  SelectedFile: File = null;
  memRefNo: string;
  itemDocId: number;
  item: string;
  itemSequence: number;
  pdfFileName:string;
  ngOnInit() {
      console.log('this.Manufracturerdata===>',this.data);
      this.memRefNo = this.data.memRefNo;
      this.docTypeId = this.data.itemId;
      this.item = this.data.item;
      this.selectedfileType = this.data.docType;
      this.itemContent = this.data.docTypeTextUrl;
      this.docTypeName = this.data.docTypeName;
      if (this.selectedfileType == "doc") {
          this.selectedDocName = this.data.docTypeName;
      }
      this.itemDocId = this.data.itemDocId;
      this.itemSequence = this.data.sequence == null ? 999 : this.data.sequence;
      if(this.selectedfileType == 'doc' && this.itemContent != undefined && this.itemContent != '' && this.itemContent != null){
          const url = new URL(this.itemContent);
          const pathname = url.pathname;
          this.pdfFileName = pathname.substring(pathname.lastIndexOf('/') + 1);
      }
  }

  fileType: ItemType[] = [
      { key: 'doc', value: 'doc' },
      { key: 'video', value: 'video' }
  ];

  docName: DocName[] = [
      { key: 'TDS', value: 'TDS' },
      { key: 'Liturature', value: 'Liturature' },
  ];
  // onDocNameChange(newValue: any) {
  //   console.log('newValue',newValue);
  //   this.selectedDocName = newValue;
  // }
  onFileSelected(event) {
      //this.SelectedFile = <File>event.target.files[0];
      const inputElement = event.target as HTMLInputElement;
      this.SelectedFile = inputElement.files[0];
      if (!this.SelectedFile) {
          return;
      }

      const fileType = this.SelectedFile.type;
      console.log('fileType====>', fileType)
      if (this.selectedfileType == "doc" && fileType != 'application/pdf') {
          this.toastr.error('Please select valid pdf file');
          inputElement.value = '';
          return;
      } else if (this.selectedfileType == "image" && fileType.split('/')[0] != 'image') {
          this.toastr.error('Please select valid image file');
          inputElement.value = '';
          return;
      }
  }

  onCancel(): void {
      this.dialogRef.close();
  }
 
  onSave() {
      const fd = new FormData();

      if (this.selectedfileType == "doc") {
          if (this.itemDocId > 0 && this.SelectedFile != undefined && this.SelectedFile != null) {
              fd.append('FileName', this.SelectedFile.name);
              fd.append('image', this.SelectedFile, this.SelectedFile.name);
          }
          else if (this.itemDocId == 0 && (this.SelectedFile == undefined || this.SelectedFile == null)) {
              if (this.selectedfileType == "doc") {
                  this.toastr.error('Please select valid pdf file');
                  return;
              } 
          } else if (this.itemDocId == 0 && (this.SelectedFile != undefined || this.SelectedFile != null)) {
              fd.append('FileName', this.SelectedFile.name);
              fd.append('image', this.SelectedFile, this.SelectedFile.name);
          }
          else {
              fd.append('DocDetailsUrl', this.itemContent);
          }
      }
      else {
          fd.append('DocDetailsUrl', this.itemContent);
      }
      fd.append('Sequence', '0');
      if (this.selectedfileType == "doc") {
          fd.append('DocName', this.selectedDocName);
      } else if (this.selectedfileType == "video") {
          fd.append('DocName', "video");
      } 
      fd.append('memRefNo', this.memRefNo);
      fd.append('ItemDocId', this.itemDocId.toString());
      fd.append('DocType', this.selectedfileType);
      fd.append('Item', this.item);
      fd.append('IMType', 'True');
      this.MailConfigService.UpdateImageDocument(fd).subscribe((data: any) => {
          console.log(data);
          if (data == true || data == "true") {
              this.toastr.success("Sucessfully Updated");
              this.dialogRef.close();
          }
          else {
              this.toastr.error("Error occured please try again");
              this.dialogRef.close();
          }
      });
  }
}
