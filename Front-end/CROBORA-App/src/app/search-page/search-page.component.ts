import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchPageComponent implements OnInit {

  listViewName: string = 'File View';

  eventChecked: boolean = false;
  personalityChecked: boolean = false;
  placeChecked: boolean = false;
  illustrationChecked: boolean = false;
  showFiles: boolean = true;

  constructor(private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.eventChecked = this.filterService.getClusterChecked('event');
    this.personalityChecked = this.filterService.getClusterChecked('personality');
    this.placeChecked = this.filterService.getClusterChecked('place');
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
  togglePersonalityCheckbox(e: any) {
    console.log('personality: ' + e.checked);
    this.filterService.setClusterChecked('personality', e.checked);
    this.personalityChecked = e.checked;
  }
  togglePlaceCheckbox(e: any) {
    console.log('place: ' + e.checked);
    this.filterService.setClusterChecked('place', e.checked);
    this.placeChecked = e.checked;
  }
  toggleIllustrationCheckbox(e: any) {
    console.log('illustration: ' + e.checked);
    this.filterService.setClusterChecked('illustration', e.checked);
    this.illustrationChecked = e.checked;
  }

  renameFirstTab(showType: string) {
    this.listViewName = showType + ' View';
  }

}
