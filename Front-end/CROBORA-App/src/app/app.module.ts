import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {HttpClientModule} from '@angular/common/http'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPageComponent } from './search-page/search-page.component';
import { ListViewComponent } from './search-methods/list-view/list-view.component';
import { ClusterViewComponent } from './search-methods/cluster-view/cluster-view.component';
import { TreemapsComponent } from './search-methods/treemaps/treemaps.component';
import { DistributionComponent } from './search-methods/distribution/distribution.component';
import { ArchivePageComponent } from './observation-pages/archive-page/archive-page.component';
import { ThumbnailsBoxComponent } from './observation-pages/archive/thumbnails-box/thumbnails-box.component';
import { IndexCROBORABoxComponent } from './observation-pages/archive/index-crobora-box/index-crobora-box.component';
import { OriginalinfoBoxComponent } from './observation-pages/archive/originalinfo-box/originalinfo-box.component';
import { HeadbandCroboraComponent } from './headband-crobora/headband-crobora.component';
import { ListCardComponent } from './search-methods/search-utils/list-card/list-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFiltersComponent,
    SearchPageComponent,
    ListViewComponent,
    ClusterViewComponent,
    TreemapsComponent,
    DistributionComponent,
    ArchivePageComponent,
    ThumbnailsBoxComponent,
    IndexCROBORABoxComponent,
    OriginalinfoBoxComponent,
    HeadbandCroboraComponent,
    ListCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatTabsModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatTooltipModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    MatPaginatorModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
