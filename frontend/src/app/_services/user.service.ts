import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  // user1: User = {
  //   username: "John",
  //   profileImage: "File",
  //   name: "Bob", // TODO remove later
  //   email: "John@vt.edu",
  //   accountValue: 123, //TODO base ranking off this value
  //   previousValue: 122,
  //   rank: 0,
  //   token: 'djdjdjdjjdjdjd'
  // };
  // user2: User = {
  //   username: "John",
  //   profileImage: "File",
  //   name: "Oscar", // TODO remove later
  //   email: "John@vt.edu",
  //   accountValue: 999, //TODO base ranking off this value
  //   previousValue: 888,
  //   rank: 0,
  //   token: 'djdjdjdjjdjdjd'
  // };
  // user3: User = {
  //   username: "John",
  //   profileImage: "File",
  //   name: "THE GOAT HIMSELF", // TODO remove later
  //   email: "John@vt.edu",
  //   accountValue: 1500, //TODO base ranking off this value
  //   previousValue: 888,
  //   rank: 0,
  //   token: 'djdjdjdjjdjdjd'
  // };
  // user4: User = {
  //   username: "John",
  //   profileImage: "File",
  //   name: "Larry", // TODO remove later
  //   email: "John@vt.edu",
  //   accountValue: 11, //TODO base ranking off this value
  //   previousValue: 888,
  //   rank: 0,
  //   token: 'djdjdjdjjdjdjd'
  // };

  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get<User[]>(`http://localhost:3000/user/allusers`);
  }

  register(user: any) {
    return this.http.post<User>(`http://localhost:3000/user/register`, user);
  }

  uploadPic(obj: any) {
    return this.http.post(`http://localhost:3000/user/uploadpic`, obj);
  }

  changeUsername(newUsername:string) {
    return this.http.post(`http://localhost:3000/user/changeusername`, {
      newUsername: newUsername
    })
  }
  getUsers() {
   return this.http.get(`http://localhost:3000/user/allusers`);
    // let temp:User[]= [this.user1, this.user2, this.user3, this.user4];
    // return temp;

  }
}
