import { Component, OnInit } from '@angular/core';
import { LoginDialogComponent } from 'src/app/dialogs/login-dialog/login-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GraphqlUsersService } from 'src/app/services/graphql-users.service';
import { Users } from 'src/app/models/types';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-navi-bar',
  templateUrl: './navi-bar.component.html',
  styleUrls: ['./navi-bar.component.scss']
})
export class NaviBarComponent implements OnInit {

  constructor(public dialog: MatDialog, public userService : GraphqlUsersService) {
    this.makeTransparent = false;
    this.showPrf = false;
    this.showDropdownLanguage = false;
  }

  private loggedIn : boolean;
  private UserInitial : String;
  private makeTransparent : boolean;
  private showPrf : boolean;
  private showDropdownLanguage: boolean;
  private showDropdownCurrency : boolean;
  private currency : string;
  private language : string;
  ngOnInit() {
    if(UserStorageService.getCurrentUserId() == 0) {
      this.loggedIn = false;
      this.currency = "IDR";
      this.language = "English";
    }
    else {
      var id : number = UserStorageService.getCurrentUserId();
      this.loggedIn = true;
      this.userService.getUserById(id).subscribe(
        async result => {
          var users: Users[] = result;
          await this.assignUserData(users[0])
        }
      )
    }
  }
  
  assignUserData(user : Users) {
    var str : string = user.Username;
    this.loggedIn = true;
    this.currency = user.UserCurrency;
    if(UserStorageService.getCurrentPreferredLanguage() != "") {
      this.language = UserStorageService.getCurrentPreferredLanguage();
    }
    else this.language = user.UserLanguage;

    if(UserStorageService.getCurrentPreferredCurrency() != "") {
      this.currency = UserStorageService.getCurrentPreferredCurrency();
    }
    else this.currency = user.UserCurrency;

    this.UserInitial = "" + this.generateInitial(str);
  }

  logout() {
    UserStorageService.logout();
    window.location.reload();
  }

  generateInitial(name : string) : string {
    var username : string[] = name.split(" ");
    var firstChar : string = username[0].charAt(0);
    // console.log("First char : " + firstChar);
    var lastChar : string = username[1].charAt(0);
    return firstChar + "" + lastChar;
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '80%';
    dialogConfig.minWidth = '370px';
    dialogConfig.backdropClass = "backdropColor";
    dialogConfig.panelClass = "panelColor";
    this.dialog.open(LoginDialogComponent,dialogConfig);
  }

  showProfile() {
    this.makeTransparent = true;
    this.showPrf = true;    
    this.showDropdownLanguage = false;
    this.showDropdownCurrency = false;
  }

  disposeTransparent() {
    this.makeTransparent = false;
    this.showPrf = false;
    this.showDropdownLanguage = false;
    this.showDropdownCurrency = false;
  }

  showLanguage() {
    this.makeTransparent = true;
    this.showDropdownLanguage = true;
    this.showDropdownCurrency = false;
    this.showPrf = false;
  }

  showCurrency() {
    this.showDropdownCurrency = true;
    this.makeTransparent = true;
    this.showDropdownLanguage = false;
    this.showPrf = false;
  }

  changeCurrency(str : string) {
    this.currency = str;
    UserStorageService.setCurrentPreferredCurrency(str);
  }

}
