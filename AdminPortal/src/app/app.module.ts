import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { LoadingModule } from 'ngx-loading';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { UserManagementComponent } from './user-management/user-management.component';
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
import { RecaptchaModule } from 'ng-recaptcha';
import { UserconfiglistComponent } from './user-management/userconfiglist/userconfiglist.component';
import { AddconfigComponent } from './addconfig/addconfig.component';
import { AddBannersComponent } from './user-management/Add-Banners/Add-Banners.component';
import { MailtemplatelistComponent } from './user-management/mailtemplatelist/mailtemplatelist.component';
import { AddmailtemplateComponent } from './addmailtemplate/addmailtemplate.component';
import { DeleteCacherComponent } from './user-management/delete-cacher/delete-cacher.component';
import { AddColorConfigComponent } from './add-color-config/add-color-config.component';
import { HeaderlinksComponent, Deleteheaderlinkdialog } from './user-management/headerlinks/headerlinks.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { Deletesafiltersort, safiltersortlistComponent } from './user-management/safiltersortlist/safiltersortlist.component';
import { addsafiltersortComponent } from './addsafiltersort/addsafiltersort.component';
import { ActivitylogComponent } from './activitylog/activitylog.component';
import { adddynamicpageComponent } from './adddynamicpage/adddynamicpage.component';
import { Deletedynamicpagedialog, dynamicpagelistComponent } from './user-management/dynamicpagelist/dynamicpagelist.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    DashboardComponent,
    UserAddComponent,
    DialogOverviewExampleDialog,
    UserManagementComponent,
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
    safiltersortlistComponent,
    addsafiltersortComponent,
    Deletesafiltersort,
    ActivitylogComponent,
    adddynamicpageComponent,
    dynamicpagelistComponent,
    Deletedynamicpagedialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    LoadingModule,
    NgxPaginationModule,
    RecaptchaModule.forRoot(),
    AngularDateTimePickerModule
  ],
  providers: [UserService, AuthGuard, MenuService, MailConfigService, LoadingService, CompanyProfileService, UserprocesstimeService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogOverviewExampleDialog,
    Deleteheaderlinkdialog,
    Deletesafiltersort,
    Deletedynamicpagedialog
  ]
})
export class AppModule { }
