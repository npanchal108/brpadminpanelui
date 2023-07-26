import { Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard';
import { UserListComponent } from './user-list/user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserManagementComponent } from './user-management/user-management.component';
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
        path: 'addconfig/:id/:memRefNo/:userType', component: AddconfigComponent, canActivate: [AuthGuard]
    },
    {
        path: 'addsafiltersort/:id/:memRefNo/:userType', component: addsafiltersortComponent, canActivate: [AuthGuard]
    },
    {
        path: 'addcolorconfig/:id/:memRefNo/:userType', component: AddColorConfigComponent, canActivate: [AuthGuard]
    },
    {
        path: 'addmailtemplate/:id/:memRefNo/:userType', component: AddmailtemplateComponent, canActivate: [AuthGuard]
    },
    {
        path: 'adddynamicpage/:id/:memRefNo/:userType', component: adddynamicpageComponent, canActivate: [AuthGuard]
    },
    {
        path: 'manageuser/:id/:memRefNo/:userType', component: UserManagementComponent, canActivate: [AuthGuard], children: [
            
            { path: 'logo-upload', component: LogoUploadComponent, canActivate:[AuthGuard] },
            { path: 'mailbox-config', component: MailboxConfigComponent, canActivate:[AuthGuard] },
            { path: 'process-config', component: ProcessConfigComponent, canActivate:[AuthGuard] },
            { path: 'userconfiglist', component: UserconfiglistComponent, canActivate:[AuthGuard] },            
            { path: 'safiltersortlist', component: safiltersortlistComponent, canActivate:[AuthGuard] },            
            { path: 'mailtemplatelist', component: MailtemplatelistComponent, canActivate:[AuthGuard] },
            { path: 'dynamicpagelist', component: dynamicpagelistComponent, canActivate:[AuthGuard] },
            { path: 'headerlinks', component: HeaderlinksComponent, canActivate:[AuthGuard] },
            { path: 'activitylog', component: ActivitylogComponent, canActivate:[AuthGuard] },
            
        ]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
]