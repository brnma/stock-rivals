import { UserService } from './../_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { data } from '../testing/userData';
import { ScaleType } from '@swimlane/ngx-charts';
import { StockService } from '../_services/stock.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currUser!: User;
  // stocks: any = [];
  profilePic: string = '';
  // currentValue: Number = 50000;
  dailyChange: Number = 1.32;

  colorScheme = {
    name: '',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#a5d6a7']
  };

  //chart
  emptyData = data;
  data: any = data;
  view: [number, number] = [window.innerWidth / 2, window.innerHeight / 1.5];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Days';
  yAxisLabel: string = 'Profit $';
  timeline: boolean = true;

  constructor(
    private auth: AuthService,
    private user: UserService,
    private stockService: StockService,
    private snackBar: MatSnackBar
  ) {
    this.auth.getUserSubject.subscribe((val: any) => {
      this.currUser = val;
      console.log(this.currUser);
    });
    // 👇this api is exposed to use for public images
    // this.currUser.profileImage = `http://localhost:3000/imgs/${this.currUser.profileImage}`;

    this.grabHistoricalValue();
  }

  ngOnInit(): void {}

  grabHistoricalValue() {
    this.stockService.grabHistoricalValue().subscribe(
      (val: any) => {
        this.data = val;
        // this.snackBar.open("Historical data refreshed!", undefined, {duration:2000})
        this.auth.getUpdatedUser();
        // this.stockService.grabUserStocks().subscribe((val: any) => {
        //   this.stocks = val;
        // });
      },
      (err) => {
        this.snackBar.open("Something went wrong with grabbing user's data", undefined, { duration: 2000 });
      }
    );
  }

  onResize(e: any) {
    console.log(e.target.innerWidth);
    this.view = [e.target.innerWidth / 2, e.target.innerHeight / 1.5];
  }

  get currChange() {
    const { currValue, prevValue } = this.currUser;
    if (currValue === prevValue || currValue === 0 || prevValue === 0) return 1;

    const percent = this.currUser.currValue / this.currUser.prevValue;
    return percent;
  }
}
