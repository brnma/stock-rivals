import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
@Component({
  selector: 'app-group',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {


  user1: User = {
    username: "John",
    profileImage: "File",
    email: "John@vt.edu",
    currValue: 123,
    prevValue: 122,
    rank: 0,
    token: 'djdjdjdjjdjdjd',
    groupCode: null,
    buyingPower: 0
  };
  user2: User = {
    username: "John",
    profileImage: "File",
    email: "John@vt.edu",
    currValue: 999, //TODO base ranking off this value
    prevValue: 888,
    rank: 0,
    token: 'djdjdjdjjdjdjd',
    groupCode: null,
    buyingPower: 0
  };
  user3: User = {
    username: "John",
    profileImage: "File",
    email: "John@vt.edu",
    currValue: 1500, //TODO base ranking off this value
    prevValue: 888,
    rank: 0,
    token: 'djdjdjdjjdjdjd',
    groupCode: null,
    buyingPower:0
  };
  user4: User = {
    username: "John",
    profileImage: "File",
    email: "John@vt.edu",
    currValue: 11, //TODO base ranking off this value
    prevValue: 888,
    rank: 0,
    token: 'djdjdjdjjdjdjd',
    groupCode: null,
    buyingPower: 0
  };
  users: User[] = [];

  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
    // work on here TODO
    // this.userService.getAll().subscribe()


  // console.log(this.userService.getUsers());
  // this.Users = this.userService.getUsers().sort((a, b) => b.accountValue - a.accountValue);
   // let temp:[User, User, User, User] = [this.user1, this.user2, this.user3, this.user4];


   // this.Users = temp.sort((a, b) => b.accountValue - a.accountValue);

        // let i: number = 1;
        // this.Users.map((user: User) => {
        //   user.rank = i++;
        // });
    // @ts-ignore


    // @ts-ignore
    this.userService.getUsers().subscribe((array: User[]) => {
        console.log(array);
        this.users = array.sort((a, b) => b.currValue- a.currValue);
        let i: number = 1;
        this.users.map((user: User) => {
          user.rank = i++;
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}




    //console.log(this.Users);

