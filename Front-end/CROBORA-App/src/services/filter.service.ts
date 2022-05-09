import { Injectable } from '@angular/core';
import { Cluster } from 'src/models/cluster.model';
import { ArchiveData } from 'src/models/archiveData.model';
import { Image } from 'src/models/image.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService{

  selectedClusters: Cluster[] = [];
  searchedArchiveData: ArchiveData[] = [];
  searchedImages: Image[] = [];
  searchedArchiveDataByCluster = new Map<string, ArchiveData[]>();
  searchedImageByCluster = new Map<string, Image[]>();
  // selectedDatabase: string = 'all';

  newSort=false;
  newdata=false;

  getSelectedClusters() {
    return this.selectedClusters;
  }

  getSearchedArchiveData() {
    return this.searchedArchiveData;
  }

  getSearchedImages() {
    return this.searchedImages;
  }

  getSearchedArchiveDataByCluster() {
    return this.searchedArchiveDataByCluster;
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
