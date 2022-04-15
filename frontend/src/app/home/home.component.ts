import { UserService } from './../_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { data } from '../testing/userData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currUser!: User;
  profilePic: string = '';
  currentValue: Number = 50000;
  dailyChange: Number = 1.32;
  buyingPower: Number = 145222;

  //chart
  data = data;
  view: [number, number] = [1100, 700];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Days';
  yAxisLabel: string = 'Profit';
  timeline: boolean = true;

  constructor(private auth: AuthService, private user: UserService) {
    // this.currUser = this.auth.getUserVal;
    // 👇this api is exposed to use for public images
    // this.currUser.profileImage = `http://localhost:3000/imgs/${this.currUser.profileImage}`;
  }

  ngOnInit(): void {}
}
