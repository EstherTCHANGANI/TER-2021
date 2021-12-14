import { Injectable } from '@angular/core';
import { Cluster } from 'src/models/cluster.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService{

  selectedClusters: Cluster[] = [];

  getSelectedClusters() {
    return this.selectedClusters;
  }

  constructor() { }
}
