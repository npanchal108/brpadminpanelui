import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoadingService } from '../../app/services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SeomanagementService } from '../../app/services/seomanagement.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as XLSX from "xlsx";
import * as Papa from 'papaparse';

@Component({
  selector: 'app-seomanagement',
  templateUrl: './seomanagement.component.html',
  styleUrls: ['./seomanagement.component.css']
})
export class SeomanagementComponent {
  memRefNo: string;
  userType: string;
  id: string;
  treeNodePage: number = 1;
  treeNodeTotalPage: number;
  itemPage: number = 1;
  itemTotalPage: number;
  prodLinePage: number = 1;
  prodLineTotalPage: number;
  majclsPage: number = 1;
  majclsTotalPage: number;

  treeNodeMetaList: any = [];
  filteredTreeNodeMetaList: any = [];

  itemMetaList: any = [];
  filteredItemMetaList: any = [];

  prodLineMetaList: any = [];
  filteredProdLineMetaList: any = [];

  majclsMetaList: any = [];
  filteredMajclsetaList: any = [];

  searchTreeNodeQuery: string = '';
  searchItemQuery: string = '';
  searchProdLineQuery: string = '';
  searchMajclsQuery: string = '';

  sortedColumn: string = '';
  ascending = true;
  currentTab: number = -1;
  selectedTabName: string;
  @ViewChild('tabGroup') tabGroup: any;

  ModuleName: string;
  MemRefNo: string;
  Seq: number;
  TitleTag: string;
  Meta: string;
  MetaDescription: string;
  Description: string;
  showtype: number = 1;
  updateMetaParam: any;

  allTreeNodeMetaList: any = [];
  allItemMetaList: any = [];
  allProdLineMetaList: any = [];
  allMajclsMetaList: any = [];

  selectedItTreeNodeImportFile: File | undefined;
  selectedItemImportFile: File | undefined;
  selectedProdLineImportFile: File | undefined;
  selectedMajClsImportFile: File | undefined;

  @ViewChild('treeNodeFileInput') treeNodeFileInput: ElementRef<HTMLInputElement>;
  @ViewChild('itemFileInput') itemFileInput: ElementRef<HTMLInputElement>;
  @ViewChild('prodLineFileInput') prodLineFileInput: ElementRef<HTMLInputElement>;
  @ViewChild('majClsFileInput') majClsFileInput: ElementRef<HTMLInputElement>;

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private SeomanagementService: SeomanagementService, private toastr: ToastrService, private router: Router, private loadingService: LoadingService) { }

  ngOnInit() {
    this.showtype = 1;
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.getTreeNodeMetaList(this.treeNodePage);
    this.getItemMetaList(this.itemPage);
    this.GetItProdLineMetaList(this.prodLinePage);
    this.getMajclsMetaList(this.majclsPage);
  }

  tabChanged(event: MatTabChangeEvent) {
    if (this.showtype == 1) {
      this.currentTab = event.index
      this.selectedTabName = this.tabGroup._tabs._results[this.currentTab].textLabel;
      this.sortedColumn = '';
      this.ascending = true;
    }
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit this.currentTab', this.currentTab);
    this.currentTab = this.tabGroup.selectedIndex;
    this.selectedTabName = this.tabGroup._tabs._results[this.currentTab].textLabel;
  }

  toggleSort(column: string) {
    if (this.sortedColumn === column) {
      this.ascending = !this.ascending;
    } else {
      this.sortedColumn = column;
      this.ascending = true;
    }
  }

  onEditMeta(moduleName, itemModel) {
    this.showtype = 2;
    this.Seq = itemModel.Seq;
    this.TitleTag = itemModel.TitleTag;
    this.Meta = itemModel.Meta;
    this.MetaDescription = itemModel.MetaDescription;
    this.Description = itemModel.Description;
    this.ModuleName = moduleName;
  }

  isCsvOrExcel(file: File): boolean {
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    return allowedTypes.includes(file.type);
  }

  CreateAndDownloadCsvFile(metaList, fileName) {
    let exportMetaData = metaList.map(({ TotalPage, ...rest }) => rest);
    const csvData = Papa.unparse(exportMetaData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  ExportToExcell(moduleName) {
    switch (moduleName) {
      case 'treenode':
        this.spinner.show();
        this.SeomanagementService.GetAllItNodeTreeMetaList(this.memRefNo).subscribe((data: any) => {
          this.allTreeNodeMetaList = data;
          if (this.allTreeNodeMetaList != undefined && this.allTreeNodeMetaList != null && this.allTreeNodeMetaList.length > 0) {
            this.CreateAndDownloadCsvFile(this.allTreeNodeMetaList, 'ItTreeNodeMeta.csv');
            this.spinner.hide();
          }
          else {
            this.toastr.info("There is nothing to export");
          }
        });
        break;
      case 'item':
        this.spinner.show();
        this.SeomanagementService.GetAllItemMetaList(this.memRefNo).subscribe((data: any) => {
          this.allItemMetaList = data;
          if (this.allItemMetaList != undefined && this.allItemMetaList != null && this.allItemMetaList.length > 0) {
            this.CreateAndDownloadCsvFile(this.allItemMetaList, 'itemMeta.csv');
            this.spinner.hide();
          }
          else {
            this.toastr.info("There is nothing to export");
          }
        });
        break;
      case 'prodline':
        this.spinner.show();
        this.SeomanagementService.GetAllProdLineMetaList(this.memRefNo).subscribe((data: any) => {
          this.allProdLineMetaList = data;
          if (this.allProdLineMetaList != undefined && this.allProdLineMetaList != null && this.allProdLineMetaList.length > 0) {
            this.CreateAndDownloadCsvFile(this.allProdLineMetaList, 'prodLineMeta.csv');
            this.spinner.hide();
          }
          else {
            this.toastr.info("There is nothing to export");
          }
        });
        break;
      case 'majcls':
        this.spinner.show();
        this.SeomanagementService.GetAllMajClsMetaList(this.memRefNo).subscribe((data: any) => {
          this.allMajclsMetaList = data;
          if (this.allMajclsMetaList != undefined && this.allMajclsMetaList != null && this.allMajclsMetaList.length > 0) {
            this.CreateAndDownloadCsvFile(this.allMajclsMetaList, 'majclsMeta.csv');
            this.spinner.hide();
          }
          else {
            this.toastr.info("There is nothing to export");
          }
        });
        break;
    }

  }

  onUpdateMeta() {
    let moduleName = this.ModuleName;
    this.updateMetaParam = {
      MemRefNo: this.memRefNo,
      Seq: this.Seq,
      TitleTag: this.TitleTag,
      Meta: this.Meta,
      MetaDescription: this.MetaDescription,
      Description: this.Description
    };
    switch (moduleName) {
      case 'treenode':
        this.spinner.show();
        this.SeomanagementService.UpdateTreeNodeMetaDetails(this.updateMetaParam).subscribe((data: any) => {
          if (data == true) {
            this.showtype = 1;
            this.toastr.success("Meta details updated successfully");
            this.getTreeNodeMetaList(1);
          } else {
            this.toastr.error(data);
          }
          this.spinner.hide();
        });
        break;
      case 'item':
        this.spinner.show();
        this.SeomanagementService.UpdateItemMeta(this.updateMetaParam).subscribe((data: any) => {
          if (data == true) {
            this.showtype = 1;
            this.toastr.success("Meta details updated successfully");
            this.getItemMetaList(1);
          } else {
            this.toastr.error(data.Message);
          }
          this.spinner.hide();
        });
        break;
      case 'prodline':
        this.spinner.show();
        this.SeomanagementService.UpdateProdlineMeta(this.updateMetaParam).subscribe((data: any) => {
          if (data == true) {
            this.showtype = 1;
            this.toastr.success("Meta details updated successfully");
            this.GetItProdLineMetaList(1);
          } else {
            this.toastr.error(data.Message);
          }
          this.spinner.hide();
        });
        break;
      case 'majcls':
        this.spinner.show();
        this.SeomanagementService.UpdateItMajClsMeta(this.updateMetaParam).subscribe((data: any) => {
          if (data == true) {
            this.showtype = 1;
            this.toastr.success("Meta details updated successfully");
            this.getMajclsMetaList(1);
          } else {
            this.toastr.error(data.Message);
          }
          this.spinner.hide();
        });
        break;
    }
  }

  GoToBack() {
    this.showtype = 1;
  }

  //Tree Node Start
  getTreeNodeMetaList(pageNo: number): number {
    this.spinner.show();
    this.SeomanagementService.GetItNodeTreeMetaList(this.memRefNo, this.searchTreeNodeQuery, this.treeNodePage).subscribe((data: any) => {
      this.spinner.hide();
      this.treeNodeMetaList = data;
      this.filteredTreeNodeMetaList = this.treeNodeMetaList;
      try {
        this.treeNodeTotalPage = data[0].TotalPage;
      } catch (Ex) {
        this.treeNodeTotalPage = 1;
      }
      this.treeNodePage = pageNo;
    });
    return this.treeNodePage;
  }
  applyTreeNodeFilter() {
    if (this.searchTreeNodeQuery) {
      this.spinner.show();
      this.SeomanagementService.GetItNodeTreeMetaList(this.memRefNo, this.searchTreeNodeQuery, 1).subscribe((data: any) => {
        this.treeNodeMetaList = data;
        this.filteredTreeNodeMetaList = this.treeNodeMetaList;
        try {
          this.treeNodeTotalPage = data[0].TotalPage;
        } catch (Ex) {
          this.treeNodeTotalPage = 1;
        }
        this.spinner.hide();
        this.treeNodePage = 1;
        return this.treeNodePage;
      });
    } else {
      this.getTreeNodeMetaList(this.treeNodePage);
    }
  }

  treeNodePageChanged(event: number) {
    this.treeNodePage = event
    this.getTreeNodeMetaList(event);
  }

  onTreeNodeReset() {
    this.searchTreeNodeQuery = '';
    this.getTreeNodeMetaList(1);
  }

  OnItTreeNodeMetaBulkUpload() {
    this.spinner.show();
    if ((this.selectedItTreeNodeImportFile == undefined || this.selectedItTreeNodeImportFile == null)) {
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
        const expectedHeader = 'Seq,TreeNode,Description,Meta,TitleTag,MetaDescription';

        if (firstLine === expectedHeader) {
          const fd = new FormData();
          if (this.selectedItTreeNodeImportFile != undefined && this.selectedItTreeNodeImportFile != null) {
            fd.append('FileName', this.selectedItTreeNodeImportFile.name);
            fd.append('csv', this.selectedItTreeNodeImportFile, this.selectedItTreeNodeImportFile.name);
          }
          fd.append('memRefNo', this.memRefNo);
          this.SeomanagementService.ImportItTreeNodeMetaData(fd).subscribe((data: any) => {
            if (data == true || data == "true") {
              this.getTreeNodeMetaList(1);
              this.toastr.success("Sucessfully Updated");
            }
            else {
              this.toastr.error("Error occured please try again");
            }
            this.selectedItTreeNodeImportFile = undefined;
            this.treeNodeFileInput.nativeElement.value = '';
          });
        } else {
          this.toastr.error('Invalid column names in the CSV file.');
          this.selectedItTreeNodeImportFile = undefined;
          this.treeNodeFileInput.nativeElement.value = '';
          return;
        }
      };
      fileReader.readAsText(this.selectedItTreeNodeImportFile);
      this.spinner.hide();
    }
  }

  openTreeNodeFileInput() {
    console.log('inside openTreeNodeFileInput');
    this.treeNodeFileInput.nativeElement.click();
  }

  onTreeNodeFileSelected(event: any) {
    this.selectedItTreeNodeImportFile = event.target.files[0];
    console.log('this.selectedItTreeNodeImportFile==>', this.selectedItTreeNodeImportFile)
    if (this.selectedItTreeNodeImportFile) {
      if (!this.isCsvOrExcel(this.selectedItTreeNodeImportFile)) {
        this.toastr.error('Please select a valid CSV file.');
        return;
      } else {
        this.OnItTreeNodeMetaBulkUpload();
      }
    }
  }
  // Tree Node End

  //Item Meta Start
  getItemMetaList(pageNo: number): number {
    this.spinner.show();
    this.SeomanagementService.GetItemMetaList(this.memRefNo, this.searchItemQuery, this.itemPage).subscribe((data: any) => {
      this.spinner.hide();
      this.itemMetaList = data;
      this.filteredItemMetaList = this.itemMetaList;
      try {
        this.itemTotalPage = data[0].TotalPage;
      } catch (Ex) {
        this.itemTotalPage = 1;
      }
      this.itemPage = pageNo;
    });
    return this.itemPage;
  }

  itemPageChanged(event: number) {
    this.itemPage = event
    this.getItemMetaList(event);
  }

  onItemReset() {
    this.searchItemQuery = '';
    this.getItemMetaList(1);
  }

  applyItemFilter() {
    if (this.searchItemQuery) {
      this.spinner.show();
      this.SeomanagementService.GetItemMetaList(this.memRefNo, this.searchItemQuery, 1).subscribe((data: any) => {
        this.itemMetaList = data;
        this.filteredItemMetaList = this.itemMetaList;
        try {
          this.itemTotalPage = data[0].TotalPage;
        } catch (Ex) {
          this.itemTotalPage = 1;
        }
        this.spinner.hide();
        this.itemPage = 1;
        return this.itemPage;
      });
    } else {
      this.getItemMetaList(this.itemPage);
    }
  }

  openItemFileInput() {
    this.itemFileInput.nativeElement.click();
  }
  onItemFileSelected(event: any) {
    this.selectedItemImportFile = event.target.files[0];
    if (this.selectedItemImportFile) {
      if (!this.isCsvOrExcel(this.selectedItemImportFile)) {
        this.toastr.error('Please select a valid CSV file.');
        return;
      } else {
        this.OnItemMetaBulkUpload();
      }
    }
  }
  OnItemMetaBulkUpload() {
    this.spinner.show();
    if ((this.selectedItemImportFile == undefined || this.selectedItemImportFile == null)) {
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
        const expectedHeader = 'Seq,Item,Description,Meta,TitleTag,MetaDescription';

        if (firstLine === expectedHeader) {
          const fd = new FormData();
          if (this.selectedItemImportFile != undefined && this.selectedItemImportFile != null) {
            fd.append('FileName', this.selectedItemImportFile.name);
            fd.append('csv', this.selectedItemImportFile, this.selectedItemImportFile.name);
          }
          fd.append('memRefNo', this.memRefNo);
          try {
            this.SeomanagementService.ImportItemMetaData(fd).subscribe((data: any) => {
              console.log('ImportItemMetaData==>',data)
              if (data == true) {
                this.toastr.success("Meta Data Sucessfully Updated");
                this.selectedItemImportFile = undefined;
                this.itemFileInput.nativeElement.value = '';
                this.getItemMetaList(1);
              }
              else {
                this.toastr.error("Error occured please try again");
                this.selectedItemImportFile = undefined;
                this.itemFileInput.nativeElement.value = '';
              }
            });
          }
          catch {
            this.toastr.error('Error occured please try again');
            this.selectedItemImportFile = undefined;
            this.itemFileInput.nativeElement.value = '';
            return;
          }
        } else {
          this.toastr.error('Invalid column names in the CSV file.');
          this.selectedItemImportFile = undefined;
          this.itemFileInput.nativeElement.value = '';
          return;
        }
      };
      fileReader.readAsText(this.selectedItemImportFile);
      this.spinner.hide();
    }
  }
  //Item Meta End

  //ProdLine Meta Start
  GetItProdLineMetaList(pageNo: number): number {
    this.spinner.show();
    this.SeomanagementService.GetItProdLineMetaList(this.memRefNo, this.searchProdLineQuery, this.prodLinePage).subscribe((data: any) => {
      this.spinner.hide();
      this.prodLineMetaList = data;
      this.filteredProdLineMetaList = this.prodLineMetaList;
      try {
        this.prodLineTotalPage = data[0].TotalPage;
      } catch (Ex) {
        this.prodLineTotalPage = 1;
      }
      this.prodLinePage = pageNo;
    });
    return this.prodLinePage;
  }

  applyProdLineFilter() {
    if (this.searchProdLineQuery) {
      this.spinner.show();
      this.SeomanagementService.GetItProdLineMetaList(this.memRefNo, this.searchProdLineQuery, 1).subscribe((data: any) => {
        this.prodLineMetaList = data;
        this.filteredProdLineMetaList = this.prodLineMetaList;
        try {
          this.prodLineTotalPage = data[0].TotalPage;
        } catch (Ex) {
          this.prodLineTotalPage = 1;
        }
        this.spinner.hide();
        this.prodLinePage = 1;
        return this.prodLinePage;
      });
    } else {
      this.GetItProdLineMetaList(this.prodLinePage);
    }
  }

  prodLinePageChanged(event: number) {
    this.prodLinePage = event
    this.GetItProdLineMetaList(event);
  }

  onProdLineReset() {
    this.searchProdLineQuery = '';
    this.GetItProdLineMetaList(1);
  }

  openProdLineInput() {
    this.prodLineFileInput.nativeElement.click();
  }
  onProdLineFileSelected(event: any) {
    console.log('inside onProdLineFileSelected');
    this.selectedProdLineImportFile = event.target.files[0];
    if (this.selectedProdLineImportFile) {
      if (!this.isCsvOrExcel(this.selectedProdLineImportFile)) {
        this.toastr.error('Please select a valid CSV file.');
        return;
      } else {
        this.OnProdLineBulkUpload();
      }
    }
  }
  OnProdLineBulkUpload() {
    console.log('inside OnProdLineBulkUpload',this.selectedProdLineImportFile);
    this.spinner.show();
    if ((this.selectedProdLineImportFile == undefined || this.selectedProdLineImportFile == null)) {
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
        const expectedHeader = 'Seq,ProductLine,Description,Meta,TitleTag,MetaDescription';

        if (firstLine === expectedHeader) {
          const fd = new FormData();
          if (this.selectedProdLineImportFile != undefined && this.selectedProdLineImportFile != null) {
            fd.append('FileName', this.selectedProdLineImportFile.name);
            fd.append('csv', this.selectedProdLineImportFile, this.selectedProdLineImportFile.name);
          }
          fd.append('memRefNo', this.memRefNo);
          this.SeomanagementService.ImportProdLineMetaData(fd).subscribe((data: any) => {
            if (data == true) {
              this.toastr.success("Meta Data Sucessfully Updated");
              this.selectedProdLineImportFile = undefined;
              this.prodLineFileInput.nativeElement.value = '';
              this.GetItProdLineMetaList(1);
            }
            else {
              this.toastr.error("Error occured please try again");
              this.selectedProdLineImportFile = undefined;
              this.prodLineFileInput.nativeElement.value = '';
            }
          });
        } else {
          this.toastr.error('Invalid column names in the CSV file.');
          this.selectedProdLineImportFile = undefined;
          this.prodLineFileInput.nativeElement.value = '';
          return;
        }
      };
      fileReader.readAsText(this.selectedProdLineImportFile);
      this.spinner.hide();
    }
  }
  //ProdLine Meta End

  //Majcls Meta Start
  getMajclsMetaList(pageNo: number): number {
    this.spinner.show();
    this.SeomanagementService.GetMajclsMetaList(this.memRefNo, this.searchMajclsQuery, this.majclsPage).subscribe((data: any) => {
      this.spinner.hide();
      this.majclsMetaList = data;
      this.filteredMajclsetaList = this.majclsMetaList;
      try {
        this.majclsTotalPage = data[0].TotalPage;
      } catch (Ex) {
        this.majclsTotalPage = 1;
      }
      this.majclsTotalPage = pageNo;
    });
    return this.majclsTotalPage;
  }

  applyMajclsFilter() {
    if (this.searchMajclsQuery) {
      this.spinner.show();
      this.SeomanagementService.GetMajclsMetaList(this.memRefNo, this.searchMajclsQuery, 1).subscribe((data: any) => {
        this.majclsMetaList = data;
        this.filteredMajclsetaList = this.majclsMetaList;
        try {
          this.majclsTotalPage = data[0].TotalPage;
        } catch (Ex) {
          this.majclsTotalPage = 1;
        }
        this.spinner.hide();
        this.majclsPage = 1;
        return this.majclsPage;
      });
    } else {
      this.getMajclsMetaList(this.majclsPage);
    }
  }

  majclsPageChanged(event: number) {
    this.majclsPage = event
    this.getMajclsMetaList(event);
  }

  onMajclsReset() {
    this.searchMajclsQuery = '';
    this.getMajclsMetaList(1);
  }

  openMajClsFileInput() {
    this.majClsFileInput.nativeElement.click();
  }
  onMajClsFileSelected(event: any) {
    console.log('inside onMajClsFileSelected');
    this.selectedMajClsImportFile = event.target.files[0];
    if (this.selectedMajClsImportFile) {
      if (!this.isCsvOrExcel(this.selectedMajClsImportFile)) {
        this.toastr.error('Please select a valid CSV file.');
        return;
      } else {
        this.OnMajClsBulkUpload();
      }
    }
  }
  OnMajClsBulkUpload() {
    console.log('inside OnProdLineBulkUpload',this.selectedMajClsImportFile);
    this.spinner.show();
    if ((this.selectedMajClsImportFile == undefined || this.selectedMajClsImportFile == null)) {
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
        const expectedHeader = 'Seq,ItMajClass,Description,Meta,TitleTag,MetaDescription';

        if (firstLine === expectedHeader) {
          const fd = new FormData();
          if (this.selectedMajClsImportFile != undefined && this.selectedMajClsImportFile != null) {
            fd.append('FileName', this.selectedMajClsImportFile.name);
            fd.append('csv', this.selectedMajClsImportFile, this.selectedMajClsImportFile.name);
          }
          fd.append('memRefNo', this.memRefNo);
          this.SeomanagementService.ImportMajClsMetaData(fd).subscribe((data: any) => {
            if (data == true || data == "true") {
              this.toastr.success("Meta Data Sucessfully Updated");
              this.selectedMajClsImportFile = undefined;
              this.majClsFileInput.nativeElement.value = '';
              this.getMajclsMetaList(1);
            }
            else {
              this.toastr.error("Error occured please try again");
              this.selectedMajClsImportFile = undefined;
              this.majClsFileInput.nativeElement.value = '';
            }
            this.selectedMajClsImportFile = undefined;
            this.majClsFileInput.nativeElement.value = '';
          });
        } else {
          this.toastr.error('Invalid column names in the CSV file.');
          this.selectedMajClsImportFile = undefined;
          this.majClsFileInput.nativeElement.value = '';
          return;
        }
      };
      fileReader.readAsText(this.selectedMajClsImportFile);
      this.spinner.hide();
    }
  }
  //Majcls Meta End
}
