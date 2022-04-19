import { Injectable } from '@angular/core';
import { Cluster } from 'src/models/cluster.model';
import { Subject } from 'src/models/subject.model';
import { Image } from 'src/models/image.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService{

  selectedClusters: Cluster[] = [];
  searchedSubjects: Subject[] = [];
  searchedImages: Image[] = [];
  searchedSubjectByCluster = new Map<string, Subject[]>();
  searchedImageByCluster = new Map<string, Image[]>();
  // selectedDatabase: string = 'all';

  getSelectedClusters() {
    return this.selectedClusters;
  }

  getSearchedSubjects() {
    return this.searchedSubjects;
  }

  getSearchedImages() {
    return this.searchedImages;
  }

  getSearchedSubjectByCluster() {
    return this.searchedSubjectByCluster;
  }

  getSearchedImageByCluster() {
    return this.searchedImageByCluster;
  }

  setSelectedDatabase(value: string) {
    localStorage.setItem('selectedDatabase', value);
  }

  getSelectedDatabase() {
    const value = localStorage.getItem('selectedDatabase');
    if(!value) {
      return 'all';
    }
    else return value;
  }

  setSelectedSearchType(value: string) {
    localStorage.setItem('selectedSearchType', value);
  }

  getSelectedSearchType() {
    const value = localStorage.getItem('selectedSearchType');
    if(!value) {
      return 'cluster';
    }
    else return value;
  }

  setClusterChecked(type: string, value: boolean) {
    localStorage.setItem(type + 'Checked', value.toString());
  }

  getClusterChecked(type: string): boolean {
    const value = localStorage.getItem(type + 'Checked');
    if(!value) {
      return false;
    }
    else return JSON.parse(value);
  }

  constructor() { }
}
