import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Currency converter';
  exchangeRates: any[] =[];
  selectedPairs: any[] = [];

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.fetchCurrencyData();
  }

  fetchCurrencyData() {
    const apiUrl = 'https://openexchangerates.org/api/latest.json';
    const appId = 'f570fd3119834287bd08da346645c104'; 

    const url = `${apiUrl}?app_id=${appId}&symbols=GBP,EUR,USD,UAH`;

    this.http.get<any>(url).subscribe((data) => {
      this.exchangeRates = Object.entries(data.rates).map(([currency, rate]) => ({ currency, rate }));

      this.compareCurrencies('UAH', 'USD', 'https://www.countryflagicons.com/FLAT/64/US.png'); 
      this.compareCurrencies('UAH', 'GBP', 'https://www.countryflagicons.com/FLAT/64/GB.png'); 
      this.compareCurrencies('UAH', 'EUR', 'https://www.countryflagicons.com/FLAT/64/EU.png'); 
    });
  }

  compareCurrencies(currency1: string, currency2: string, img: string,) {
    const rate1 = this.getRateByCurrencyCode(currency1);
    const rate2 = this.getRateByCurrencyCode(currency2);
    if (rate1 && rate2) {
      const exchangeRate = (rate1 / rate2).toFixed(2);
      this.selectedPairs.push({ currency1, currency2, exchangeRate, img });
    }
  }

  getRateByCurrencyCode(currencyCode: string) {
    const currency = this.exchangeRates.find(rate => rate.currency === currencyCode);
    return currency ? currency.rate : null;
  }
}
