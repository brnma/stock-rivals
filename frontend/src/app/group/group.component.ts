import { Component, OnInit } from '@angular/core';
import { GroupService } from '../_services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  groupCode: String = '';
  inGroup: Boolean = false;
  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService.getGroup().subscribe((code) => {
      this.groupCode = JSON.parse(JSON.stringify(code));
      this.inGroup = this.groupCode !== '' ? true : false;
      console.log(this.groupCode);
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
