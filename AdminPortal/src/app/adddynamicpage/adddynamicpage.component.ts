import { Component, OnInit, ChangeDetectorRef,Pipe,PipeTransform  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailConfigService } from '../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../services/loading.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';



@Component({  
  selector: 'app-adddynamicpage',
  templateUrl: './adddynamicpage.component.html',
  styleUrls: ['./adddynamicpage.component.css']
})

export class adddynamicpageComponent implements OnInit ,PipeTransform {
  memRefNo: string;
  Mailtemplate:any;
  
  cid: number;
  uid:any;
  constructor(private sanitizer: DomSanitizer,private route: ActivatedRoute, private MailConfigService:MailConfigService,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) { }
  cleanURL(oldURL: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
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

  ngOnInit() {
    
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.cid = parseInt(this.route.snapshot.paramMap.get('userType'));
    this.uid = parseInt(this.route.snapshot.paramMap.get('id'));    
    
    if(this.cid>0){
      this.sendMessage('start');
    this.MailConfigService.GetdynamicpageByID(this.memRefNo,this.cid).subscribe((data: any) => {
      this.Mailtemplate = data;      
      this.sendMessage('stop');   
    });
  }
  else{
    this.Mailtemplate=[];
    this.Mailtemplate.PageName='';
    this.Mailtemplate.PageTitle='';
    this.Mailtemplate.PageDescription='';
    this.Mailtemplate.PageKeywords='';
    this.Mailtemplate.PageContent='';
  }
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  OnSubmit(form: NgForm) {    
    this.sendMessage('start');
    var getmodel={
      "memRefNo":this.memRefNo,
      "PageID":this.Mailtemplate.PageID,
      "PageName":form.value.PageName,
      "PageTitle":form.value.PageTitle,
      "PageDescription":form.value.PageDescription,
      "PageKeywords":form.value.PageKeywords,
      "PageContent":form.value.PageContent,
    }
    this.MailConfigService.Updatedynamicpage(getmodel).subscribe((data: any) => {
      if (data == true || data == "true") {
        form.resetForm();
        this.toastr.success("Sucessfully Updated");
        // this.router.navigate(['/userlist', 'Client']);
        localStorage.setItem('TabIndex', '6');
    this.router.navigate(['/manageuser',this.uid ,this.memRefNo, 'Client']);
      }
      else {
        this.toastr.error("Error occured please try again");
      }
      this.sendMessage('stop');
    });
  }
  back() {
    // this.router.navigate(['/userlist', 'Client']);
    localStorage.setItem('TabIndex', '6');
    this.router.navigate(['/manageuser',this.uid ,this.memRefNo, 'Client']);
  }

}
