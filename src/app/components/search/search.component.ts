import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Summary } from '../../shared/summary';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  names: String[];
  selected: string = '';
  country: string = '';
  sortCountries: String[] = [''];
  summary: Summary[];
  summarysCountry: Summary;
  show: boolean  = false;
  showSad: boolean  = false;
  selectedCountry: string;
  showReallySad: boolean = false;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.apiService.getCountriesName()
    .subscribe(data => {
      this.names = this.sortCustome(data);
    })
  }

  Search(){
    this.country = this.selected;
    this.show = false;
    this.showSad = false;
    this.showReallySad = false;
    this.apiService.getSummaryByCountry()
      .subscribe(summary => {
        this.summary = summary.Countries;
        this.summary.forEach(sc => {
          if(sc.Country == this.country){
            this.summarysCountry = sc;
            this.show = true
            this.showSad = false;
          }
        })
      })

     if(this.show == false){
       this.showSad = true
       this.spinner.show();
       setTimeout(() => {
          this.spinner.hide();   
          this.showReallySad = true;
       }, 4000);
     }
  }

  sortCustome(data: any): String[]{
    let i: number = 0;
    data.forEach(day => {
        this.sortCountries[i] = day.Country;
        i++
    });
    return this.sortCountries.sort();
  }

  onSelect(slug: string){
    this.selectedCountry = slug;
  }

}
