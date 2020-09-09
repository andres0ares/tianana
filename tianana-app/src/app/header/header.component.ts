import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../../shared/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: String;
  admin: Boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loadUserCredentials();
    this.authService.getAdmin()
      .subscribe((isAdmin) => {
        console.log('isAdmin: ', isAdmin);
        if(isAdmin)
          this.admin = isAdmin;
          console.log('this.admin: ', this.admin);
      })
    this.authService.getUsername()
      .subscribe((user) => {
        this.user = user;
        console.log(this.user);
      })
      console.log(this.user);
  }

}
