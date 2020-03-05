export class Users {
    UserId: number
    Username: string
    UserEmail: string
    UserPassword: string
    UserPhoneNumber: string
    UserCurrency : string
    UserLanguage : string
    UserCity : string
    UserAddress : string
    UserPostalCode : string
    UserTitle : string; //Mr. Mrs. Miss
    UserSubscription : boolean;
    UserGoogleKey : string;
    UserFacebookKey : string;
}

export class Admins {
    AdminId : number;
    AdminUsername : string;
    AdminPassword : string;
}