import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map} from 'rxjs/operators';
import { Users, Admins} from '../models/types';
@Injectable({
  providedIn: 'root'
})
export class GraphqlUsersService {

  constructor(private apollo: Apollo) { }

  getUserEmailAndPhone(emailOrPhone : String) :Observable<Users[]>{
    return this.apollo.watchQuery<any> ({
      query: gql `
        query searchByUserEmailOrPhone($emailOrPhone : String){
          searchByUserEmailOrPhone(emailOrPhone: $emailOrPhone) {
            UserId
            Username
            UserPassword
          }
        }`,
        variables :{
          "emailOrPhone": emailOrPhone
        },
        fetchPolicy : "no-cache"
    }).valueChanges
      .pipe(
        map(result => result.data.searchByUserEmailOrPhone)
      );
  }

  createUser(username : String, userPassword: String, userPhoneNumber : String, userEmail : String,
    googleId : string, facebookId : string) : Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql `mutation createUser ($username: String, $userEmail : String, $userPassword: String,
        $userPhoneNumber: String, $googleId : String, $facebookId :String){
          createUser(Username : $username, UserEmail: $userEmail, 
        UserPassword : $userPassword, UserPhoneNumber: $userPhoneNumber,
        GoogleId : $googleId, FacebookId : $facebookId) {
          Username
        }
     }`,
      variables: {
          "username" : username,
          "userEmail" : userEmail,
          "userPassword" : userPassword,
          "userPhoneNumber" : userPhoneNumber,
          "googleId" : googleId,
          "facebookId" : facebookId
      }
    })
  }

  getUserById(id : number) : Observable<Users[]>{
    return this.apollo.watchQuery<any> ({
      query : gql`
        query getUserById($id : Int) {
          getUserById(id : $id) {
            Username
            UserEmail
            UserPhoneNumber
            UserCurrency
            UserLanguage
            UserCity
            UserPostalCode
            UserAddress
            UserTitle
            UserSubscription
            UserGoogleKey
            UserFacebookKey
          }
        }`,
        variables : {
          "id" : id
        },
    }).valueChanges
      .pipe(map(result => result.data.getUserById));
  }

  setUserCurrency(id : number, currency: string) : Observable<any>{
    return this.apollo.mutate<any>({
      mutation : gql `
        mutation setUserCurrency($userId : Int, $userCurrency : String) {
          setUserCurrency(UserId: $userId, UserCurrency : $userCurrency) {
            UserCurrency
          }
        }
      `,
      variables: {
        "userId" : id,
        "userCurrency" : currency,
      },
    })
  }

  setUserLanguage(id : number, language: string) : Observable<any>{
    return this.apollo.mutate<any>({
      mutation : gql `
        mutation setUserLanguage($userId : Int, $userLanguage : String) {
          setUserLanguage(UserId: $userId, UserLanguage : $userLanguage) {
            UserLanguage
          }
        }
      `,
      variables: {
        "userId" : id,
        "userLanguage" : language,
      },
    })
  }
  insertGoogleKey(userId : number,googleKey : string) {
    return this.apollo.mutate<any>({
      mutation : gql `
        mutation ($userId : Int, $googleKey : String){
          insertGoogleKey(UserId: $userId, GoogleKey : $googleKey) {
            UserAddress
          }
        }
      `,
      variables : {
        "userId" : userId,
        "googleKey" : googleKey
      }
    })
  }

  insertFacebookKey(userId : number,facebookKey : string) {
    return this.apollo.mutate<any>({
      mutation : gql `
        mutation ($userId : Int, $facebookKey : String){
          insertGoogleKey(UserId: $userId, FacebookKey : $facebookKey) {
            UserAddress
          }
        }
      `,
      variables : {
        "userId" : userId,
        "facebookKey" : facebookKey
      }
    })
  }

  subscribeNewsletter(userId : number) {
    return this.apollo.mutate<any>({
      mutation : gql `
        mutation ($userId : Int ){
          subscribeNewsletter(UserId : $userId) {
            UserSubscription
          }
        }
      `,
      variables : {
        "userId" : userId
      }
    })
  }

  getUserByFacebookKey(facebookKey : string) : Observable<Users[]> {
    return this.apollo.watchQuery<any>({
      query : gql `
        query getUserByFacebookKey($facebookKey : String){
          getUserByFacebookKey(FacebookKey : $facebookKey) {
            UserAddress
            UserCity
            UserCurrency
            UserEmail
            UserFacebookKey
            UserGoogleKey
            UserId
            UserLanguage
            UserPassword
            UserPhoneNumber
            UserPostalCode
            UserSubscription
            UserTitle
            Username
          }
        }
      `,
      variables : {
        "facebookKey" : facebookKey
      }
    }).valueChanges.pipe(
      map(res => res.data.getUserByFacebookKey)
    )
  }
  
  getUserByGoogleKey(googleKey : string) : Observable<Users[]> {
    return this.apollo.watchQuery<any>({
      query : gql `
        query getUserByGoogleKey($googleKey : String){
          getUserByGoogleKey(GoogleKey : $googleKey) {
            UserAddress
            UserCity
            UserCurrency
            UserEmail
            UserFacebookKey
            UserGoogleKey
            UserId
            UserLanguage
            UserPassword
            UserPhoneNumber
            UserPostalCode
            UserSubscription
            UserTitle
            Username
          }
        }
      `,
      variables : {
        "googleKey" : googleKey
      }
    }).valueChanges.pipe(
      map(res => res.data.getUserByGoogleKey)
    )
  }

  getAdminByUsernameAndPassword(Username : string, Password : string) : Observable<Admins[]> {
    return this.apollo.watchQuery<any>({
      query : gql `
        query getAdminByUsernameAndPassword($username : String, $password : String){
          getAdminByUsernameAndPassword(AdminUsername : $username,AdminPassword: $password) {
            AdminId
          }
        }
      `,
      variables : {
        "username" : Username,
        "password" : Password
      }
    }).valueChanges.pipe(map(result=>result.data.getAdminByUsernameAndPassword));
  }

  getAdminById(AdminId : number) : Observable<Admins[]> {
    return this.apollo.watchQuery<any>({
      query : gql `
        query getAdminById ($adminId : Int){
          getAdminById (AdminId : $adminId){
            AdminPassword
          }
        }
      `,
      variables : {
        "adminId" : AdminId,
      }
    }).valueChanges.pipe(map(result=>result.data.getAdminByUsernameAndPassword));
  }

  updateAccountUser(UserId : number, Username : string, UserTitle : string, UserAddress : string,
      UserPostalCode : string, UserCity : string) {
        return this.apollo.mutate<any>({
          mutation : gql `
            mutation updateAccountData ($userId : Int, $username : String, 
              $userTitle : String, $userAddress : String, $userPostalCode : String,
              $userCity : String){
              updateAccountData (UserId : $userId, Username : $username, UserTitle : $userTitle,
                UserCity : $userCity, UserAddress : $userAddress, 
                UserPostalCode : $userPostalCode) {
                  Username
              }
            }`,
            variables: {
                "userId": UserId,
                "username": Username,
                "userTitle": UserTitle,
                "userAddress": UserAddress,
                "userPostalCode" : UserPostalCode,
                "userCity" : UserCity
            }
        })
  }

}
