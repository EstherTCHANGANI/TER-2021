import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FilterService } from 'src/services/filter.service';
import { Cluster } from '../../models/cluster.model';
import { Filter } from '../../models/filter.model';

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

  showTypes: Filter[] = [
    {value: 'File', viewValue: 'Files'},
    {value: 'Thumbnail', viewValue: 'Thumbnails'}
  ];

  sortTypes: Filter[] = [
    {value: 'relevance', viewValue: 'Relevance'},
    {value: 'date', viewValue: 'Dates'},
    {value: 'alphabetic', viewValue: 'Alphabetic'},
  ];

  clusterList: Cluster[] = [
    {value: 'Treaty', type: 'event'},
    {value: 'Treaty of Rome', type: 'event'},
    {value: 'Treaty of Lisbonne', type: 'event'},
    {value: 'Referendum', type: 'event'},
    {value: 'France Germany relations', type: 'event'},
    {value: 'Charles de Gaulle', type: 'personality'},
    {value: 'Robert Schuman', type: 'personality'},
    {value: 'François Mitterrand', type: 'personality'},
    {value: 'François Hollande', type: 'personality'},
    {value: 'Angela Merkel', type: 'personality'},
    {value: 'Hans-Gert Pöttering', type: 'personality'},
    {value: 'Nicolas Sarkozy', type: 'personality'},
    {value: 'Portugal', type: 'place'},
    {value: 'Paris', type: 'place'},
    {value: 'Lisbonne', type: 'place'},
    {value: 'Europe', type: 'place'},
    {value: 'Accident', type: 'illustration'},
    {value: 'Factory', type: 'illustration'},
    {value: 'Signature', type: 'illustration'},
    {value: 'Meeting', type: 'illustration'}
  ];

  // variables for search bar :

  // @ViewChild('clusterInput', {static: true}) clusterInput: ElementRef<HTMLInputElement>;

  clusterListFilteredByTypes: Cluster[] = [];
  clusterListFilteredByEvent: Cluster[] = [];
  clusterListFilteredByPersonality: Cluster[] = [];
  clusterListFilteredByPlace: Cluster[] = [];
  clusterListFilteredByIllustration: Cluster[] = [];
  filteredClusters?: Observable<Cluster[]>;

  myControl = new FormControl();
  selectedDatabase: string;
  selectedSearchType: string;
  selectedShowType: string;
  selectedSortType: string;
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

  constructor(private filterService: FilterService) { 
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

  /**
   * Functions related to search Bar :
   */
  private filterClustersByType() {
      this.clusterListFilteredByEvent = this.clusterList.filter(cluster => cluster.type === 'event');
      this.clusterListFilteredByPersonality = this.clusterList.filter(cluster => cluster.type === 'personality');
      this.clusterListFilteredByPlace = this.clusterList.filter(cluster => cluster.type === 'place');
      this.clusterListFilteredByIllustration = this.clusterList.filter(cluster => cluster.type === 'illustration');
  }

  private autoCompleteClusters() {
    this.filterClustersWithCheckboxValues();
    this.filteredClusters = this.myControl.valueChanges
    .pipe(
      startWith(''),
      // map(cluster => typeof cluster === 'string' ? cluster : cluster.value),
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

  /**
   * Functions related to Cluster Chips :
   */
   addChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add a cluster
    if ((value || '').trim()) {
      this.selectedClustersValues.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.myControl.setValue(null);
  }

  removeChip(selectedCluster: Cluster): void {
    // const index = this.selectedClustersValues.indexOf(cluster.value);
    // if (index >= 0) {
    //   this.selectedClustersValues.splice(index, 1);
    // }
    this.selectedClustersObjects = this.selectedClustersObjects.filter((cluster) => cluster.value !== selectedCluster.value);
    this.filterService.selectedClusters = [...this.selectedClustersObjects];
    console.log(this.selectedClustersObjects);
  }

  getSelectedCluster(selectedCluster: Cluster, event: any): void {
    if (event.isUserInput) {    // ignore on deselection of the previous option

      if (!this.selectedClustersObjects.includes(selectedCluster)) {
        this.selectedClustersObjects.push(selectedCluster);
      }
      this.filterService.selectedClusters = this.selectedClustersObjects;
      console.log(this.selectedClustersObjects);
      this.myControl.setValue(null);

      let chipElement = document.querySelectorAll('.mat-chip');
      let lastChild = chipElement[chipElement.length - 1];
      this.lastColorChip = this.actualColorChip;
      if(selectedCluster.type === 'event') {
        this.actualColorChip = 'brown';
      }
      else if(selectedCluster.type === 'personality') {
        this.actualColorChip = 'blue';
      }
      else if(selectedCluster.type === 'place') {
        this.actualColorChip = 'red';
      }
      else if(selectedCluster.type === 'illustration') {
        this.actualColorChip = 'green';
      }
      // adding css class dynamically
      if(chipElement.length > 0 && !lastChild.classList.contains('eventChip') && !lastChild.classList.contains('personalityChip') && !lastChild.classList.contains('placeChip') && !lastChild.classList.contains('illustrationChip')) {
        if(this.lastColorChip === 'brown') {
          lastChild.classList.add('eventChip');
        }
        else if(this.lastColorChip === 'blue') {
          lastChild.classList.add('personalityChip');
        }
        else if(this.lastColorChip === 'red') {
          lastChild.classList.add('placeChip');
        }
        else if(this.lastColorChip === 'green') {
          lastChild.classList.add('illustrationChip');
        }
      }
    }
    event.value = '';
  }
  
  
  selectedChip(event: MatAutocompleteSelectedEvent): void {
    const clusterSelectedValue = event.option.value;
    this.selectedClustersValues.push(clusterSelectedValue);
    this.myControl.setValue(null);
  /*
    let chipElement = document.querySelectorAll('.mat-chip');
    let lastChild = chipElement[chipElement.length - 1];
    this.lastColorChip = this.actualColorChip;
    if(this.getClusterTypeByValue(clusterSelected) === 'event') {
      this.actualColorChip = 'brown';
    }
    else if(this.getClusterTypeByValue(clusterSelected) === 'personality') {
      this.actualColorChip = 'blue';
    }
    else if(this.getClusterTypeByValue(clusterSelected) === 'place') {
      this.actualColorChip = 'red';
    }
    else if(this.getClusterTypeByValue(clusterSelected) === 'illustration') {
      this.actualColorChip = 'green';
    }
    // adding css class dynamically
    if(chipElement.length > 0 && !lastChild.classList.contains('eventChip') && !lastChild.classList.contains('personalityChip') && !lastChild.classList.contains('placeChip') && !lastChild.classList.contains('illustrationChip')) {
      if(this.lastColorChip === 'brown') {
        lastChild.classList.add('eventChip');
      }
      else if(this.lastColorChip === 'blue') {
        lastChild.classList.add('personalityChip');
      }
      else if(this.lastColorChip === 'red') {
        lastChild.classList.add('placeChip');
      }
      else if(this.lastColorChip === 'green') {
        lastChild.classList.add('illustrationChip');
      }
    }*/
  }
  
  private getClusterTypeByValue(value: string): string {
    const isEvent = this.clusterListFilteredByEvent.some(cluster => cluster.value === value)
    if(isEvent) {
      return 'event';
    }
    const isPersonality = this.clusterListFilteredByPersonality.some(cluster => cluster.value === value)
    if(isPersonality) {
      return 'personality';
    }
    const isPlace = this.clusterListFilteredByPlace.some(cluster => cluster.value === value)
    if(isPlace) {
      return 'place';
    }
    const isIllustration = this.clusterListFilteredByIllustration.some(cluster => cluster.value === value)
    if(isIllustration) {
      return 'illustration';
    }
    return 'no-type';
  }

  onDatabaseChange() {
    console.log(this.selectedDatabase);
  }

  onSearchTypeChange() {
    console.log(this.selectedSearchType);
  }

  onShowTypeChange() {
    console.log(this.selectedShowType);
    this.showTypeEvent.emit(this.selectedShowType);
  }

  onSortTypeChange() {
    console.log(this.selectedSortType);
  }

  onSearchKey(event: any) {
    this.searchingValue = event.target.value;
    console.log(this.searchingValue);
  }

}
