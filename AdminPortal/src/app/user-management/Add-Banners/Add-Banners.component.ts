import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MailConfigService } from '../../services/mailbox-config.service.';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { UserprocesstimeService } from '../../shared/userprocesstime.service';


@Component({
  selector: 'app-Add-Banners',
  templateUrl: './Add-Banners.component.html',
  styleUrls: ['./Add-Banners.component.css']
})
export class AddBannersComponent implements OnInit {
  SelectedFile:File=null;
  Bannerlist:any;
  Banner:any;
  id:any;
  memRefNo:any;
  userType:any;
  showtype:any;
  BannerId:any;
  Title:any;
  Description:any;
  ImageUrl:any;
  IsActive:any;
  targeturl:any;
  types:any='home';
  linkname:any;
  constructor(private route: ActivatedRoute,private userprocesstimeService: UserprocesstimeService, private MailConfigService:MailConfigService,  private toastr: ToastrService,private router: Router, private loadingService: LoadingService, private changeDetectorRef:ChangeDetectorRef) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.memRefNo = this.route.snapshot.paramMap.get('memRefNo');
    this.userType = this.route.snapshot.paramMap.get('userType');
this.GetAllBanners();
   }
   OnAddheaderlink(){
    this.showtype=2;
    this.BannerId=null;
    this.Title='';
    this.Description='';
    this.ImageUrl='';
    this.IsActive=true;
    this.targeturl='';
    //this.types='home';
    this.linkname='';
  }

   GetAllBanners(){
    this.showtype=1;
    this.sendMessage('start');
    this.userprocesstimeService.GetBannerListforClient(this.memRefNo).subscribe((data: any) => {
      this.Bannerlist = data;
      this.sendMessage('stop');   
    });
   }
   getBannerDetails(id){
    this.showtype=2;
    this.sendMessage('start');
    this.userprocesstimeService.GetBannerDetailsByID(this.memRefNo,id).subscribe((data: any) => {
      this.BannerId=data.BannerId;
      this.Title=data.Title;
      this.Description=data.Description;
      this.ImageUrl=data.ImageUrl;
      this.IsActive=data.IsActive;
      this.targeturl=data.targeturl;
      this.types=data.types;
      this.linkname=data.linkname;
      this.sendMessage('stop');   
    });
   }

   checkfile(){
     console.log('this.SelectedFile',this.SelectedFile);
   }
   onFileSelected(event){
    this.SelectedFile=<File>event.target.files[0];    
  }

   OnUpload(){
    //  if(this.Title==undefined || this.Title==''){
    //    this.toastr.error('Please Insert Title of the image')
    //    return;
    //  }
     if(this.types==undefined || this.types==null || this.types==''){
      this.toastr.error('Please Insert Type of the image')
      return;
    }
    //  else if(this.Description==undefined || this.Description==''){
    //   this.toastr.error('Please Insert Title of the Description')
    //   return;
    // }

    else if((this.ImageUrl==undefined || this.ImageUrl=='' || this.ImageUrl==null) && (this.SelectedFile==undefined || this.SelectedFile==null)){
      this.toastr.error('Please Select The Image File')
      return;
    }
    {
      
    this.sendMessage('start');
    const fd = new FormData();
    if(this.SelectedFile!=undefined && this.SelectedFile!=null){
      fd.append('FileName',this.SelectedFile.name);        
    fd.append('image',this.SelectedFile,this.SelectedFile.name);
    }
     fd.append('memRefNo',this.memRefNo);        
     fd.append('BannerId',this.BannerId);        
     fd.append('Title',this.Title);        
     fd.append('Description',this.Description);        
     fd.append('ImageUrl',this.ImageUrl);        
     fd.append('IsActive',this.IsActive);        
     fd.append('targeturl',this.targeturl);        
     fd.append('types',this.types);        
     fd.append('linkname',this.linkname);     
     console.log('Banner pages',fd);   
    this.userprocesstimeService.PostBannerImage(fd).subscribe((data: any) => {      
      this.sendMessage('stop');
      this.toastr.success(data.Message);      
      this.GetAllBanners();
    });
    this.sendMessage('stop');
  }
  }
  
  ngOnInit() {
   
  }
  sendMessage(message): void {
    //this.loadingService.LoadingMessage(message);
  }
  

}
