import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: any;
  userType: string;
  page: number = 1;
  totalPage: number;
  filteredUserList: any[] = [];
  searchText: string = '';

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private loadingService: LoadingService) {

    this.route.params.subscribe(params => {
      this.userType = this.route.snapshot.paramMap.get('userType');
      this.getUserList(this.page);
    });

  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  ngOnInit() {
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.getUserList(this.page);

  }

  getUserList(pageNo) {

    this.userService.getUsers(this.userType, pageNo).subscribe(res => {
      this.userList = res;
      this.filteredUserList = this.userList;
      try {
        this.totalPage = res[0].TotalPage;
      } catch (Ex) {
        this.totalPage = 1;
      }
    });

    return pageNo;
  }

  applyFilter() {
    this.filteredUserList = this.userList.filter(item => {
      return Object.values(item).some((value: any) =>
        value && value.toString().toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
    this.page = 1;
  }

  onSelect(userId) {
    this.router.navigate(['/useradd', userId, this.userType]);
  }

  OnAddUser(useid) {
    localStorage.setItem('UserId',useid );
    this.router.navigate(['/useradd', 0, this.userType]);
  }

  onManageUser(useid, memRefNo) {
    localStorage.setItem('UserId',useid );
    localStorage.setItem('UserType', this.userType);
    localStorage.setItem('MemRefNo', memRefNo);
    this.router.navigate(['/useradd', useid, this.userType]);
  }

  openDialog(userId): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUserList(this.page);
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private loadingService: LoadingService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  sendMessage(message): void {
    //this.loadingService.LoadingMessage(message);
  }
  onYesClick(userId): void {

    this.userService.deleteUser(userId).subscribe(res => {
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
