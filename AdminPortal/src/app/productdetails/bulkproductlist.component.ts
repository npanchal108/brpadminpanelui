import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailConfigService } from '../services/mailbox-config.service.';
import { ToastrService } from 'ngx-toastr';
import { CsvGeneratorService } from '../services/csvgenerator.service';
import { UserprocesstimeService } from '../../../src/app/shared/userprocesstime.service';
import { saveAs } from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';

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
    selectedUploadFolder: File | undefined;
    SelectedFile: File | undefined;
    fileDetails = [];
    constructor(private spinner: NgxSpinnerService, private userprocesstimeService: UserprocesstimeService, private csvGeneratorService: CsvGeneratorService, private route: ActivatedRoute, private toastr: ToastrService, private MailConfigService: MailConfigService) { }

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
            { Item: 'Item1', Type: 'doc', Name: 'Name of document', DocDetailsUrl: 'loaction/path of  pdf document',Sequence : 1},
            { Item: 'Item1', Type: 'text', Name: 'name you want', DocDetailsUrl: 'your text content',Sequence: 0},
            { Item: 'Item1', Type: 'video', Name: 'name you want', DocDetailsUrl: 'video embeded html content',Sequence: 0},
            { Item: 'Item1', Type: 'image', Name: 'name of your image', DocDetailsUrl: 'loaction/path of image',Sequence: 1},
        ];
        const filename = 'SampleProductDoc.csv';
        this.csvGeneratorService.generateCsv(data, filename);
    }
    generateManufacturerDocCsv() {
        const data = [
            { Manufacturer: 'Manufacturer1', Type: 'doc', Name: 'TDS/Literature', DocDetailsUrl: 'loaction/path of  pdf document',Sequence : 1 },
            { Manufacturer: 'Manufacturer2', Type: 'video', Name: 'name you want', DocDetailsUrl: 'video embeded html content',Sequence : 0 }
        ];
        const filename = 'SampleManufacturerDoc.csv';
        this.csvGeneratorService.generateCsv(data, filename);
    }
    OnManufacturerDocumentBulkUpload() {
        this.spinner.show();
        if ((this.selectedManufDocumentFile == undefined || this.selectedManufDocumentFile == null)) {
            this.toastr.error('Please Select The CSV File');
            this.spinner.hide();
            return;
        }
        else {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const contents = fileReader.result as string;
                const lines = contents.split('\n');
                const firstLine = lines[0].trim();
                const expectedHeader = 'Manufacturer,Type,Name,DocDetailsUrl,Sequence';
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
                } else {
                    this.toastr.error('Invalid column names in the CSV file.');
                    this.selectedManufDocumentFile = undefined;
                    this.fileManuDocListInput.nativeElement.value = '';
                    return;
                }
            };
            fileReader.readAsText(this.selectedManufDocumentFile);
            this.spinner.hide();
        }
    }
    OnItemDocumentBulkUpload() {
        this.spinner.show();
        if ((this.selectedProductDocumentFile == undefined || this.selectedProductDocumentFile == null)) {
            this.toastr.error('Please Select The CSV File');
            this.spinner.hide();
            return;
        }
        else {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const contents = fileReader.result as string;
                const lines = contents.split('\n');
                const firstLine = lines[0].trim();
                const expectedHeader = 'Item,Type,Name,DocDetailsUrl,Sequence';
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
                } else {
                    this.toastr.error('Invalid column names in the CSV file.');
                    this.selectedProductDocumentFile = undefined;
                    this.fileDocListInput.nativeElement.value = '';
                    return;
                }
            };
            fileReader.readAsText(this.selectedProductDocumentFile);
            this.spinner.hide();
        }
    }
    handleUploadFolderInput(event: any) {
        const files: FileList = event.target.files;
        if (files.length > 0) {
            const selectedFile: File = files[0];
            if (!selectedFile.name.endsWith('.zip')) {
                this.toastr.error('Please Select The zip File');
                event.target.value = '';
                return;
            }
            this.selectedUploadFolder = event.target.files[0];
        }

    }
    OnFolderUpload() {
        this.spinner.show();
        if ((this.selectedUploadFolder == undefined || this.selectedUploadFolder == null)) {
            this.toastr.error('Please Select The zip File');
            this.spinner.hide();
            return;
        } else {
            const fd = new FormData();
            if (this.selectedUploadFolder != undefined && this.selectedUploadFolder != null) {
                fd.append('FolderName', this.selectedUploadFolder.name);
                fd.append('file', this.selectedUploadFolder);
            }
            fd.append('memRefNo', this.memRefNo);

            this.userprocesstimeService.UploadFolder(fd).subscribe((data: any) => {
                this.toastr.success(data.Message);
                if (data.FileNames && data.FileNames.length > 0) {
                    console.log("File Names:", data.FileNames);
                    console.log("FolderPath:", data.FolderPath);
                    const csvContent = this.generateCsvContent(data.FileNames, data.FolderPath);
                    this.saveCsvFile(csvContent);

                    this.fileDetails = data.FileNames.map(fileName => ({
                        fileName: fileName,
                        filePath: `${data.FolderPath}/${fileName}`
                    }));
                }
            });
            this.spinner.hide();
        }
    }
    private generateCsvContent(fileNames: string[], folderPath: string): string {
        const header = 'File Name,URL\n';
        const rows = fileNames.map(fileName => `${fileName},${folderPath}/${fileName}\n`);
        return header + rows.join('');
    }

    private saveCsvFile(csvContent: string): void {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'fileList.csv');
    }

    OnItemPriceListBulkUpload() {
        this.spinner.show();
        if ((this.selectedProductPriceFile == undefined || this.selectedProductPriceFile == null)) {
            this.toastr.error('Please Select The CSV File');
            this.spinner.hide();
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
                } else {
                    this.toastr.error('Invalid column names in the CSV file.');
                    this.selectedProductPriceFile = undefined;
                    this.filePriceListInput.nativeElement.value = '';
                    return;
                }
            };
            fileReader.readAsText(this.selectedProductPriceFile);
            this.spinner.hide();
        }
    }
    handleItemPriceListFileInput(event) {
        this.selectedProductPriceFile = <File>event.target.files[0];
        if (this.selectedProductPriceFile) {
            if (!this.isCsvOrExcel(this.selectedProductPriceFile)) {
                this.toastr.error('Please select a valid CSV or Excel file.');
                return;
            } 
        }
    }
    handleItemDocumentFileInput(event) {
        this.selectedProductDocumentFile = <File>event.target.files[0];
        if (this.selectedProductDocumentFile) {
            if (!this.isCsvOrExcel(this.selectedProductDocumentFile)) {
                this.toastr.error('Please select a valid CSV or Excel file.');
                return;
            } 
        }
    }
    handleManufDocumentFileInput(event) {
        this.selectedManufDocumentFile = <File>event.target.files[0];
        if (this.selectedManufDocumentFile) {
            if (!this.isCsvOrExcel(this.selectedManufDocumentFile)) {
                this.toastr.error('Please select a valid CSV or Excel file.');
                return;
            } 
        }
    }

    isCsvOrExcel(file: File): boolean {
        const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        return allowedTypes.includes(file.type);
    }
}