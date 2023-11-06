import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailConfigService } from '../services/mailbox-config.service.';
import { ToastrService } from 'ngx-toastr';
import { CsvGeneratorService } from '../services/csvgenerator.service';

@Component({
    selector: 'app-productBulkUpload',
    templateUrl: './bulkproductlist.component.html',
    styleUrls: ['./productlist.component.css']
})
export class productBulkUploadComponent implements OnInit {
    @ViewChild('filePriceListInput') filePriceListInput: any;
    @ViewChild('fileDocListInput') fileDocListInput: any;
    @ViewChild('fileManuDocListInput') fileManuDocListInput: any;

    memRefNo: string;
    selectedProductPriceFile: File | undefined;
    selectedProductDocumentFile: File | undefined;
    selectedManufDocumentFile: File | undefined;

    constructor(private csvGeneratorService: CsvGeneratorService, private route: ActivatedRoute, private toastr: ToastrService, private MailConfigService: MailConfigService) { }

    ngOnInit() {
        this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    }

    generateProductPriceCsv() {
        const data = [
          { Item: 'Item1', Price: 28 },
          { Item: 'Item2', Price: 24 },
        ];
        const filename = 'SampleProductPrice.csv';
        this.csvGeneratorService.generateCsv(data, filename);
    }
    
    generateProductDocCsv() {
        const data = [
          { Item: 'Item1', Type: 'Doc',Name :'Name of document',DocDetailsUrl:'loaction/path of  pdf document' },
          { Item: 'Item1', Type: 'text',Name :'name you want',DocDetailsUrl:'your text content' },
          { Item: 'Item1', Type: 'video',Name :'name you want',DocDetailsUrl:'video embeded html content' },
          { Item: 'Item1', Type: 'image',Name :'name of your image',DocDetailsUrl:'loaction/path of image' },
        ];
        const filename = 'SampleProductDoc.csv';
        this.csvGeneratorService.generateCsv(data, filename);
    }
    generateManufacturerDocCsv(){
        const data = [
            { Manufacturer: 'Manufacturer1', Type: 'Doc',Name :'TDS/Litrature',DocDetailsUrl:'loaction/path of  pdf document' },
            { Manufacturer: 'Manufacturer2', Type: 'video',Name :'name you want',DocDetailsUrl:'video embeded html content' }
          ];
          const filename = 'SampleManufacturerDoc.csv';
          this.csvGeneratorService.generateCsv(data, filename);
    }
    OnManufacturerDocumentBulkUpload(){
        if ((this.selectedManufDocumentFile == undefined || this.selectedManufDocumentFile == null)) {
            this.toastr.error('Please Select The CSV File');
            return;
        }
        else {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const contents = fileReader.result as string;
                const lines = contents.split('\n');
                const firstLine = lines[0].trim();
                const expectedHeader = 'Manufacturer,Type,Name,DocDetailsUrl'; 
                if (firstLine === expectedHeader) {
                    const fd = new FormData();
                    if (this.selectedManufDocumentFile != undefined && this.selectedManufDocumentFile != null) {
                        fd.append('FileName', this.selectedManufDocumentFile.name);
                        fd.append('csv', this.selectedManufDocumentFile, this.selectedManufDocumentFile.name);
                    }
                    fd.append('memRefNo', this.memRefNo);
                    fd.append('IMType', 'True');
                    this.MailConfigService.UpdateItemDocumentList(fd).subscribe((data: any) => {
                        if (data == true || data == "true") {
                            this.toastr.success("Sucessfully Updated");
                        }
                        else {
                            this.toastr.error("Error occured please try again");
                        }
                        this.selectedManufDocumentFile = undefined;
                        this.fileManuDocListInput.nativeElement.value = '';
                    });
                } else{
                    this.toastr.error('Invalid column names in the CSV file.');
                    this.selectedManufDocumentFile = undefined;
                    this.fileManuDocListInput.nativeElement.value = '';
                    return;
                }
            };
            fileReader.readAsText(this.selectedManufDocumentFile);
        }
    }
    OnItemDocumentBulkUpload() {
        if ((this.selectedProductDocumentFile == undefined || this.selectedProductDocumentFile == null)) {
            this.toastr.error('Please Select The CSV File');
            return;
        }
        else {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const contents = fileReader.result as string;
                const lines = contents.split('\n');
                const firstLine = lines[0].trim();
                const expectedHeader = 'Item,Type,Name,DocDetailsUrl'; 
                if (firstLine === expectedHeader) {
                    const fd = new FormData();
                    if (this.selectedProductDocumentFile != undefined && this.selectedProductDocumentFile != null) {
                        fd.append('FileName', this.selectedProductDocumentFile.name);
                        fd.append('csv', this.selectedProductDocumentFile, this.selectedProductDocumentFile.name);
                    }
                    fd.append('memRefNo', this.memRefNo);
                    fd.append('IMType', 'False');
                    this.MailConfigService.UpdateItemDocumentList(fd).subscribe((data: any) => {
                        if (data == true || data == "true") {
                            this.toastr.success("Sucessfully Updated");
                        }
                        else {
                            this.toastr.error("Error occured please try again");
                        }
                        this.selectedProductDocumentFile = undefined;
                        this.fileDocListInput.nativeElement.value = '';
                    });
                } else{
                    this.toastr.error('Invalid column names in the CSV file.');
                    this.selectedProductDocumentFile = undefined;
                    this.fileDocListInput.nativeElement.value = '';
                    return;
                }
            };
            fileReader.readAsText(this.selectedProductDocumentFile);
        }
    }
    OnItemPriceListBulkUpload() {
        if ((this.selectedProductPriceFile == undefined || this.selectedProductPriceFile == null)) {
            this.toastr.error('Please Select The CSV File');
            return;
        }
        else {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const contents = fileReader.result as string;
                const lines = contents.split('\n');
                const firstLine = lines[0].trim();
                const expectedHeader = 'Item,Price'; 

                if (firstLine === expectedHeader) {
                    const fd = new FormData();
                    if (this.selectedProductPriceFile != undefined && this.selectedProductPriceFile != null) {
                        fd.append('FileName', this.selectedProductPriceFile.name);
                        fd.append('csv', this.selectedProductPriceFile, this.selectedProductPriceFile.name);
                    }
                    fd.append('memRefNo', this.memRefNo);
                    this.MailConfigService.UpdateItemPriceBulk(fd).subscribe((data: any) => {
                        if (data == true || data == "true") {
                            this.toastr.success("Sucessfully Updated");
                        }
                        else {
                            this.toastr.error("Error occured please try again");
                        }
                        this.selectedProductPriceFile = undefined;
                        this.filePriceListInput.nativeElement.value = '';
                    });
                } else{
                    this.toastr.error('Invalid column names in the CSV file.');
                    this.selectedProductPriceFile = undefined;
                    this.filePriceListInput.nativeElement.value = '';
                    return;
                }
            };
            fileReader.readAsText(this.selectedProductPriceFile);
        }
    }
    handleItemPriceListFileInput(event) {
        this.selectedProductPriceFile = <File>event.target.files[0];
    }
    handleItemDocumentFileInput(event) {
        this.selectedProductDocumentFile = <File>event.target.files[0];
    }
    handleManufDocumentFileInput(event) {
        this.selectedManufDocumentFile = <File>event.target.files[0];
    }
}