import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

interface Title {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArchivePageComponent implements OnInit {

  constructor() { }

  archiveTitle: Title={value: '50_ans_damitie_franco-allemande', viewValue: '50 ans d\'amitié franco-allemande'}

  ngOnInit(): void {
  }

  addToFav():void{

  }
}
