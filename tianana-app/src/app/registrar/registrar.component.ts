import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


import { UsersService } from '../services/users.service';
import { User } from '../../shared/user';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  user = new User;
  errMess: String;

  constructor(private usersService: UsersService,
    private location: Location) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.user);
    this.usersService.postNewUser(this.user)
      .subscribe((user) => {
        this.user = user;
        this.location.back();
      },
      errmess => this.errMess = <any>errmess);    
  }
}
