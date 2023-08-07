import { Component, OnInit, ChangeDetectorRef,Pipe,PipeTransform  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailConfigService } from '../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../services/loading.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

interface PageType {
  key: string;
  value: string;
}

@Component({  
  selector: 'app-adddynamicpage',
  templateUrl: './adddynamicpage.component.html',
  styleUrls: ['./adddynamicpage.component.css']
})

export class adddynamicpageComponent implements OnInit ,PipeTransform {
  memRefNo: string;
  Mailtemplate:any;
  SelectedFile:File=null;
  ImageUrl:any;
  cid: number;
  uid:any;

  pageType: PageType[] =  [  
    {key: 'blogs',value: 'blogs'},
    {key: 'info',value: 'info'},
    {key: 'our-lines',value: 'our-lines'},
    {key: 'services',value: 'services'}
  ];

  constructor(private sanitizer: DomSanitizer,private route: ActivatedRoute, private MailConfigService:MailConfigService,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) { }
  cleanURL(oldURL: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }

  checkfile(){
    console.log('this.SelectedFile',this.SelectedFile);
  }
  onFileSelected(event){
   this.SelectedFile=<File>event.target.files[0];    
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
    this.Mailtemplate.Sequence='';
  }
  }
  sendMessage(message): void {
    //this.loadingService.LoadingMessage(message);
  }
  OnSubmit(form: NgForm) {    
   
    if((this.Mailtemplate.imageurl ==undefined || this.Mailtemplate.imageurl ==' ' || this.Mailtemplate.imageurl==null) && (this.SelectedFile==undefined || this.SelectedFile==null)){
      this.toastr.error('Please Select The Image File');
      return;
    }

    this.sendMessage('start');
    const fd = new FormData();
    if(this.SelectedFile!=undefined && this.SelectedFile!=null){
      fd.append('FileName',this.SelectedFile.name);        
      fd.append('image',this.SelectedFile,this.SelectedFile.name);
    }
     fd.append('memRefNo',this.memRefNo);        
     fd.append('PageID',this.Mailtemplate.PageID);        
     fd.append('PageName',form.value.PageName);        
     fd.append('PageTitle',form.value.PageTitle);        
     fd.append('PageDescription',form.value.PageDescription);        
     fd.append('PageKeywords',form.value.PageKeywords);        
     fd.append('PageContent',form.value.PageContent);        
     fd.append('PageType',form.value.pageTypeOption);      
     fd.append('Sequence',form.value.Sequence);      
     
     this.MailConfigService.Updatedynamicpage(fd).subscribe((data: any) => {  
      this.sendMessage('stop');      
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
    });
  }
  back() {
    // this.router.navigate(['/userlist', 'Client']);
    localStorage.setItem('TabIndex', '6');
    this.router.navigate(['/manageuser',this.uid ,this.memRefNo, 'Client']);
  }

}