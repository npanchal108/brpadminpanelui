export class User {
    UserID: number;
    Password: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Mobile: string;
    IsActive: boolean = true;
    IsLocked: boolean = false;
    LastUpdatedBy: number;
    type: string;
    ButtenText: string = "Submit";
    MemberRefNo: string;
    HostName: string;
    ProjectTypeID:number;
    ApiUserName:string;
    ApiPassword:string;
    CompanyID:string;
    ApiEndPoint:string;
    NotificationEmails:string;
}
