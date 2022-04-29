import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScaleType } from '@swimlane/ngx-charts';
import { data } from '../testing/data';
import { AuthService } from '../_services/auth.service';
import { StockService } from '../_services/stock.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {
  symbol:string=""
  validTicker:Boolean=false
  validStocksArr= false
  orderType="market"
  actionType=""
  quantity=1
  currPrice=0
  currStocksArr = []

  //chart
  emptyData = data
  data:any = data;
  view: [number, number] = [900, 300];
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
  colorScheme = {
    name:"", selectable:true, group:ScaleType.Ordinal, 
    domain: ['#a5d6a7']
  }
  constructor(private stockService:StockService,private _snackbar: MatSnackBar, private auth:AuthService) {}

  ngOnInit(): void {
    this.updateStocksArr()
  }

  updateStocksArr() {
    this.stockService.grabUserStocks().subscribe((val:any)=>{
      this.currStocksArr = val.stocks
      this.validStocksArr = true
    }, (err) =>{
      this._snackbar.open('Error getting user stocks oop', undefined, {duration:2000})
    })
  }

  getHintText() {
    let curr:any = this.currStocksArr.find((curr:any) => {
      return curr.symbol === this.symbol
    })

    if (curr) return `Amount: ${curr.shares}`
    else return ``
  }

  getStockData(){
    console.log(this.symbol)
    this.stockService.getStockData(this.symbol).subscribe(val =>{
      this.data = val
      this.validTicker = true
      this._snackbar.open("Valid ticker!", undefined, {duration: 2000})
      this.resetAll()
      this.updatePrice()
      this.auth.getUpdatedUser()
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
    // console.log(this.data[0].series[this.data[0].series.length-1].value)
    this.currPrice = this.quantity*currPrice
  }

  purchase() {
    if (!this.validTicker) this._snackbar.open('Ooop invalid ticker', undefined, {duration: 2000})
    else {
      switch(this.actionType) {
        case "buy":
          // console.log(this.quantity)
          // console.log(this.currPrice)
          this.stockService.buyStock(this.quantity, this.currPrice/this.quantity, this.symbol).subscribe(val=>{
            // console.log(val)
            this._snackbar.open("Purchase successful!", undefined, {duration:2000})
            this.updateStocksArr()
            this.auth.getUpdatedUser()
          }, (err) => {
            console.log(err)
            this._snackbar.open('Purchased failed oop', undefined, {duration:2000})
          })
          break;
        case "sell":
          // console.log(this.quantity)
          // console.log(this.currPrice)
          this.stockService.sellStock(this.quantity, this.currPrice/this.quantity, this.symbol).subscribe(val=>{
            this.updateStocksArr()
            this.auth.getUpdatedUser()
            this._snackbar.open("Selling successful!", undefined, {duration:2000})

          }, (err) => {
            console.log(err)
            this._snackbar.open('Selling failed oop', undefined, {duration:2000})
          })
          break;
        default:
          this._snackbar.open('Please pick between sell and buy', undefined, {duration: 2000})
          break;
      }
    }
  }
}
