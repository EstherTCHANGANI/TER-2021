import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SearchFiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
