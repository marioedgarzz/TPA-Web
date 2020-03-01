import { Component, OnInit } from '@angular/core';
import { UserStorageService } from 'src/app/services/user-storage.service';

declare var FB: any;
@Component({
  selector: 'app-facebook-sign-in',
  templateUrl: './facebook-sign-in.component.html',
  styleUrls: ['./facebook-sign-in.component.scss']
})
export class FacebookSignInComponent implements OnInit {

  imgPath: string;

  constructor() { }
  ngOnInit() {
    FB.init({
      appId: '510524692939439',
      cookie: false,
      xfbml: true,
      version: 'v5.0'
    });
  }
  facebookLogin() {
    console.log('submit login to facebook');
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        console.log(response.authResponse.userID);
        FB.api(
          '/me',
          'GET',
          {},
          (userData) => {
            console.table(userData);
          }
        );
        FB.api('/me', 'GET', { fields: 'first_name,last_name,name,id,picture.width(150).height(150),email' },
          (res) => {
            this.imgPath = res.picture.data.url;
            // console.log(this.imgPath);
            UserStorageService.setCurrentUserEmail(res.email);
          });
      } else {
        console.log('User login failed');
        UserStorageService.setCurrentUserEmail("error");
      }
    }, { scope: 'email' });

  }


}