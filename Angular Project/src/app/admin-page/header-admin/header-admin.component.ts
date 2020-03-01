import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { GraphqlUsersService } from 'src/app/services/graphql-users.service';
import { Admins } from 'src/app/models/types';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {

  constructor(private router : Router, private userService : GraphqlUsersService) { }

  ngOnInit() {
    if(UserStorageService.getCurrentAdmin() == 0) {
      this.router.navigate(["/"]);
      return;
    } 
    this.userService.getAdminById(UserStorageService.getCurrentAdmin()).subscribe(
      async result => {
        await this.checkAdmin(result);
      }
    )   
  }

  checkAdmin(admins : Admins[]) {
    if(admins == undefined || admins.length == 0) {
      this.router.navigate["/"];
    }
  }

  logout() {
    UserStorageService.logoutCurrentAdmin()
  }

}
