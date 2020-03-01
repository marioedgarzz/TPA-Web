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
}
