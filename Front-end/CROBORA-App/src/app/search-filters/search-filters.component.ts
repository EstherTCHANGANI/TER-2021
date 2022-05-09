import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FilterService } from 'src/services/filter.service';
import { Cluster } from '../../models/cluster.model';
import { Filter } from '../../models/filter.model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})
export class SearchFiltersComponent implements OnInit, OnChanges {

  @Output() showTypeEvent = new EventEmitter<string>();
  
  databases: Filter[] = [
    {value: 'ina', viewValue: 'INA'},
    {value: 'rai', viewValue: 'RAI'},
    {value: 'all', viewValue: 'All'},
    {value: 'new', viewValue: 'Import New'}
  ];

  searchTypes: Filter[] = [
    {value: 'cluster', viewValue: 'Clusters'},
    {value: 'title', viewValue: 'Titles'}
  ];

  autocompleteCluster:Observable<Cluster[]>; 
  clusterList:Cluster[];

  // variables for search bar :

  // @ViewChild('clusterInput', {static: true}) clusterInput: ElementRef<HTMLInputElement>;

  myControl = new FormControl();
  selectedDatabase: string;
  selectedSearchType: string;
  searchingValue: string = '';

  // variables for cluster chips :

  selectedClustersValues: string[] = [];
  selectedClustersObjects: Cluster[] = [];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  separatorKeysCodes: number[] = [];
  lastColorChip: string;
  actualColorChip: string;

  constructor(public filterService: FilterService, private httpService: HttpService) { 
    this.selectedSearchType = this.filterService.getSelectedSearchType();
    this.selectedDatabase = this.filterService.getSelectedDatabase();
  }

  async ngOnInit() {
    // this.activateSearchBar();
    await this.requestClusters();
    console.log(this.clusterList);
  }

  ngOnChanges() {
    // this.activateSearchBar();
    this.autoCompleteClusters();
    // console.log(this.selectedDatabase);
    // console.log(this.selectedSearchType);
    // console.log(this.selectedShowType);
    // console.log(this.selectedSortType);
  }

  private async requestClusters() {
  this.httpService.getClusters()
    .subscribe(clusters => {
      this.clusterList = clusters.filter(cluster => cluster.value != null && cluster.value != "");
      this.httpService.requestLoading = false;
      console.log('REQUEST CLUSTERS FROM API');
      this.autoCompleteClusters();
      console.log(this.clusterList);
    });
  }

  /**
   * Functions related to search Bar :
   */

  private autoCompleteClusters() {
    this.autocompleteCluster = this.myControl.valueChanges
    .pipe(
      startWith(''),
      // map(cluster => typeof cluster === 'string' ? cluster : cluster.value),
      map(value => value ? 
        this._filter(value) : this.clusterList.slice()
          .sort(function(a,b){return a.value.localeCompare(b.value);})) //sort by alphabetical order
    );
  }

  private _filter(value: string): Cluster[] {
    const filterValue = value.toLowerCase();
    return this.clusterList.filter(cluster => cluster.value.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(cluster: Cluster): string {
    return cluster && cluster.value ? cluster.value : '';
  }

  onSearchByTitle(value: string) {
    console.log('searching: ' + value);
    this.httpService.getImagesByTitle(value)
    .subscribe(images => {
      let filteredImages = [];
      if(images) {
        const titles = images.map(image => image[0].document_title);
        console.log(titles);
        filteredImages = images.filter(({document_title}, index) => !titles.includes(document_title, index + 1))
      }
      console.log(filteredImages)
      this.filterService.searchedImages = filteredImages;
      this.httpService.requestLoading = false;
    });
  }

  /**
   * Functions related to Cluster Chips :
   */
   async addChip(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    // Add a cluster
    if ((value || '').trim()) {
      if(!this.selectedClustersValues.includes(value.trim())) {
        this.selectedClustersValues.push(value.trim());
      }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.myControl.setValue(null);
  }

  async removeChip(selectedCluster: Cluster) {
    const index = this.selectedClustersValues.indexOf(selectedCluster.value);
    if (index >= 0) {
      this.selectedClustersValues.splice(index, 1);
    }
    this.selectedClustersObjects = this.selectedClustersObjects.filter((cluster) => cluster.value !== selectedCluster.value);
    if (this.selectedClustersObjects.length > 0) {
      this.filterService.selectedClusters = [...this.selectedClustersObjects];
    } else this.filterService.selectedClusters = [];
    this.requestSearchImages();
    // console.log(this.selectedClustersObjects);
  }

  getSelectedCluster(selectedCluster: Cluster, event: any) {
    if (event.isUserInput) {    // ignore on deselection of the previous option
      if (!this.selectedClustersObjects.includes(selectedCluster)) {
        this.selectedClustersObjects.push(selectedCluster);
      }
      this.requestSearchImages();
      this.filterService.selectedClusters = this.selectedClustersObjects;
      console.log(this.selectedClustersObjects);
      this.myControl.setValue(null);

      let chipElement = document.querySelectorAll('.mat-chip');
      let lastChild = chipElement[chipElement.length - 1];
      this.lastColorChip = this.actualColorChip;
      if(selectedCluster.type === 'event') {
        this.actualColorChip = 'brown';
      }
      else if(selectedCluster.type === 'celebrity') {
        this.actualColorChip = 'blue';
      }
      else if(selectedCluster.type === 'location') {
        this.actualColorChip = 'red';
      }
      else if(selectedCluster.type === 'illustration') {
        this.actualColorChip = 'green';
      }
      // adding css class dynamically
      if(chipElement.length > 0 && !lastChild.classList.contains('eventChip') && !lastChild.classList.contains('celebrityChip') && !lastChild.classList.contains('locationChip') && !lastChild.classList.contains('illustrationChip')) {
        if(this.lastColorChip === 'brown') {
          lastChild.classList.add('eventChip');
        }
        else if(this.lastColorChip === 'blue') {
          lastChild.classList.add('celebrityChip');
        }
        else if(this.lastColorChip === 'red') {
          lastChild.classList.add('locationChip');
        }
        else if(this.lastColorChip === 'green') {
          lastChild.classList.add('illustrationChip');
        }
      }
    }
    event.value = '';
  }

  private requestSearchImages() {
    let categoriesChecked = [];
    if (this.selectedClustersObjects.some(categorie => categorie.type == 'event')){
      categoriesChecked.push('event')
    }
    if (this.selectedClustersObjects.some(categorie => categorie.type == 'celebrity')){
      categoriesChecked.push('celebrity')
    }
    if (this.selectedClustersObjects.some(categorie => categorie.type == 'location')){
      categoriesChecked.push('location')
    }
    if (this.selectedClustersObjects.some(categorie => categorie.type == 'illustration')){
      categoriesChecked.push('illustration')
    }
    console.log(categoriesChecked);
    // console.log(this.selectedClustersObjects);
    if (this.selectedClustersObjects.length > 0) {
      this.httpService.getImagesByCluster(categoriesChecked, this.selectedClustersObjects, 1)
        .subscribe(images => {
          if (images)
            this.filterService.searchedImages = images;
          this.httpService.requestLoading=false;
          this.filterService.newdata=true;
        });
        
/*      this.filterService.selectedClusters.forEach( (cluster) => {
        let clusterList: Cluster[] = [];
        clusterList.push(cluster)
        this.httpService.getImagesByCluster(categoriesChecked, clusterList,1)
        .subscribe(images => {
          this.filterService.searchedImageByCluster.set(cluster.value, images);
          this.httpService.requestLoading = false;
        });
      });*/
      }
    // console.log(this.filterService.getSearchedImagesByCluster());
  }
  
  
  selectedChip(event: MatAutocompleteSelectedEvent): void {
    const clusterSelectedValue = event.option.value;
    this.selectedClustersValues.push(clusterSelectedValue);
    this.myControl.setValue(null);
  }

  onDatabaseChange() {
    console.log(this.selectedDatabase);
    this.filterService.setSelectedDatabase(this.selectedDatabase);
  }

  onSearchTypeChange() {
    console.log(this.selectedSearchType);
    this.filterService.setSelectedSearchType(this.selectedSearchType);
  }

  onSearchKey(event: any) {
    this.searchingValue = event.target.value;
    console.log(this.searchingValue);
  }

}
