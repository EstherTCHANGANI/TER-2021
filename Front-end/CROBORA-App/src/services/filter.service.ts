import { Injectable } from '@angular/core';
import { Cluster } from 'src/models/cluster.model';
import { File } from 'src/models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService{

  selectedClusters: Cluster[] = [];
  searchedfiles: File[] = [];
  searchedFilesByCluster = new Map<string, File[]>();
  // selectedDatabase: string = 'all';

  getSelectedClusters() {
    return this.selectedClusters;
  }

  getSearchedFiles() {
    return this.searchedfiles;
  }

  getSearchedFilesByCluster() {
    return this.searchedFilesByCluster;
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
