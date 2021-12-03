import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPageComponent } from './search-page/search-page.component';
import { ListViewComponent } from './list-view/list-view.component';
import { ClusterViewComponent } from './cluster-view/cluster-view.component';
import { TreemapsComponent } from './treemaps/treemaps.component';
import { DistributionComponent } from './distribution/distribution.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFiltersComponent,
    SearchPageComponent,
    ListViewComponent,
    ClusterViewComponent,
    TreemapsComponent,
    DistributionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
