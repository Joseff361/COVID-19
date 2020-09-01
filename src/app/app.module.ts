import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ChartsModule } from 'ng2-charts';
import { ApiService } from '../app/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    NavbarComponent,
    SearchComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
