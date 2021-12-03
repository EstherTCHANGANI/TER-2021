import { Component, OnInit } from '@angular/core';

interface Filter {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})
export class SearchFiltersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  databases: Filter[] = [
    {value: 'ina', viewValue: 'INA'},
    {value: 'rai', viewValue: 'RAI'},
    {value: 'all', viewValue: 'All'},
    {value: 'new', viewValue: 'Import New'}
  ];

  searchTypes: Filter[] = [
    {value: 'clusters', viewValue: 'Clusters'},
    {value: 'titles', viewValue: 'Titles'}
  ];

  selectedDatabase: string = this.databases[0].value;
  selectedSearchType: string = this.searchTypes[0].value;

}
