import { Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard';
import { UserListComponent } from './user-list/user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserAddComponent } from './user-add/user-add.component';
import { LoginComponent } from './login/login.component';
import { AddconfigComponent } from './addconfig/addconfig.component';
import { addsafiltersortComponent } from './addsafiltersort/addsafiltersort.component';
import { LogoUploadComponent } from './user-management/logo-upload/logo-upload.component';
import { MailboxConfigComponent } from './user-management/mailbox-config/mailbox-config.component';
import { ProcessConfigComponent } from './user-management/process-config/process-config.component';
import { UserconfiglistComponent } from './user-management/userconfiglist/userconfiglist.component';
import { safiltersortlistComponent } from './user-management/safiltersortlist/safiltersortlist.component';
import { AddmailtemplateComponent } from './addmailtemplate/addmailtemplate.component';
import { MailtemplatelistComponent } from './user-management/mailtemplatelist/mailtemplatelist.component';
import { AddColorConfigComponent } from './add-color-config/add-color-config.component';
import { HeaderlinksComponent } from './user-management/headerlinks/headerlinks.component';
import { ActivitylogComponent } from './activitylog/activitylog.component';
import { dynamicpagelistComponent } from './user-management/dynamicpagelist/dynamicpagelist.component';
import { adddynamicpageComponent } from './adddynamicpage/adddynamicpage.component';
import { productlistComponent } from './productdetails/productlist.component';
import { addproductComponent } from './productdetails/addproduct.component';
import { productBulkUploadComponent } from './productdetails/bulkproductlist.component';
import { AddBannersComponent } from './user-management/Add-Banners/Add-Banners.component';
import { DeleteCacherComponent } from './user-management/delete-cacher/delete-cacher.component';
import { ManufacturerlistComponent } from './manufacturerlist/manufacturerlist.component';
export const appRoutes: Routes = [
    // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'userlist/:userType', component: UserListComponent, canActivate: [AuthGuard]
    },
    {
        path: 'useradd/:id/:userType', component: UserAddComponent, canActivate: [AuthGuard]
    },
    {
        path: 'mailboxconfig/:id/:memRefNo/:userType', component: MailboxConfigComponent, canActivate: [AuthGuard]
    },
    {
        path: 'processconfig/:id/:memRefNo/:userType', component: ProcessConfigComponent, canActivate: [AuthGuard]
    },
    {
        path: 'webdesign/:id/:memRefNo/:userType', component: LogoUploadComponent, canActivate: [AuthGuard]
    },
    {
        path: 'addwebdesign/:id/:memRefNo/:userType', component: AddColorConfigComponent, canActivate: [AuthGuard]
    },
    {
        path: 'websiteconfigurations/:id/:memRefNo/:userType', component: UserconfiglistComponent, canActivate: [AuthGuard]
    },
    {
        path: 'mailtemplate/:id/:memRefNo/:userType', component: MailtemplatelistComponent, canActivate: [AuthGuard]
    },
    {
        path: 'dynamicpages/:id/:memRefNo/:userType', component: dynamicpagelistComponent, canActivate: [AuthGuard]
    },
    {
        path: 'productlist/:id/:memRefNo/:userType', component: productlistComponent, canActivate: [AuthGuard]
    },
    {
        path: 'manufacturerlist/:id/:memRefNo/:userType', component: ManufacturerlistComponent, canActivate: [AuthGuard]
    },
    {
        path: 'productbulkupload/:id/:memRefNo/:userType', component: productBulkUploadComponent, canActivate: [AuthGuard]
    },
    {
        path: 'headerlinks/:id/:memRefNo/:userType', component: HeaderlinksComponent, canActivate: [AuthGuard]
    },
    {
        path: 'homebanners/:id/:memRefNo/:userType', component: AddBannersComponent, canActivate: [AuthGuard]
    },
    {
        path: 'activitylogs/:id/:memRefNo/:userType', component: ActivitylogComponent, canActivate: [AuthGuard]
    },
    {
        path: 'safilterssort/:id/:memRefNo/:userType', component: safiltersortlistComponent, canActivate: [AuthGuard]
    },
    {
        path: 'deletecacher/:id/:memRefNo/:userType', component: DeleteCacherComponent, canActivate: [AuthGuard]
    },
    {
        path: 'addconfig/:id/:memRefNo/:userType', component: AddconfigComponent, canActivate: [AuthGuard]
    },
    {
        path: 'addmailtemplate/:id/:memRefNo/:userType', component: AddmailtemplateComponent, canActivate: [AuthGuard]
    },
    {
        path: 'adddynamicpage/:id/:memRefNo/:userType/:activeTab', component: adddynamicpageComponent, canActivate: [AuthGuard]
    },
    {
        path: 'addproduct/:id/:memRefNo/:itemId', component: addproductComponent, canActivate: [AuthGuard]
    },
    {
        path: 'addsafiltersort/:id/:memRefNo/:itemId', component: addsafiltersortComponent, canActivate: [AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
]