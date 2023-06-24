import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  firstCurrency: string = 'UAH';
  firstCurrencyValue: number = 0;
  secondCurrency: string = 'USD';
  secondCurrencyValue: number = 0;
  conversionResult: number = 0;
  exchangeRates: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    const apiUrl = 'https://openexchangerates.org/api/latest.json';
    const appId = 'f570fd3119834287bd08da346645c104';
    

    const url = `${apiUrl}?app_id=${appId}`;

    this.http.get<any>(url).subscribe((data) => {
      this.exchangeRates = Object.entries(data.rates).map(([currency, rate]) => ({ currency, rate }));
    });
  }

  convertCurrencies1() {
    const firstCurrencyRate = this.getRateByCurrencyCode(this.firstCurrency);
    const secondCurrencyRate = this.getRateByCurrencyCode(this.secondCurrency);

    if (firstCurrencyRate && secondCurrencyRate) {
      const rawResult = (this.firstCurrencyValue * secondCurrencyRate) / firstCurrencyRate;
      this.conversionResult = parseFloat(rawResult.toFixed(2)); 
      this.secondCurrencyValue = this.conversionResult;
    }
  }

  convertCurrencies2() {
    const firstCurrencyRate = this.getRateByCurrencyCode(this.firstCurrency);
    const secondCurrencyRate = this.getRateByCurrencyCode(this.secondCurrency);

    if (firstCurrencyRate && secondCurrencyRate) {
      const rawResult = (this.secondCurrencyValue * firstCurrencyRate) / secondCurrencyRate;
      this.conversionResult = parseFloat(rawResult.toFixed(2)); 
      this.firstCurrencyValue = this.conversionResult;
    }
  }

  getRateByCurrencyCode(currencyCode: string) {
    const currency = this.exchangeRates.find(rate => rate.currency === currencyCode);
    return currency ? currency.rate : null;
  }
}
