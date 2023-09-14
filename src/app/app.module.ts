import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CurrencyDetailsComponent } from './pages/currency-details/currency-details.component';
import { HeaderComponent } from './components/header/header.component';
import { ConverterComponent } from './components/converter/converter.component';
import { FormsModule } from '@angular/forms';
import { HomeCardsComponent } from './components/home-cards/home-cards.component';
import { GridCardComponent } from './components/grid-card/grid-card.component';
import { HistoricalChartComponent } from './components/historical-chart/historical-chart.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CurrencyDetailsComponent,
    HeaderComponent,
    ConverterComponent,
    HomeCardsComponent,
    GridCardComponent,
    HistoricalChartComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
