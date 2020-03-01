import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UtilityService } from 'src/app/services/utility.service';
import { GraphqlUsersService } from 'src/app/services/graphql-users.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  showManage : boolean;
  showSetting : boolean;
  Username : string;
  constructor(private router : Router, private userService : GraphqlUsersService) {
    this.showManage = true;
    this.showSetting = false;
  }

  ngOnInit() {
    if(UserStorageService.getCurrentUserId() == 0) {
      this.router.navigate(["/"]);
    }
    else {
      let id = UserStorageService.getCurrentUserId();
      this.userService.getUserById(id).subscribe(
        async result => {
          await (this.Username = result[0].Username)
        }
      )
    }
  }

  async account() {
    this.showManage = false;
    // this.showSetting = true;
    await UtilityService.delay(1);
    this.showManage = true;
    this.showSetting = false;
  }

  myOrder() {

  }
  
  settings() {
    this.showSetting = true;
    this.showManage = false;
  }
  
  logout() {
    UserStorageService.logout();
    window.location.reload();
  }

}
