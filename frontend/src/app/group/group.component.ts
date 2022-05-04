import { Component, OnInit } from '@angular/core';
import { GroupService } from '../_services/group.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  groupCode: String = '';
  inGroup: Boolean = false;
  users: User[] = [];
  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService.getGroup().subscribe((code) => {
      this.groupCode = JSON.parse(JSON.stringify(code));
      this.inGroup = this.groupCode !== '' ? true : false;
      console.log(this.groupCode);
    });
    this.groupService.getGroupUsers().subscribe((users) => {
      this.users = JSON.parse(JSON.stringify(users));
      this.users.sort((a, b) => b.currValue - a.currValue);
      let i: number = 1;
      this.users.map((user: User) => {
        user.rank = i++;
      });
      console.log(this.users);
    });
  }

  leaveGroup() {
    console.log('leave group clicked');
    this.groupService.leave().subscribe((res) => {
      console.log(res);
    });
    window.location.reload();
  }
  createGroup() {
    console.log('create group clicked');
    this.groupService.create().subscribe((res) => {
      console.log(res);
    });
    window.location.reload();
  }
  joinGroup() {
    console.log('join group clicked');
    this.groupService.join(this.groupCode).subscribe((res) => {
      console.log(res);
    });
    window.location.reload();
  }
}
