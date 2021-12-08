import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ViewEncapsulation } from '@angular/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchPageComponent implements OnInit {

  eventChecked: boolean = false;
  personalityChecked: boolean = false;
  placeChecked: boolean = false;
  illustrationChecked: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleEventCheckbox(e: any) {
    console.log('event: ' + e.checked);
    this.eventChecked = e.checked;
  }
  togglePersonalityCheckbox(e: any) {
    console.log('personality: ' + e.checked);
    this.personalityChecked = e.checked;
  }
  togglePlaceCheckbox(e: any) {
    console.log('place: ' + e.checked);
    this.placeChecked = e.checked;
  }
  toggleIllustrationCheckbox(e: any) {
    console.log('illustration: ' + e.checked);
    this.illustrationChecked = e.checked;
  }

}
