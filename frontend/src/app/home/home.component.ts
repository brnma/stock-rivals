import { UserService } from './../_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currUser!:User;
  profilePic:string="";

  constructor(private auth:AuthService, private user:UserService) {
    this.currUser = this.auth.getUserVal
    // 👇this api is exposed to use for public images
    this.currUser.profileImage = `http://localhost:3000/imgs/${this.currUser.profileImage}`
   }

  ngOnInit(): void {
  }

}
