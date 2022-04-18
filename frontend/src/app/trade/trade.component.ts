import { Component, OnInit } from '@angular/core';
import { data } from '../testing/data';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {
  //chart
  data = data;
  view: [number, number] = [1000, 500];
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
  constructor() {}

  ngOnInit(): void {}
}
