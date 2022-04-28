import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user:User;
  // name: String = 'Nate';
  // cashAmt: number = 100.0;
  // profilePic: String =
  //   'https://images.unsplash.com/photo-1560415755-bd80d06eda60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=991&q=80';
  constructor(private userService: UserService, private authService: AuthService) {
    this.user = this.authService.getUserVal
  }

  ngOnInit(): void {}

  get profileImg() {
    return `http://localhost:3000/img/${this.user.profileImage}`
  }
}
