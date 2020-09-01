import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../../shared/country';
import { CountryName } from '../../shared/countryName';
import { ApiService } from '../../services/api.service';


import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { lineChartColors, lineChartLegend, lineChartOptions, lineChartType} from '../../shared/config';

import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  countries: Country[];
  countriesName: CountryName[];

  @Input() slug: string = '';

  //line-chart
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: (ChartOptions & { annotation: any });
  lineChartColors: Color[];
  lineChartLegend: any;
  lineChartType: ChartType;

  show: boolean = false;
  datesOfChart: string[];
  casesOfChart: number[];

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    if(this.slug != undefined){
      this.spinner.show()
      this.apiService.getByCountry(this.slug)
        .subscribe(data => {
          this.countries = data
          this.graphic(this.countries);
        })
    }
  }

  config(): void{
    this.lineChartData = [
      { data: this.casesOfChart, label: 'Number of cases per day' },
    ];
    this.lineChartLabels = this.datesOfChart;
    this.lineChartOptions = lineChartOptions;
    this.lineChartColors = lineChartColors;
    this.lineChartLegend = lineChartLegend;
    this.lineChartType = lineChartType;
    this.show = true;
    // this.spinner.hide();
  }

  
  graphic(data: Country[]): void{
    let first: number = 0 ;
    let array: number[] = [];
    let array2: string[] = [];
    let i: number = 0;
    data.forEach(element => {
        array[i] =  Number(element.Cases) - first;
        array2[i]= element.Date.substring(6,10);
        first = Number(element.Cases);        
        i++;
    });
    array2.pop();
    this.casesOfChart = array;
    this.datesOfChart = array2;
    this.config();
  }

}
