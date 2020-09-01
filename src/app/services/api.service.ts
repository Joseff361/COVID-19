import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../shared/country';
import { CountryName } from '../shared/countryName';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  date: string;
  date2: string;

  constructor(
    private http: HttpClient
  ) { }


  getByCountry(country: string): Observable<Country[]>{
    
    this.date = this.today();

    return this.http.get<Country[]>(
      `https://api.covid19api.com/total/country/${country}/status/confirmed?from=2020-03-01T00:00:00Z&to=${this.date}T00:00:00Z`
    )
  }

  getCountriesName(): Observable<CountryName[]>{
    return this.http.get<CountryName[]>(
      'https://api.covid19api.com/countries'
    )
  }

  getSummaryByCountry(): Observable<any>{
    return this.http.get<any>('https://api.covid19api.com/summary');
  }

  today(): string{ 
    var today = new Date();
    var dd = String(today.getDate());
    var mm = String(today.getMonth() + 1);
    var yyyy = today.getFullYear();

    return  `${yyyy}-0${mm}-${dd}`
  }

}
