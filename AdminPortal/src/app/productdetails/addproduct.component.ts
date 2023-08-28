import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailConfigService } from '../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

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

    itemType: ItemType[] = [
        { key: 'doc', value: 'doc' },
        { key: 'text', value: 'text' },
        { key: 'video', value: 'video' },
        { key: 'image', value: 'image' }
    ];

    constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private toastr: ToastrService, private MailConfigService: MailConfigService, private dialog: MatDialog, private router: Router) { }
    cleanURL(oldURL: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
    }
    ngOnInit() {
        console.log('this.route.snapshot.paramMap.get', this.route.snapshot.paramMap);
        this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
        this.itemId = this.route.snapshot.paramMap.get('itemId');
        this.uid = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getItemList();
        this.getItemPrice();
    }
    
    getItemList() {
        if (this.itemId != null && this.itemId != undefined && this.itemId != '') {
            this.sendMessage('start');
            this.MailConfigService.GetproductDocBYId(this.memRefNo, this.itemId).subscribe((data: any) => {
                this.productDetails = data;
                this.sendMessage('stop');
            });
        }
    }
    getItemPrice() {
        if (this.itemId != null && this.itemId != undefined && this.itemId != '') {
            this.sendMessage('start');
            this.MailConfigService.GetItemPriceByItem(this.memRefNo, this.itemId).subscribe((data: any) => {
                this.productPriceDetails = data;
                console.log('this.productPriceDetails', data)
                this.sendMessage('stop');
            });
        }
    }
    sendMessage(message): void {
        //this.loadingService.LoadingMessage(message);
    }
    back() {
        localStorage.setItem('TabIndex', '7');
        this.router.navigate(['/manageuser', this.uid, this.memRefNo, 'Client']);
    }

    openDialog(MemRefNo, ItemDocId, Item, DocType, DocTypeName, DocTypeTextUrl): void {
        let dialogRef = this.dialog.open(DialogAddEditProduct, {
            width: '700px',
            data: {
                memRefNo: MemRefNo,
                itemDocId: ItemDocId,
                item: Item,
                docType: DocType,
                docTypeName: DocTypeName,
                docTypeTextUrl: DocTypeTextUrl,
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
        console.log('this.productPriceDetails', this.productPriceDetails);
        console.log('form.value.ItemPrice', this.productPriceDetails.ItemPrice);
        this.MailConfigService.UpdateItemPrice(this.memRefNo, this.productPriceDetails.Item, this.productPriceDetails.ItemPrice, this.productPriceDetails.ItemIsActive).subscribe((data: any) => {
            if (data == true || data == "true") {
                this.toastr.success("Sucessfully Updated");
            }
            else {
                this.toastr.error("Error occured please try again");
            }
            this.sendMessage('stop');
        });
    }
}

@Component({
    selector: 'dialog-add-edit-product',
    templateUrl: 'dialog-add-edit-product.html',
})
export class DialogAddEditProduct {

    constructor(
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

    ngOnInit() {
        console.log('data====>', this.data);
        this.memRefNo = this.data.memRefNo;
        this.docTypeId = this.data.itemId;
        this.item = this.data.item;
        this.selectedfileType = this.data.docType;
        this.itemContent = this.data.docTypeTextUrl;
        this.docTypeName = this.data.docTypeName;
        if(this.selectedfileType == "doc"){
            this.selectedDocName = this.data.docTypeName;
        }
        this.itemDocId = this.data.itemDocId;
    }

    fileType: ItemType[] = [
        { key: 'doc', value: 'doc' },
        { key: 'text', value: 'text' },
        { key: 'video', value: 'video' },
        { key: 'image', value: 'image' }
    ];

    docName: DocName[] = [
        { key: 'tds', value: 'tds' },
        { key: 'liturature', value: 'liturature' },
        { key: 'sds', value: 'sds' }
    ];

    onFileSelected(event) {
        this.SelectedFile = <File>event.target.files[0];
        console.log('selected file',this.SelectedFile);
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave() {

        if (this.selectedfileType == "doc" || this.selectedfileType == "image") {
            if ((this.itemContent == undefined || this.itemContent == ' ' || this.itemContent == null) && (this.SelectedFile == undefined || this.SelectedFile == null)) {
                this.toastr.error('Please Select The Image/Doc File');
                return;
            }
        }

        const fd = new FormData();
        if (this.selectedfileType == "doc" || this.selectedfileType == "image") {
            if (this.SelectedFile != undefined && this.SelectedFile != null) {
                fd.append('FileName', this.SelectedFile.name);
                fd.append('image', this.SelectedFile, this.SelectedFile.name);
            }
        } else {
            fd.append('DocDetailsUrl', this.itemContent);
        }
        fd.append('memRefNo', this.memRefNo);
        fd.append('ItemDocId', this.itemDocId.toString());
        fd.append('DocType', this.selectedfileType);
        if(this.selectedfileType == "doc"){
            fd.append('DocName', this.selectedDocName);
        }else if(this.selectedfileType == "image"){
            fd.append('DocName', this.SelectedFile.name);
        }else if(this.selectedfileType == "video"){
            fd.append('DocName', "video");
        }else if(this.selectedfileType == "text"){
            fd.append('DocName', "details");
        }
       
        fd.append('Item', this.item);
        console.log('this.memRefNo===>', this.memRefNo)
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
        private MailConfigService: MailConfigService,
        private toastr: ToastrService,
        private router: Router,
        public dialogRef: MatDialogRef<DeleteItemDocdialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(memRefNo, itemDocId): void {

        this.MailConfigService.DeleteItemDocByID(memRefNo, itemDocId).subscribe(res => {
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
