import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LineChartComponent } from '../components/line-chart/line-chart.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'line-chart/:slug', component: LineChartComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full'}
]