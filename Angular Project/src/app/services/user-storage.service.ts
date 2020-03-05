import { Injectable } from '@angular/core';
import { parse } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public static getCurrentPreferredLanguage() : string{
    var str : string = localStorage.getItem("UserLanguage");
    if(str == undefined) {
      return ""
    }
    return str;
  }

  public static getCurrentGoogleKey() : string {
    var str : string = sessionStorage.getItem("googleId")
    if(str == undefined) return ""

    return str
  }

  public static setCurrentGoogleKey(googleId : string) {
    if(googleId == undefined) googleId = ""
    sessionStorage.setItem("googleId",googleId)
  }

  public static getCurrentFacebookKey() : string {
    var str : string = sessionStorage.getItem("facebookId")
    if(str == undefined) return ""

    return str
  }

  public static setCurrentFacebookKey(facebookId : string) {
    if(facebookId == undefined) facebookId = ""
    sessionStorage.setItem("facebookId",facebookId)
  }

  public static setCurrentPreferredLanguage(str : string) {
    localStorage.setItem("UserLanguage",str);
  }

  public static getCurrentPreferredCurrency() : string {
    var str : string = localStorage.getItem("UserCurrency");
    if(str == undefined) {
      return "";
    }
    return str;
  }

  public static setCurrentPreferredCurrency(str : string) {
    localStorage.setItem("UserCurrency",str);
  }

  public static getCurrentUserId() : number {
    var str: string = sessionStorage.getItem("UserId");
    if(str == "" || str == undefined) {
      return 0;
    }
    return parseInt(str);
  }

  public static setCurrentUserId(num : number) {
    sessionStorage.setItem("UserId",num + "");
  }

  public static logout() {
    sessionStorage.setItem("UserId","");
    sessionStorage.setItem("email","");
    sessionStorage.setItem("UserCurrency","");
    sessionStorage.setItem("UserLanguage","");
  }

  public static setCurrentUserEmail(str : string) {
    localStorage.setItem("email",str);
  }

  public static setCurrentEmailFbOrGoogle(str : string) {
    sessionStorage.setItem("emailGorF",str)
  }

  public static getCurrentEmailFbOrGoogle() {
    if(sessionStorage.getItem("emailGorF") == undefined) {
      return ""
    }
    return sessionStorage.getItem("emailGorF")
  }

  public static getCurrentUserEmail() {
    var str: string = localStorage.getItem("email");
    if(str == undefined) {
      return "";
    }
    return str;
  }

  public static getCurrentAdmin() : number{
    var str : string = sessionStorage.getItem("AdminId");

    return (str == undefined || str == "")? 0 : parseInt(str)
  }

  public static setCurrentAdmin(adminId : number) {
    sessionStorage.setItem("AdminId",adminId + "");
  }

  public static logoutCurrentAdmin() {
    sessionStorage.setItem("AdminId","");
  }

  public static getCurrentTransaction() {
    if(sessionStorage.getItem("transaction") == undefined) return ""
    return sessionStorage.getItem("transaction")
  }

  public static setCurrentTransaction(transaction : number) {
    sessionStorage.setItem("transaction",transaction + "");
  }


}
