import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { UserService } from './shared/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { UserListComponent, DialogOverviewExampleDialog } from './user-list/user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserAddComponent } from './user-add/user-add.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MenuService } from './services/menu.service';
import { CompanyProfileService } from './services/company-profile.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MailboxConfigComponent } from './user-management/mailbox-config/mailbox-config.component';
import { MailConfigService } from './services/mailbox-config.service.';
import { LoadingService } from './services/loading.service';
import { ProcessConfigComponent } from './user-management/process-config/process-config.component';
import { UserprocesstimeService } from '../app/shared/userprocesstime.service';
import { LogoUploadComponent } from './user-management/logo-upload/logo-upload.component';
import { UserconfiglistComponent } from './user-management/userconfiglist/userconfiglist.component';
import { AddconfigComponent } from './addconfig/addconfig.component';
import { AddBannersComponent } from './user-management/Add-Banners/Add-Banners.component';
import { MailtemplatelistComponent } from './user-management/mailtemplatelist/mailtemplatelist.component';
import { AddmailtemplateComponent } from './addmailtemplate/addmailtemplate.component';
import { DeleteCacherComponent } from './user-management/delete-cacher/delete-cacher.component';
import { AddColorConfigComponent } from './add-color-config/add-color-config.component';
import { HeaderlinksComponent, Deleteheaderlinkdialog } from './user-management/headerlinks/headerlinks.component';
// import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { addsafiltersortComponent } from './addsafiltersort/addsafiltersort.component';
import { ActivitylogComponent } from './activitylog/activitylog.component';
import { adddynamicpageComponent } from './adddynamicpage/adddynamicpage.component';
import { Deletedynamicpagedialog, dynamicpagelistComponent } from './user-management/dynamicpagelist/dynamicpagelist.component';
import { productlistComponent } from './productdetails/productlist.component';
import { addproductComponent,DialogAddEditProduct,DeleteItemDocdialog } from './productdetails/addproduct.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { productBulkUploadComponent } from './productdetails/bulkproductlist.component';
import { CsvGeneratorService } from './services/csvgenerator.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { OrderByPipe } from './user-management/dynamicpagelist/orderBy.pipe';
import { ManufacturerlistComponent } from './manufacturerlist/manufacturerlist.component';
import { DialogAddEditManufracturerItemDoc } from './manufacturerlist/manufacturerlist.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    DashboardComponent,
    UserAddComponent,
    DialogOverviewExampleDialog,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    MailboxConfigComponent,
    ProcessConfigComponent,
    LogoUploadComponent,
    UserconfiglistComponent,
    AddconfigComponent,
    AddBannersComponent,
    MailtemplatelistComponent,
    AddmailtemplateComponent,
    DeleteCacherComponent,
    AddColorConfigComponent,
    HeaderlinksComponent,
    Deleteheaderlinkdialog,
    addsafiltersortComponent,
    ActivitylogComponent,
    adddynamicpageComponent,
    dynamicpagelistComponent,
    Deletedynamicpagedialog,
    productlistComponent,
    addproductComponent,
    DialogAddEditProduct,
    DeleteItemDocdialog,
    productBulkUploadComponent,
    OrderByPipe,
    ManufacturerlistComponent,
    DialogAddEditManufracturerItemDoc
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Display time in milliseconds
      positionClass: 'toast-top-right', // Position on the screen
      preventDuplicates: true, // Prevent duplicate toasts
    }),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    NgxPaginationModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSidenavModule, NgIf, MatButtonModule,
    MatMenuModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  providers: [DatePipe,UserService, AuthGuard, MenuService, MailConfigService, LoadingService, CompanyProfileService, UserprocesstimeService,CsvGeneratorService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  // entryComponents: [
  //   DialogOverviewExampleDialog,
  //   Deleteheaderlinkdialog,
  //   Deletesafiltersort,
  //   Deletedynamicpagedialog,
  //   DialogAddEditProduct,
  //   DeleteItemDocdialog
  // ]
})
export class AppModule { }
