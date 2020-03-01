import { Component, OnInit } from '@angular/core';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { Router } from '@angular/router';
import { GraphqlUsersService } from 'src/app/services/graphql-users.service';
import { Users } from 'src/app/models/types';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings-account',
  templateUrl: './settings-account.component.html',
  styleUrls: ['./settings-account.component.scss']
})
export class SettingsAccountComponent implements OnInit {

  constructor(private router : Router, private userService : GraphqlUsersService,
    private http : HttpClient) { }

  private user : Users;

  private isValidPhone : string = "";
  private slctLanguage : string;

  ngOnInit() {
    if(UserStorageService.getCurrentUserId() == 0) {
      this.router.navigate(["/"]);
    }
    else {
      var userId = UserStorageService.getCurrentUserId();
      this.userService.getUserById(userId).subscribe(
        async result => {
          await (this.user = result[0],
            this.slctLanguage = this.user.UserLanguage,
            this.checkPhone());
        }
      )
    }
  }

  updateLanguage() {
    let userId = UserStorageService.getCurrentUserId();
    this.userService.setUserLanguage(userId,this.slctLanguage).subscribe(
      async result => {
        await (alert("Update Language Success!"), location.reload())
      }
    )
  }

  checkPhone() {

    var access_key = 'b2ae16e1fe4cec234ac84389fb0dccdf';
    var phone_number = this.user.UserPhoneNumber;

    // verify phone number via AJAX call
    $(document).ready(function() {

        var test = $.ajax({
          url: 'http://apilayer.net/api/validate?access_key=' + access_key + '&number=' + phone_number
           + "&country_code=ID&format=1",   
          dataType: 'jsonp',
          success: function(json) {

          // Access and use your preferred validation result objects
          console.log(json.valid);

          if(json.valid == true) {
            document.getElementById("validatePhone").innerHTML = "Valid Phone Number"
          }
          else {
            document.getElementById("validatePhone").innerHTML = "Invalid Phone Number"
          }
                      
          }
      });
    })

  }

}
