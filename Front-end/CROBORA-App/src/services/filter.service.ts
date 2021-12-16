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
  selectedDatabase: string = 'all';

  getSelectedClusters() {
    return this.selectedClusters;
  }

  getSearchedFiles() {
    return this.searchedfiles;
  }

  getSearchedFilesByCluster() {
    return this.searchedFilesByCluster;
  }

  getSelectedDatabase() {
    return this.selectedDatabase;
  }

  constructor() { }
}
