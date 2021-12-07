import { Component, OnInit } from '@angular/core';

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
export class SearchFiltersComponent implements OnInit {

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
  ]

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

  ngOnInit(): void {
    console.log(this.selectedDatabase);
    console.log(this.selectedSearchType);
    console.log(this.selectedShowType);
    console.log(this.selectedSortType);
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
