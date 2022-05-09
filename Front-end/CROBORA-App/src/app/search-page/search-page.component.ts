import { Component, OnInit, EventEmitter } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { Filter } from '../../models/filter.model';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchPageComponent implements OnInit {

  listViewName: string = 'File View';

  sortTypes: Filter[] = [
    {value: 'alphabetic', viewValue: 'Alphabetic'},
    {value: 'relevance', viewValue: 'Relevance'},
    {value: 'date', viewValue: 'Dates'},
  ];
  selectedSortType: string;

  constructor(public filterService: FilterService) {
    this.selectedSortType = this.sortTypes[0].value;
  }

  ngOnInit(): void {
  }

  // getCheckedValue(type: string) {
  //   return this.filterService.getClusterChecked(type);
  // }

  renameFirstTab(showType: string) {
    this.listViewName = showType + ' View';
  }

  onSortTypeChange() {
    console.log(this.selectedSortType);
  }
}
