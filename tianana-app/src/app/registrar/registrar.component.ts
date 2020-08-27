import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  user = {name: '', lastname: '', username: '', password: ''}

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.user);
  }
}
