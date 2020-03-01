import { Component, OnInit } from '@angular/core';
import { GraphqlUsersService } from 'src/app/services/graphql-users.service';
import { Admins } from 'src/app/models/types';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  constructor(private userService : GraphqlUsersService,
    private router : Router) { }

  username : string;
  password : string;

  ngOnInit() {
    
  }

  login() {
    this.userService.getAdminByUsernameAndPassword(this.username,this.password).subscribe(
      async result => {
        await this.checkResult(result)
      }
    )
  }

  checkResult(admin: Admins[]) {
    if(admin.length == 0) {
      alert("Invalid account");
    }
    else {
      UserStorageService.setCurrentAdmin(admin[0].AdminId);
      alert("Logged in as admin")
      this.router.navigate(["/manage-train"]);
    }
  }

}
