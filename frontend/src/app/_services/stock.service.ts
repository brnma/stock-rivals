import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StockService {
    constructor(private http: HttpClient) {}

    getStockData(symbol:String) {
        return this.http.get(`http://localhost:3000/stocks/chartData/${symbol}`)
    }

    buyStock(amtShares:number, value:number, symbol:string) {
        const dataPost = {
            amtShares: amtShares,
            value: value,
            symbol: symbol
        }
        return this.http.post(`http://localhost:3000/stocks/buy`, dataPost)
    }

     sellStock(amtShares:number, value:number, symbol:string) {
        const dataPost = {
            amtShares: amtShares,
            value: value,
            symbol: symbol
        }
        return this.http.post(`http://localhost:3000/stocks/sell`, dataPost)
    }

    grabUserStocks(){
        return this.http.get(`http://localhost:3000/stocks/getValues`)
    }
}