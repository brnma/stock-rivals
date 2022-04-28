import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { data } from '../testing/data';
import { StockService } from '../_services/stock.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {
  symbol:string=""
  validTicker:Boolean=false
  orderType="market"
  actionType=""
  quantity=1
  currPrice=0

  //chart
  emptyData = data
  data:any = data;
  view: [number, number] = [1000, 500];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Days';
  yAxisLabel: string = 'Profit';
  timeline: boolean = true;
  constructor(private stockService:StockService,private _snackbar: MatSnackBar) {}

  ngOnInit(): void {}

  getStockData(){
    console.log(this.symbol)
    this.stockService.getStockData(this.symbol).subscribe(val =>{
      console.log(val)
      this.data = val
      this.validTicker = true
      this._snackbar.open("Valid ticker!", undefined, {duration: 2000})
      this.resetAll()
      this.updatePrice()
    },(err)=>{
      console.log(err)
      this.validTicker = false
      this._snackbar.open("Invalid ticker",undefined, {duration: 2000})
      this.data = this.emptyData
      this.resetAll()
    })
  }

  resetAll() {
    this.actionType=""
  this.quantity=1
  this.currPrice=0  
  }

  updatePrice(){
    let currPrice = this.data[0].series[this.data[0].series.length-1].value
    console.log(this.data[0].series[this.data[0].series.length-1].value)
    this.currPrice = this.quantity*currPrice
  }

  purchase() {
    if (!this.validTicker) this._snackbar.open('Ooop invalid ticker', undefined, {duration: 2000})
    else {
      switch(this.actionType) {
        case "buy":
          this.stockService.buyStock(this.quantity, this.currPrice/this.quantity, this.symbol).subscribe(val=>{
            console.log(val)
            this._snackbar.open("Purchase successful!", undefined, {duration:2000})
          }, (err) => {
            console.log(err)
            this._snackbar.open('Purchased failed oop', undefined, {duration:2000})
          })
          break;
        case "sell":
          break;
        default:
          this._snackbar.open('Please pick between sell and buy', undefined, {duration: 2000})
          break;
      }
    }
  }
}
