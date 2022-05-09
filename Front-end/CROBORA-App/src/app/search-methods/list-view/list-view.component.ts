import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FilterService } from 'src/services/filter.service';
import { Image } from '../../../models/image.model';
import { HttpService } from '../../../services/http.service';
import {PageEvent} from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  lengthPaginator=0;
  pageSize = 100;
  pageIndex=0;
 
  eventClusters: string[] = [];
  celebrityClusters: string[] = [];
  locationClusters: string[] = [];
  illustrationClusters: string[] = [];

  changeDetected=false;
  imagesFetched:Image[]=[];
  displayedImages=[];
  sortedData:Image[]=[];

  noChangeCount=0;

  constructor(public filterService: FilterService, public httpService: HttpService) {
  }

  ngOnInit():void{
  }

  ngDoCheck():void{
    if (this.filterService.newSort){
      this.changeDetected=true;
      this.imagesFetched=this.sortedData;
      console.log("sorted")
      this.updatePage();
      this.filterService.newSort=false;
      console.log(this.displayedImages);
    }
    if(this.filterService.newdata){
        this.changeDetected=true;
        this.imagesFetched=this.getImagesByDB();
        this.sortedData=this.imagesFetched;
        this.resetPage();
        this.filterService.newdata=false;
    }
/*    if (this.changeDetected) {
      this.noChangeCount = 0;
  } else {
      // log that hook was called when there was no relevant change.
      const count = this.noChangeCount += 1;
      const noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
      console.log(noChangeMsg);
  }*/

  this.changeDetected = false;
  }

  getClustersQuantity(image: Image): number {
    return image.event.length + image.celebrity.length + image.location.length + image.illustration.length;
  }

  goToVisualisationPage(image: Image) {
    console.log(image);
  }

  getImagesByDB(): Image[] {
    let imagesFromRequest = this.filterService.getSearchedImages()
    if(this.filterService.getSelectedDatabase() === 'ina') {
      return imagesFromRequest.filter( image => image[0].source.includes('INA'));
    } 
    else if(this.filterService.getSelectedDatabase() === 'rai') {
      return imagesFromRequest.filter( image => image[0].source.includes('RAI'));
    } 
    else return imagesFromRequest; // 'all' or others
  }

  getPage(event?:PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    let indexStart = this.pageSize*this.pageIndex;
    let indexEnd= indexStart+this.pageSize > this.lengthPaginator ? this.lengthPaginator : indexStart+this.pageSize;
    this.displayedImages = this.imagesFetched.slice(indexStart,indexEnd);
  }

  resetPage(){
    this.pageIndex=0;
    this.lengthPaginator=this.imagesFetched.length;
    let indexEnd= this.pageSize > this.lengthPaginator ? this.lengthPaginator : this.pageSize;
    this.displayedImages = this.imagesFetched.slice(0,indexEnd);
  }

  updatePage(){
    let indexStart = this.pageSize*this.pageIndex;
    let indexEnd= indexStart+this.pageSize > this.lengthPaginator ? this.lengthPaginator : indexStart+this.pageSize;
    this.displayedImages = this.imagesFetched.slice(indexStart,indexEnd);
  }

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'archiveName':
          return compare(a[0].document_title, b[0].document_title, isAsc);
        case 'archiveDate':
          return compare(a[0].day_airing, b[0].day_airing, isAsc);
        case 'archiveChannel':
          return compare(a[0].channel, b[0].channel, isAsc);
        case 'archiveLanguage':
          return compare(a[0].language, b[0].language, isAsc);
        default:
          return 0;
      }
    });
    this.filterService.newSort=true;
  }
}

  function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



/*
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FilterService } from 'src/services/filter.service';
import { Image } from '../../../models/image.model';
import { HttpService } from '../../../services/http.service';
import {PageEvent} from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  lengthPaginator=0;
  pageSize = 50;
  pageIndex=0;
 
  eventClusters: string[] = [];
  celebrityClusters: string[] = [];
  locationClusters: string[] = [];
  illustrationClusters: string[] = [];

  changeDetected=false;
  imagesFetched:Image[]=[];
  displayedImages=[];
  sortedData:Image[]=[];

  noChangeCount=0;

  constructor(public filterService: FilterService, public httpService: HttpService) {
  }

  ngOnInit():void{
  }

  ngDoCheck():void{
    if (this.filterService.newSort){
      this.changeDetected=true;
      this.imagesFetched=this.sortedData;
      console.log("sorted")
      this.updatePage();
      this.filterService.newSort=false;
      console.log(this.displayedImages);
    }
    if(this.filterService.newdata){
        this.changeDetected=true;
        this.imagesFetched=this.getImagesByDB();
        this.sortedData=this.imagesFetched;
        this.resetPage();
        this.filterService.newdata=false;
    }
/*    if (this.changeDetected) {
      this.noChangeCount = 0;
  } else {
      // log that hook was called when there was no relevant change.
      const count = this.noChangeCount += 1;
      const noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
      console.log(noChangeMsg);
  } replacer fin de commentaire ici

  this.changeDetected = false;
  }

  getClustersQuantity(image: Image): number {
    return image.event.length + image.celebrity.length + image.location.length + image.illustration.length;
  }

  goToVisualisationPage(image: Image) {
    console.log(image);
  }

  getImagesByDB(): Image[] {
    let imagesFromRequest = this.filterService.getSearchedImages()
    if(this.filterService.getSelectedDatabase() === 'ina') {
      return imagesFromRequest.filter( image => image[0].source.includes('INA'));
    } 
    else if(this.filterService.getSelectedDatabase() === 'rai') {
      return imagesFromRequest.filter( image => image[0].source.includes('RAI'));
    } 
    else return imagesFromRequest; // 'all' or others
  }

  getPage(event?:PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    let indexStart = this.pageSize*this.pageIndex;
    let indexEnd= indexStart+this.pageSize > this.lengthPaginator ? this.lengthPaginator : indexStart+this.pageSize;
    this.displayedImages = this.imagesFetched.slice(indexStart,indexEnd);
  }

  resetPage(){
    this.pageIndex=0;
    this.lengthPaginator=this.imagesFetched.length;
    let indexEnd= this.pageSize > this.lengthPaginator ? this.lengthPaginator : this.pageSize;
    this.displayedImages = this.imagesFetched.slice(0,indexEnd);
  }

  updatePage(){
    let indexStart = this.pageSize*this.pageIndex;
    let indexEnd= indexStart+this.pageSize > this.lengthPaginator ? this.lengthPaginator : indexStart+this.pageSize;
    this.displayedImages = this.imagesFetched.slice(indexStart,indexEnd);
  }

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'archiveName':
          return compare(a[0].document_title, b[0].document_title, isAsc);
        case 'archiveDate':
          return compare(a[0].day_airing, b[0].day_airing, isAsc);
        case 'archiveChannel':
          return compare(a[0].document_title, b[0].document_title, isAsc);
        case 'archiveLanguage':
          return compare(a[0].document_title, b[0].document_title, isAsc);
        default:
          return 0;
      }
    });
    this.filterService.newSort=true;
  }
}

  function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

*/