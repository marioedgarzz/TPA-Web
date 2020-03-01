import { Component, OnInit, ElementRef } from '@angular/core';
import { UserStorageService } from 'src/app/services/user-storage.service';
declare const gapi: any;

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.scss']
})
export class GoogleSignInComponent implements OnInit {

  private clientId:string = '207299003848-on9jppihjpgda8arrb5nmshbktn4an8g.apps.googleusercontent.com';
  
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }
  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

        let profile = googleUser.getBasicProfile();
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());

        sessionStorage.setItem("jwt_token",googleUser.getAuthResponse().id_token);
        // localStorage.setItem("UserId","");
        UserStorageService.setCurrentUserEmail(profile.getEmail());
        // console.log(sessionStorage.getItem("jwt_token"));

        // window.location.reload();
        //code
        

      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
        UserStorageService.setCurrentUserEmail("error");
      });
  }

  constructor(private element: ElementRef) {
    console.log('ElementRef: ', this.element);
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  ngOnInit() {
  }

}
