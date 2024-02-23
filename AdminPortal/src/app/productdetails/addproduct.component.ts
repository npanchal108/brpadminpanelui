import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailConfigService } from '../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

interface ItemType {
    key: string;
    value: string;
}

interface DocName {
    key: string;
    value: string;
}

@Component({
    selector: 'app-addproduct',
    templateUrl: './addproduct.component.html',
    styleUrls: ['./productlist.component.css']
})
export class addproductComponent implements OnInit {
    @ViewChild('filePriceListInput') filePriceListInput: any;
    @ViewChild('fileDocListInput') fileDocListInput: any;

    memRefNo: string;
    productDetails: any;
    productPriceDetails: any;
    SelectedFile: File = null;
    ImageUrl: any;
    itemId: string;
    uid: any;
    selectedProductPriceFile: File | undefined;
    selectedProductDocumentFile: File | undefined;
    searchText: string;
    sequenceArr : [] = [];

    itemType: ItemType[] = [
        { key: 'doc', value: 'doc' },
        { key: 'text', value: 'text' },
        { key: 'video', value: 'video' },
        { key: 'image', value: 'image' }
    ];

    constructor(private spinner: NgxSpinnerService,private sanitizer: DomSanitizer, private route: ActivatedRoute, private toastr: ToastrService, private MailConfigService: MailConfigService, private dialog: MatDialog, private router: Router) { }
    cleanURL(oldURL: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
    }
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.searchText = params['searchText'];
        });
        this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
        this.itemId = this.route.snapshot.paramMap.get('itemId');
        this.uid = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getItemList();
        this.getItemPrice();
    }

    getItemList() {
        if (this.itemId != null && this.itemId != undefined && this.itemId != '') {
            this.spinner.show();
            this.MailConfigService.GetproductDocBYId(this.memRefNo, this.itemId).subscribe((data: any) => {
                this.productDetails = data;
                console.log('this.productDetails',this.productDetails);
                this.sequenceArr = this.productDetails.filter(i => i.DocType === 'image').map(i => i.Sequence);
                console.log('this.sequenceArr',this.sequenceArr);
                this.spinner.hide();
            });
        }
    }
    getItemPrice() {
        if (this.itemId != null && this.itemId != undefined && this.itemId != '') {
            this.spinner.show();
            this.MailConfigService.GetItemPriceByItem(this.memRefNo, this.itemId).subscribe((data: any) => {
                this.productPriceDetails = data;
                this.spinner.hide();
            });
        }
    }

    back() {
        this.router.navigate(['/productlist', this.uid, this.memRefNo, 'Client'], { queryParams: { searchText: this.searchText } });
    }

    openDialog(MemRefNo, ItemDocId, Item, DocType, DocTypeName, DocTypeTextUrl, Sequence): void {
        let dialogRef = this.dialog.open(DialogAddEditProduct, {
            width: '700px',
            data: {
                memRefNo: MemRefNo,
                itemDocId: ItemDocId,
                item: Item,
                docType: DocType,
                docTypeName: DocTypeName,
                docTypeTextUrl: DocTypeTextUrl,
                sequence: Sequence,
                sequenceArr: this.sequenceArr
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getItemList();
        });
    }

    openDeleteDialog(itemDocId): void {
        let dialogRef = this.dialog.open(DeleteItemDocdialog, {
            width: '400px',
            height: '400px',
            data: { memRefNo: this.memRefNo, itemDocId: itemDocId }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getItemList();
        });
    }

    openEdit(id) {
        console.log('item id', id);
    }
    OnSave() {
        this.spinner.show();
        this.MailConfigService.UpdateItemPrice(this.memRefNo, this.productPriceDetails.Item, this.productPriceDetails.ItemPrice, this.productPriceDetails.ItemIsActive).subscribe((data: any) => {
            if (data == true || data == "true") {
                this.spinner.hide();
                this.toastr.success("Sucessfully Updated");
                this.router.navigate(['/productlist', this.uid, this.memRefNo, 'Client'], { queryParams: { searchText: this.searchText } });
                //this.router.navigate(['/productlist', this.uid, this.memRefNo, 'Client']);
            }
            else {
                this.spinner.hide();
                this.toastr.error("Error occured please try again");
            }
        });
    }
}

@Component({
    selector: 'dialog-add-edit-product',
    templateUrl: 'dialog-add-edit-product.html',
})
export class DialogAddEditProduct {

    constructor(
        private spinner: NgxSpinnerService,
        private sanitizer: DomSanitizer,
        private MailConfigService: MailConfigService,
        private toastr: ToastrService,
        private router: Router,
        public dialogRef: MatDialogRef<DialogAddEditProduct>,
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
    pdfFileName: string;
    docName: DocName[] = [];

    ngOnInit() {
        this.memRefNo = this.data.memRefNo;
        this.getDocumentTypes();
    }
    getDocumentTypes() {
        this.MailConfigService.GetDocumentTypeConfigValue(this.memRefNo).subscribe((data: any) => {
            this.docName = JSON.parse(data);
            this.docTypeId = this.data.itemId;
            this.item = this.data.item;
            this.selectedfileType = this.data.docType;
            this.itemContent = this.data.docTypeTextUrl;
            this.docTypeName = this.data.docTypeName;
            if (this.selectedfileType == "doc") {
                console.log('docName',this.docName);
                console.log('this.selectedfileType',this.selectedfileType);
                this.selectedDocName = this.data.docTypeName;
                console.log('this.selectedDocName',this.selectedDocName);
            }
            this.itemDocId = this.data.itemDocId;
            this.itemSequence = this.data.sequence == null ? 999 : this.data.sequence;
            if (this.selectedfileType == 'doc' && this.itemContent != undefined && this.itemContent != '' && this.itemContent != null) {
                const url = new URL(this.itemContent);
                const pathname = url.pathname;
                this.pdfFileName = pathname.substring(pathname.lastIndexOf('/') + 1);
            }
        });
    }
    fileType: ItemType[] = [
        { key: 'doc', value: 'doc' },
        { key: 'text', value: 'text' },
        { key: 'video', value: 'video' },
        { key: 'image', value: 'image' }
    ];

    onFileSelected(event) {
        //this.SelectedFile = <File>event.target.files[0];
        const inputElement = event.target as HTMLInputElement;
        this.SelectedFile = inputElement.files[0];
        if (!this.SelectedFile) {
            return;
        }
        // console.log('this.selectedfile',this.SelectedFile);
        // console.log('this.selectedDocName',this.selectedDocName);
        
        // const fileType = this.SelectedFile.type;
        // console.log('fileType====>', fileType)
        // if(this.selectedfileType == "doc" && this.selectedDocName != "CAD"){
        //     if (this.selectedfileType == "doc" && fileType != 'application/pdf') {
        //         this.toastr.error('Please select valid pdf file');
        //         inputElement.value = '';
        //         return;
        //     } 
        // }else if (this.selectedfileType == "image" && fileType.split('/')[0] != 'image') {
        //     this.toastr.error('Please select valid image file');
        //     inputElement.value = '';
        //     return;
        // }
        
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave() {
        console.log('this.selectedDocName',this.selectedDocName);

        const fd = new FormData();

        if (this.selectedfileType == "doc" || this.selectedfileType == "image") {
            if (this.itemDocId > 0 && this.SelectedFile != undefined && this.SelectedFile != null) {
                fd.append('FileName', this.SelectedFile.name);
                fd.append('image', this.SelectedFile, this.SelectedFile.name);
            }
            else if (this.itemDocId == 0 && (this.SelectedFile == undefined || this.SelectedFile == null)) {
                if (this.selectedfileType == "doc") {
                    this.toastr.error('Please select valid file');
                    return;
                } else if (this.selectedfileType == "image") {
                    this.toastr.error('Please select valid image file');
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

        if (this.selectedfileType == "doc") {
            fd.append('DocName', this.selectedDocName);
            if (this.selectedDocName) {
                this.itemSequence = Number(this.docName.find(item => item.key === this.selectedDocName)?.value) || null;
            } else {
                this.itemSequence = null;
            }
            fd.append('Sequence', this.itemSequence.toString());
        } else if (this.selectedfileType == "image") {
            if (this.itemDocId > 0) {
                fd.append('DocName', this.docTypeName);
            } else {
                fd.append('DocName', this.SelectedFile.name);
            }
            if (this.itemSequence == undefined || this.itemSequence == null || this.itemSequence == 0) {
                this.toastr.error('Please Enter Sequence of an Image');
                return;
            }
            if(this.data.sequenceArr  && this.data.sequenceArr != undefined && this.data.sequenceArr.length > 0){
                let exists = this.data.sequenceArr.includes(Number(this.itemSequence));
                if(exists){
                    this.toastr.error('Image Sequence Already Exists');
                    return;
                }
            }
            fd.append('Sequence', this.itemSequence.toString());
        } else if (this.selectedfileType == "video") {
            fd.append('DocName', "video");
        } else if (this.selectedfileType == "text") {
            fd.append('DocName', "Description");
        }
        fd.append('memRefNo', this.memRefNo);
        fd.append('ItemDocId', this.itemDocId.toString());
        fd.append('DocType', this.selectedfileType);
        fd.append('Item', this.item);
        fd.append('IMType', 'False');
        this.spinner.show();
        this.MailConfigService.UpdateImageDocument(fd).subscribe((data: any) => {
            console.log(data);
            if (data == true || data == "true") {
                this.toastr.success("Sucessfully Updated");
                this.dialogRef.close();
                this.spinner.hide();
            }
            else {
                this.toastr.error("Error occured please try again");
                this.dialogRef.close();
                this.spinner.hide();
            }
        });
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
}

@Component({
    selector: 'DeleteItemDocdialog',
    templateUrl: 'deleteitemdocdialog.html',
})
export class DeleteItemDocdialog {

    constructor(
        private spinner: NgxSpinnerService,
        private MailConfigService: MailConfigService,
        private toastr: ToastrService,
        private router: Router,
        public dialogRef: MatDialogRef<DeleteItemDocdialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(memRefNo, itemDocId): void {
        this.spinner.show();
        this.MailConfigService.DeleteItemDocByID(memRefNo, itemDocId).subscribe(res => {
            if (res) {
                this.toastr.success("Record deleted successfully");
            }
            else {
                this.toastr.error("Something went wrong. Please try again.");
            }
            this.spinner.hide();
        });
        this.dialogRef.close();
    }
}
