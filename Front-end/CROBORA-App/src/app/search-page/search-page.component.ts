import { Component, OnInit, EventEmitter } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { Filter } from '../../models/filter.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchPageComponent implements OnInit {

  listViewName: string = 'File View';

  eventChecked: boolean = false;
  celebrityChecked: boolean = false;
  locationChecked: boolean = false;
  illustrationChecked: boolean = false;
  showFiles: boolean = true;
  showTypeEvent = new EventEmitter<string>();

  showTypes: Filter[] = [
    {value: 'File', viewValue: 'Files'},
    {value: 'Thumbnail', viewValue: 'Thumbnails'}
  ];

  sortTypes: Filter[] = [
    {value: 'alphabetic', viewValue: 'Alphabetic'},
    {value: 'relevance', viewValue: 'Relevance'},
    {value: 'date', viewValue: 'Dates'},
  ];
  selectedShowType: string;
  selectedSortType: string;

  constructor(public filterService: FilterService) {
    this.selectedShowType = this.showTypes[0].value;
    this.selectedSortType = this.sortTypes[0].value;
  }

  ngOnInit(): void {
    this.eventChecked = this.filterService.getClusterChecked('event');
    this.celebrityChecked = this.filterService.getClusterChecked('celebrity');
    this.locationChecked = this.filterService.getClusterChecked('location');
    this.illustrationChecked = this.filterService.getClusterChecked('illustration');
  }

  // getCheckedValue(type: string) {
  //   return this.filterService.getClusterChecked(type);
  // }

  toggleEventCheckbox(e: any) {
    console.log('event: ' + e.checked);
    this.filterService.setClusterChecked('event', e.checked);
    this.eventChecked = e.checked;
  }
  toggleCelebrityCheckbox(e: any) {
    console.log('celebrity: ' + e.checked);
    this.filterService.setClusterChecked('celebrity', e.checked);
    this.celebrityChecked = e.checked;
  }
  toggleLocationCheckbox(e: any) {
    console.log('location: ' + e.checked);
    this.filterService.setClusterChecked('location', e.checked);
    this.locationChecked = e.checked;
  }
  toggleIllustrationCheckbox(e: any) {
    console.log('illustration: ' + e.checked);
    this.filterService.setClusterChecked('illustration', e.checked);
    this.illustrationChecked = e.checked;
  }

  renameFirstTab(showType: string) {
    this.listViewName = showType + ' View';
  }

  onShowTypeChange() {
    console.log(this.selectedShowType);
    this.showTypeEvent.emit(this.selectedShowType);
  }

  onSortTypeChange() {
    console.log(this.selectedSortType);
  }
}
