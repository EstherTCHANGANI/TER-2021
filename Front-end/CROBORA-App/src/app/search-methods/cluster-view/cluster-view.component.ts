import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Cluster } from 'src/models/cluster.model';
import { ArchiveData } from 'src/models/archiveData.model';
import { Image } from 'src/models/image.model';
import { FilterService } from 'src/services/filter.service';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-cluster-view',
  templateUrl: './cluster-view.component.html',
  styleUrls: ['./cluster-view.component.css']
})
export class ClusterViewComponent implements OnInit, OnChanges {

  selectedClusters: Cluster[] =  [];

  archiveDataList: ArchiveData[] = [];
  imageList: Image[] = [];

  constructor(public filterService: FilterService, private httpService: HttpService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.selectedClusters = this.filterService.getSelectedClusters();
  }

  getIconByClusterType(cluster: Cluster): string {
    if (cluster.type === 'evenement') return 'event';
    else if (cluster.type === 'personnalite') return 'emoji_people';
    else if (cluster.type === 'lieu') return 'home';
    else if (cluster.type === 'illustration') return 'auto_stories';
    else return 'block'
  }

  goToVisualisationPage(image: Image) {
    console.log(image);
  }

  getImagesByCluster(cluster: Cluster): Image[] {
    if (this.filterService.getSearchedImageByCluster().size > 0) {
      return this.filterService.getSearchedImageByCluster().get(cluster.value);
    } else return this.imageList;
  }

}
