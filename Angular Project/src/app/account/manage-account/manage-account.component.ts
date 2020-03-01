import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/types';
import { GraphqlUsersService } from 'src/app/services/graphql-users.service';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {

  // titleSelect: string;

  private user : Users;
  private firstName: string;
  private lastName : string;
  private selectedCity : string;
  private slctTitle : string;
  private address : string;
  private postalCode : string;
  constructor(private userService : GraphqlUsersService,
      private router: Router) { }

  ngOnInit() {
    this.slctTitle = "Mr."
    if(UserStorageService.getCurrentUserId() == 0) {
      this.router.navigate(["/"]);
    }
    else {
      var users : Users[];
      var id : number = UserStorageService.getCurrentUserId();
      this.userService.getUserById(id).subscribe(
        async result => {
          users = result;
          await this.checkUser(users);
        }
      )
    }
  }

  checkUser(users : Users[]) {
    if(users == undefined ||users.length == 0) {
      this.router.navigate(["/"]);
    }
    else {
      this.user = users[0];
      var temp : string[] = this.user.Username.split(" ");
      this.firstName = temp[0];
      this.lastName = temp[1];
      this.selectedCity = this.user.UserCity;
      this.address = this.user.UserAddress;
      this.postalCode = this.user.UserPostalCode;
      this.slctTitle = (this.user.UserTitle == "" ? "Mr." : this.user.UserTitle);
    }
  }

  saveData() {
    if(this.firstName == "" || this.lastName == "" ) {
      alert("First Name or Last Name cannot be empty!")
      return;
    }
    let id = UserStorageService.getCurrentUserId();
    var username : string = this.firstName + " " + this.lastName;
    this.userService.updateAccountUser(id,username,this.slctTitle,this.address,this.postalCode,this.selectedCity).subscribe(
      async result => {
        await alert("Data successfully changed!");
      }
    );

  }

  settings : boolean = false;
  openSettings() {
    this.settings = true;
  }

  showError : boolean = false;

  validateAddress() {
    if(this.address.length < 10) {
      this.showError = true;
    }
    else {
      this.showError = false;
    }
  }

}
