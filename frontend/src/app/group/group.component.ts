import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {


  user1: User = {
    username: "John",
    profileImage: "File",
    name: "Bob", // TODO remove later
    email: "John@vt.edu",
    accountValue: 123, //TODO base ranking off this value
    previousValue: 122,
    rank: 0,
    token: 'djdjdjdjjdjdjd'
  };
  user2: User = {
    username: "John",
    profileImage: "File",
    name: "Oscar", // TODO remove later
    email: "John@vt.edu",
    accountValue: 999, //TODO base ranking off this value
    previousValue: 888,
    rank: 0,
    token: 'djdjdjdjjdjdjd'
  };
  user3: User = {
    username: "John",
    profileImage: "File",
    name: "THE GOAT HIMSELF", // TODO remove later
    email: "John@vt.edu",
    accountValue: 1500, //TODO base ranking off this value
    previousValue: 888,
    rank: 0,
    token: 'djdjdjdjjdjdjd'
  };
  user4: User = {
    username: "John",
    profileImage: "File",
    name: "Larry", // TODO remove later
    email: "John@vt.edu",
    accountValue: 11, //TODO base ranking off this value
    previousValue: 888,
    rank: 0,
    token: 'djdjdjdjjdjdjd'
  };
  Users: User[] = [];

  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
  console.log(this.userService.getUsers());
  this.Users = this.userService.getUsers().sort((a, b) => b.accountValue - a.accountValue);
   // let temp:[User, User, User, User] = [this.user1, this.user2, this.user3, this.user4];


   // this.Users = temp.sort((a, b) => b.accountValue - a.accountValue);

        let i: number = 1;
        this.Users.map((user: User) => {
          user.rank = i++;
        });
    // @ts-ignore


    // @ts-ignore
    // this.userService.getUsers().subscribe((array: User[]) => {
    //     console.log(array);
    //     this.Users = array.sort((a, b) => b.accountValue - a.accountValue);
    //     let i: number = 1;
    //     this.Users.map((user: User) => {
    //       user.rank = i++;
    //     });
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }
}




    //console.log(this.Users);

