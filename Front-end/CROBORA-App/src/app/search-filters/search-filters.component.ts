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

  @Input() eventChecked?: boolean;
  @Input() celebrityChecked?: boolean;
  @Input() locationChecked?: boolean;
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

  clusterList: Cluster[] = [];
  // clusterList: Cluster[] = [
  //   {value: 'Treaty', type: 'event'},
  //   {value: 'Treaty of Rome', type: 'event'},
  //   {value: 'Treaty of Lisbonne', type: 'event'},
  //   {value: 'Referendum', type: 'event'},
  //   {value: 'France Germany relations', type: 'event'},
  //   {value: 'Charles de Gaulle', type: 'celebrity'},
  //   {value: 'Robert Schuman', type: 'celebrity'},
  //   {value: 'François Mitterrand', type: 'celebrity'},
  //   {value: 'François Hollande', type: 'celebrity'},
  //   {value: 'Angela Merkel', type: 'celebrity'},
  //   {value: 'Hans-Gert Pöttering', type: 'celebrity'},
  //   {value: 'Nicolas Sarkozy', type: 'celebrity'},
  //   {value: 'Portugal', type: 'location'},
  //   {value: 'Paris', type: 'location'},
  //   {value: 'Lisbonne', type: 'location'},
  //   {value: 'Europe', type: 'location'},
  //   {value: 'Accident', type: 'illustration'},
  //   {value: 'Factory', type: 'illustration'},
  //   {value: 'Signature', type: 'illustration'},
  //   {value: 'Meeting', type: 'illustration'}
  // ];

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

  ngOnChanges(): void {
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
      this.clusterList = clusters;
      this.httpService.requestLoading = false;
      console.log('REQUEST CLUSTERS FROM API');
      this.filterClustersByType();
      this.autoCompleteClusters();
    });
  }

  /**
   * Functions related to search Bar :
   */
  private filterClustersByType() {
    this.clusterListFilteredByEvent = this.clusterList.filter(cluster => cluster.value && cluster.type === 'event');
    this.clusterListFilteredByPersonality = this.clusterList.filter(cluster => cluster.value && cluster.type === 'celebrity');
    this.clusterListFilteredByPlace = this.clusterList.filter(cluster => cluster.value && cluster.type === 'location');
    this.clusterListFilteredByIllustration = this.clusterList.filter(cluster => cluster.value && cluster.type === 'illustration');
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
    if(this.celebrityChecked) {
      this.clusterListFilteredByTypes.push(...this.clusterListFilteredByPersonality);
    } 
    if(this.locationChecked) {
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
    if(this.eventChecked || this.celebrityChecked || this.locationChecked || this.illustrationChecked) {
      document.querySelector('.searchBarDisabled')?.classList.add('disabled');
      document.querySelector('.searchBar')?.classList.remove('disabled');
    } else {
      document.querySelector('.searchBar')?.classList.add('disabled');
      document.querySelector('.searchBarDisabled')?.classList.remove('disabled');
    }
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
    let clusterTypesChecked: string[] = [];
    if(this.eventChecked) clusterTypesChecked.push('event');
    if(this.celebrityChecked) clusterTypesChecked.push('celebrity');
    if(this.locationChecked) clusterTypesChecked.push('location');
    if(this.illustrationChecked) clusterTypesChecked.push('illustration');
    // console.log(this.selectedClustersValues);
    // console.log(this.selectedClustersObjects);
    if (this.selectedClustersObjects.length > 0) {
      this.httpService.getImagesByCluster(clusterTypesChecked, this.selectedClustersObjects,1)
      .subscribe(images => {
        if(images) this.filterService.searchedImages = images;
        this.httpService.requestLoading = false;
      });
      this.filterService.selectedClusters.forEach( (cluster) => {
        let clusterList: Cluster[] = [];
        clusterList.push(cluster)
        this.httpService.getImagesByCluster(clusterTypesChecked, clusterList,1)
        .subscribe(images => {
          this.filterService.searchedImageByCluster.set(cluster.value, images);
          this.httpService.requestLoading = false;
        });
      });
    }
    // console.log(this.filterService.getSearchedImagesByCluster());
  }
  
  
  selectedChip(event: MatAutocompleteSelectedEvent): void {
    const clusterSelectedValue = event.option.value;
    this.selectedClustersValues.push(clusterSelectedValue);
    this.myControl.setValue(null);
  }
  
  /**
   * Return cluster type
   * @param value text of cluster
   * @returns 
   */
  private getClusterTypeByValue(value: string): string {
    const isEvent = this.clusterListFilteredByEvent.some(cluster => cluster.value === value)
    if(isEvent) {
      return 'event';
    }
    const isPersonality = this.clusterListFilteredByPersonality.some(cluster => cluster.value === value)
    if(isPersonality) {
      return 'celebrity';
    }
    const isPlace = this.clusterListFilteredByPlace.some(cluster => cluster.value === value)
    if(isPlace) {
      return 'location';
    }
    const isIllustration = this.clusterListFilteredByIllustration.some(cluster => cluster.value === value)
    if(isIllustration) {
      return 'illustration';
    }
    return 'no-type';
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
