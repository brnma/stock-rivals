import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  initials: String = "";
  minProgress: Number = 184;
  calProgress: Number = 444;
  rank: Number = 5;
  fullName: string = "john smith";
  avgMin: Number = 665;
  avgCal: Number = 545;
  bgcolor: String = "#808080";
  txtcolor: String = "black";

  constructor() { }

  ngOnInit(): void {
  }

}
