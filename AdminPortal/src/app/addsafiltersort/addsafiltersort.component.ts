import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailConfigService } from '../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../services/loading.service';



@Component({
  selector: 'app-addsafiltersort',
  templateUrl: './addsafiltersort.component.html',
  styleUrls: ['./addsafiltersort.component.css']
})
export class addsafiltersortComponent implements OnInit {
  memRefNo: string;

  Name: string = '';
  stype: number = 1;
  sorder: number = 999;
  cid: string;
  uid: any;
  ConfigId : number;
  constructor(private route: ActivatedRoute, private MailConfigService: MailConfigService, private toastr: ToastrService, private router: Router, private loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.cid = this.route.snapshot.paramMap.get('userType');
    this.uid = parseInt(this.route.snapshot.paramMap.get('id'));
    this.ConfigId = parseInt(this.route.snapshot.paramMap.get('itemId'));

    if (this.ConfigId != undefined && this.ConfigId != null && this.ConfigId > 0) {
      this.MailConfigService.Getsafiltersort(this.memRefNo, this.ConfigId).subscribe((data: any) => {
        var getdata = data;
        this.Name = getdata.Name;
        this.stype = getdata.stype;
        this.sorder = getdata.sorder;
      });
    }
  }

  OnSubmit(form: NgForm) {
    this.MailConfigService.Updatesafilterorder(this.memRefNo, this.ConfigId, this.Name, this.stype, this.sorder).subscribe((data: any) => {
      if (data == true || data == "true") {
        form.resetForm();
        this.toastr.success("Sucessfully Updated");
        this.router.navigate(['/safilterssort', this.uid, this.memRefNo, 'Client']);
      }
      else {
        this.toastr.error("Error occured please try again");
      }
    });
  }
  back() {
    this.router.navigate(['/safilterssort', this.uid, this.memRefNo, 'Client']);
  }

}
