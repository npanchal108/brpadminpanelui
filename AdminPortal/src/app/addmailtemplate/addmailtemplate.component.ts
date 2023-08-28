import { Component, OnInit, ChangeDetectorRef,Pipe,PipeTransform  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailConfigService } from '../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../services/loading.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '../../../node_modules/@angular/platform-browser';



@Component({  
  selector: 'app-addmailtemplate',
  templateUrl: './addmailtemplate.component.html',
  styleUrls: ['./addmailtemplate.component.css']
})

export class AddmailtemplateComponent implements OnInit ,PipeTransform {
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
    this.sendMessage('start');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.cid = parseInt(this.route.snapshot.paramMap.get('userType'));
    this.uid = parseInt(this.route.snapshot.paramMap.get('id'));    
    this.MailConfigService.getMailTemplate(this.memRefNo,this.cid).subscribe((data: any) => {
      this.Mailtemplate = data;      
      this.sendMessage('stop');   
    });
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  OnSubmit(form: NgForm) {    
    this.sendMessage('start');
    var getmodel={
      "memRefNo":this.memRefNo,
      "MailTemplateID":this.Mailtemplate.MailTemplateID,
      "MailTemplateContent":form.value.MailTemplateContent,
      "MailTemplateName":form.value.MailTemplateName,
      "MailTemplateSubject":form.value.MailTemplateSubject,
      "IsActive":form.value.IsActive,
      "MailType":form.value.MailType,
    }
    this.MailConfigService.UpdateMailTemplate(getmodel).subscribe((data: any) => {
      if (data == true || data == "true") {
        form.resetForm();
        this.toastr.success("Sucessfully Updated");
        this.router.navigate(['/manageuser',this.uid ,this.memRefNo, 'Client']);
      }
      else {
        this.toastr.error("Error occured please try again");
      }
      this.sendMessage('stop');
    });
  }
  back() {
    this.router.navigate(['/mailtemplate',this.uid ,this.memRefNo, this.cid]);
  }

}
