import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { Users } from 'src/app/models/types';
import { Subscription } from 'apollo-client/util/Observable';
import { GraphqlUsersService } from 'src/app/services/graphql-users.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  
  email: string;
  header : string;
  myData : string;
  toBeFilled : string;
  firstName : string ="";
  lastName : string ="";
  password : string;
  mobileNumber: string;
  visiblePassword: boolean = false;
  currImg : string;
  currType: string;
  idx : number;
  Error : string;

  ngOnInit() {
    this.idx = 0;
    this.currImg = this.passwordImg[0];
    this.currType = this.types[0];
    if(this.data.email != undefined) {
      this.header = "Email";
      this.toBeFilled = "Phone Number"
      this.myData = this.data.email;
      this.email = this.data.email;
    }
    else if(this.data.phone != undefined) {
      this.header = "Phone Number";
      this.toBeFilled = "Email";
      this.myData = this.data.phone;
      this.mobileNumber = this.data.phone;
    }
    // console.log(this.email);
  }

  isPhone() {
    return this.header == "Phone Number";
  }

  validateEmail() : boolean {
    let atPosition = -1;
    let dotPosition = -1;
    
    let len = this.mobileNumber.length;

    for(let i = 0 ; i < len ; i++) {
      if(this.mobileNumber.charAt(i) == '@') {
        atPosition = i;
      }
      else if(this.mobileNumber.charAt(i) == '.') {
        dotPosition = i;
      }
    }

    if(atPosition == -1 || dotPosition == -1) {
      return false;
    }
    if(atPosition > dotPosition) {
      return false;
    }
    if(atPosition == (dotPosition-1)) {
      return false;
    }

    return true;
  }

  validatePhone(phone: string) : boolean {
    let len = phone.length;

    if(len < 10 || len > 14) {
      return false;
    }
    
    for(let i = 0 ; i < len ; i++) {
      if(phone.charAt(i) >= '0' && phone.charAt(i) <= '9') {
        continue;
      }
      return false;
    }
    return true;
  }

  passwordImg: string[]= [
    '../../../assets/account/hide-password.png',
    '../../../assets/account/show-password.png'
  ];

  private types: string[] = [
    'password', 'text'
  ];


  constructor(private dialog: MatDialog, 
            private dialogRefRegister: MatDialogRef<RegisterDialogComponent>,
            private userService : GraphqlUsersService,
            @Inject(MAT_DIALOG_DATA) public data:any) { }


  backButton() {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.height = '100%';
    dialogConfig.minWidth = '370px';
    dialogConfig.backdropClass="backdropColor";
    dialogConfig.panelClass="panelColor";
    dialogConfig.data= {
      txtPhoneOrEmail : this.myData
    };
    this.dialog.open(LoginDialogComponent, dialogConfig);
    this.dialogRefRegister.close();
  }

  clickVisibility() {
    this.idx = (this.idx + 1) % 2;
    this.currType = this.types[this.idx];
    this.currImg = this.passwordImg[this.idx];
  }

  private users$: Subscription
  private users2$ : Subscription
  private users: Users[];

  getUserEmailOrPhone(str :String, name : String) {
    this.users$ = this.userService.getUserEmailAndPhone(str).subscribe(
      async result => {
        this.users = result,
        await this.checkUser(name)
      }
    );
    }

    assignGoogleOrFacebook(result : Users[]) {
      console.log(UserStorageService.getCurrentUserEmail())
      console.log("aaa")
      console.log(result)
      if(result.length == 0) return
      let id = result[0].UserId
  
      if(UserStorageService.getCurrentGoogleKey() != "") {
        this.userService.insertGoogleKey(id,UserStorageService.getCurrentGoogleKey()).subscribe(
          async result => {
            await (alert("Successfully registered by Google!"),
            UserStorageService.setCurrentGoogleKey(""))
          }
        )
      }
      else if(UserStorageService.getCurrentFacebookKey() != "") {
        this.userService.insertFacebookKey(id,UserStorageService.getCurrentFacebookKey()).subscribe(
          async result => {
            await (alert("Successfully registered by Facebook!"),
            UserStorageService.setCurrentFacebookKey(""))        }
        )
      }
  
    }

  checkUser(name : String) {
    if(this.users == undefined || this.users.length == 0) {
       this.users2$ = this.userService.createUser(name,this.password,this.mobileNumber,this.email,
        UserStorageService.getCurrentGoogleKey(), UserStorageService.getCurrentFacebookKey()).subscribe(
        async res => {
          await (
            alert("Success register!")
            )
          
        }
       )
      
    }
    else {
      this.myData = (this.header == "Email" ? this.email : this.mobileNumber);
      this.backButton();
    }
  }

  ngOnDestroy() {
    if(this.users$ != undefined) {
      this.users$.unsubscribe();
    }
    if(this.users2$ != undefined) {
      this.users2$.unsubscribe();
    }
    
  }

  showErrorMessage(text : string) {
    this.Error = text;
  }

  register() {
    var name : String = this.firstName + " " + this.lastName;
    
    if(this.validatePhone(this.mobileNumber) == false && this.header == "Email") {
      this.showErrorMessage("Invalid phone format!")
    }
    else if(this.header == "Phone Number" && this.validateEmail() == false) {
      this.showErrorMessage("Invalid Email format!");
    }
    else if(this.firstName == "") {
      this.showErrorMessage("First Name must be filled!")
    }
    else if(this.lastName == "") {
      this.showErrorMessage("Last Name must be filled!")
    }
    else if(this.password == "") {
      this.showErrorMessage("Password must be filled!");
    }
    else if(this.password.length < 5 || this.password.length > 20) {
      this.showErrorMessage("Password must be 5-20 characters long")
    }
    else if(this.header == "Phone Number") {
      this.getUserEmailOrPhone(this.email,name);
    }
    else {
      this.getUserEmailOrPhone(this.mobileNumber, name);
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  checkEmail() {
    (async () => { 
      while(true) {
        if(localStorage.getItem("Email") == "") {
          await this.delay(1000);
        }
        else {
          if(localStorage.getItem("Email") == "error") {
            localStorage.setItem("Email","");
            return;
          }
          
          var email: string = localStorage.getItem("Email");
          this.myData = email;
          localStorage.setItem("Email","");
          this.users$ = this.userService.getUserEmailAndPhone(email).subscribe(
            async result => {
              this.users = result;
              await this.checkAvailableUser(email);
            }
          );
          
        }
      }
    })();
  }
  
  checkAvailableUser(str : string) {
    if(this.users == undefined || this.users.length == 0) {
      this.data = str;
    }
    else {
      this.backButton();
    }
    
    
  }
  
}
