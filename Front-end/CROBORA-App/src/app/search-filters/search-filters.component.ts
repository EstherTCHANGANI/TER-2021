import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

interface Filter {
  value: string;
  viewValue: string;
}
interface Cluster {
  value: string;
  type: string;
}

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})
export class SearchFiltersComponent implements OnInit, OnChanges {

  @Input() eventChecked?: boolean;
  @Input() personalityChecked?: boolean;
  @Input() placeChecked?: boolean;
  @Input() illustrationChecked?: boolean;

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

  showTypes: Filter[] = [
    {value: 'file', viewValue: 'Files'},
    {value: 'thumbnail', viewValue: 'Thumbnails'}
  ];

  sortTypes: Filter[] = [
    {value: 'relevance', viewValue: 'Relevance'},
    {value: 'date', viewValue: 'Dates'},
    {value: 'alphabetic', viewValue: 'Alphabetic'},
  ];

  clusterList: Cluster[] = [
    {value: 'Treaty', type: 'event'},
    {value: 'Treaty of Rome', type: 'event'},
    {value: 'Referendum', type: 'event'},
    {value: 'Charles de Gaulle', type: 'personality'},
    {value: 'Robert Schuman', type: 'personality'},
    {value: 'François Mitterrand', type: 'personality'},
    {value: 'François Hollande', type: 'personality'},
    {value: 'Angela Merkel', type: 'personality'},
    {value: 'Portugal', type: 'place'},
    {value: 'Paris', type: 'place'},
    {value: 'Lisbonne', type: 'place'},
    {value: 'Accident', type: 'ilustration'},
    {value: 'Factory', type: 'ilustration'}
  ];

  clusterListFilteredByTypes: Cluster[] = [];
  clusterListFilteredByEvent: Cluster[] = [];
  clusterListFilteredByPersonality: Cluster[] = [];
  clusterListFilteredByPlace: Cluster[] = [];
  clusterListFilteredByIllustration: Cluster[] = [];
  filteredClusters: Observable<Cluster[]> | undefined;

  myControl = new FormControl();
  selectedDatabase: string;
  selectedSearchType: string;
  selectedShowType: string;
  selectedSortType: string;
  searchingValue: string = '';

  constructor() { 
    this.selectedDatabase = this.databases[0].value;
    this.selectedSearchType = this.searchTypes[0].value;
    this.selectedShowType = this.showTypes[0].value;
    this.selectedSortType = this.sortTypes[0].value;
  }

  ngOnInit() {
    this.activateSearchBar();
    this.filterClustersByType();
    this.autoCompleteClusters();
  }

  ngOnChanges(): void {
    this.activateSearchBar();
    this.autoCompleteClusters();
    // console.log(this.selectedDatabase);
    // console.log(this.selectedSearchType);
    // console.log(this.selectedShowType);
    // console.log(this.selectedSortType);
  }

  private filterClustersByType() {
      this.clusterListFilteredByEvent = this.clusterList.filter(cluster => cluster.type === 'event');
      this.clusterListFilteredByPersonality = this.clusterList.filter(cluster => cluster.type === 'personality');
      this.clusterListFilteredByPlace = this.clusterList.filter(cluster => cluster.type === 'place');
      this.clusterListFilteredByIllustration = this.clusterList.filter(cluster => cluster.type === 'ilustration');
  }

  private autoCompleteClusters() {
    this.filterClustersWithCheckboxValues();
    this.filteredClusters = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(cluster => typeof cluster === 'string' ? cluster : cluster.value),
      map(value => value ? this._filter(value) : this.clusterListFilteredByTypes.slice())
    );
  }

  private filterClustersWithCheckboxValues() {
    this.clusterListFilteredByTypes = [];
    if(this.eventChecked) {
      this.clusterListFilteredByTypes.push(...this.clusterListFilteredByEvent);
    }
    if(this.personalityChecked) {
      this.clusterListFilteredByTypes.push(...this.clusterListFilteredByPersonality);
    } 
    if(this.placeChecked) {
      this.clusterListFilteredByTypes.push(...this.clusterListFilteredByPlace);
    }
    if(this.illustrationChecked) {
      this.clusterListFilteredByTypes.push(...this.clusterListFilteredByIllustration);
    }
  }

  private _filter(value: string): Cluster[] {
    const filterValue = value.toLowerCase();
    return this.clusterListFilteredByTypes.filter(cluster => cluster.value.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(cluster: Cluster): string {
    return cluster && cluster.value ? cluster.value : '';
  }

  private activateSearchBar() {
    if(this.eventChecked || this.personalityChecked || this.placeChecked || this.illustrationChecked) {
      document.querySelector('.searchBarDisabled')?.classList.add('disabled');
      document.querySelector('.searchBar')?.classList.remove('disabled');
    } else {
      document.querySelector('.searchBar')?.classList.add('disabled');
      document.querySelector('.searchBarDisabled')?.classList.remove('disabled');
    }
  }

  onDatabaseChange() {
    console.log(this.selectedDatabase);
  }

  onSearchTypeChange() {
    console.log(this.selectedSearchType);
  }

  onShowTypeChange() {
    console.log(this.selectedShowType);
  }

  onSortTypeChange() {
    console.log(this.selectedSortType);
  }

  onSearchKey(event: any) {
    this.searchingValue = event.target.value;
    console.log(this.searchingValue);
  }

}
