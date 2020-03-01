import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import {GraphqlUsersService} from '../../services/graphql-users.service'
import { Observable, Subscription } from 'rxjs';
import { Users } from 'src/app/models/types';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  private txtPhoneOrEmail: string ="";
  private txtPassword: string = "";
  private plcHolder: string = "Mobile Phone or Email";
  private users$: Subscription
  private users: Users[];

  
constructor(private dialogRef: MatDialogRef<LoginDialogComponent>,
  private dialogRegister: MatDialog,
            @Inject(MAT_DIALOG_DATA) public data:any,
            private userService: GraphqlUsersService) { }

  private checkUser(dialogConfig : MatDialogConfig) {
    if(this.users == undefined || this.users.length == 0) {
      if(this.validatePhone() == true) {
        dialogConfig.data = {
          phone : this.txtPhoneOrEmail
        }
      }
      else {
        dialogConfig.data = {
          email : this.txtPhoneOrEmail
        }
      }
      this.dialogRegister.open(RegisterDialogComponent, dialogConfig);
      this.dialogRef.close();
    }
    else {
      if(document.getElementById("inputPassword").style.display == "flex") {
        console.log("asdsd" + this.users[0].UserPassword);
        console.log(this.txtPassword);
        if(this.users[0].UserPassword == this.txtPassword) {
          //session login
          UserStorageService.setCurrentUserId(parseInt(this.users[0].UserId));
          alert("Login Success!");
          window.location.reload();
        }
        else {
          this.showErrorMessage("Invalid " + this.plcHolder + " or Password")
        }
      }
      else document.getElementById("inputPassword").style.display = "flex";
    }
  }

  visiblePassword: boolean = false;
  currImg : string;
  currType: string;
  idx : number;

  passwordImg: string[]= [
    '../../../assets/account/hide-password.png',
    '../../../assets/account/show-password.png'
  ];

  private types: string[] = [
    'password', 'text'
  ];

  clickVisibility() {
    this.idx = (this.idx + 1) % 2;
    this.currType = this.types[this.idx];
    this.currImg = this.passwordImg[this.idx];
  }
  getUserEmailOrPhone(str :String, dialogConfig : MatDialogConfig) {
    this.users$ = this.userService.getUserEmailAndPhone(str).subscribe(
      async result => {
        this.users = result,
        await this.checkUser(dialogConfig)
      }
    );
    
    
  }
   
  ngOnInit() {
    localStorage.setItem("Email","");
    // console.log("uayy");
    this.idx = 0;
    this.currImg = this.passwordImg[0];
    this.currType = this.types[0];
    if(this.data == null) return;
    this.txtPhoneOrEmail = this.data.txtPhoneOrEmail;
  }

  ngOnDestroy() {
    this.users$.unsubscribe();
  }

  validatePhone() : boolean {
    let len = this.txtPhoneOrEmail.length;

    if(len < 10 || len > 14) {
      return false;
    }

    for(let i = 0 ; i < len ; i++) {
      if(this.txtPhoneOrEmail.charAt(i) >= '0' && this.txtPhoneOrEmail.charAt(i) <= '9') {
        continue;
      }
      return false;
    }
    return true;
  }

  validateEmail() : boolean {
    let atPosition = -1;
    let dotPosition = -1;
    
    let len = this.txtPhoneOrEmail.length;

    for(let i = 0 ; i < len ; i++) {
      if(this.txtPhoneOrEmail.charAt(i) == '@') {
        atPosition = i;
      }
      else if(this.txtPhoneOrEmail.charAt(i) == '.') {
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

  redirect() {
    if(this.plcHolder == "Mobile Phone or Email") {
      if(this.validatePhone() == true) {
        this.plcHolder = "Mobile Phone";
      }
      else if(this.validateEmail() == true) {
        this.plcHolder = "Email";
      }
      else {
        this.showErrorMessage("Not a valid email or phone number");
        return;
      }
    }
    else if(this.plcHolder == "Mobile Phone") {
      if(this.validatePhone() == false) {
        this.showErrorMessage("Not a valid phone number");
        return;
      }
    }
    else if(this.plcHolder == "Email") {
      if(this.validateEmail() == false) {
        this.showErrorMessage("Not a valid email");
        return;
      }
    }
    

    // console.log(this.txtPhoneOrEmail)
    this.validatedRedirect(this.txtPhoneOrEmail);
    
    
  }
  
  validatedRedirect(emailOrPhone : string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.height = '100%';
    dialogConfig.minWidth = '370px';
    dialogConfig.backdropClass="backdropColor";
    dialogConfig.panelClass="panelColor";
  
    this.getUserEmailOrPhone(emailOrPhone,dialogConfig)
    
  }

  showErrorMessage(message: string) {
    var errorMessage = document.getElementById("inputError");
    errorMessage.style.display = "block";
    errorMessage.innerText = message;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  checkEmail() {
    (async () => { 
      while(true) {
        if(UserStorageService.getCurrentUserEmail() == "") {
          await this.delay(1000);
        }
        else {
          if(UserStorageService.getCurrentUserEmail() == "error") {
            UserStorageService.setCurrentUserEmail("");
            return;
          }
          var email: string = UserStorageService.getCurrentUserEmail();
          UserStorageService.setCurrentUserEmail("");
          this.txtPhoneOrEmail = email;
          
          this.validatedRedirect(email);
        }
      }
    })();
  }
  

}
