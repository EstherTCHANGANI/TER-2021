import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Cluster } from 'src/models/cluster.model';
import { File } from 'src/models/file.model';
import { FilterService } from 'src/services/filter.service';

@Component({
  selector: 'app-cluster-view',
  templateUrl: './cluster-view.component.html',
  styleUrls: ['./cluster-view.component.css']
})
export class ClusterViewComponent implements OnChanges {

  @Input() eventChecked?: boolean;
  @Input() personalityChecked?: boolean;
  @Input() placeChecked?: boolean;
  @Input() illustrationChecked?: boolean;
  selectedClusters: Cluster[] =  [];

  fileList: File[] = [
    { title: "Signature du traité de Lisbonne", nbImage: 4, canal_de_transmission: null, date_de_diffusion: null,
      personality: ['Hans-Gert Pöttering'], event: ['Treaty', 'Treaty of Lisbonne'], place: ['Lisbonne', 'Portugal'], illustration: ['Signature'],},
    {title: "50 ans d'amitié franco-allemandes", nbImage: 12, canal_de_transmission: "TF1", date_de_diffusion: "2012-05-15 00:00:00",
      personality: ['Angela Merkel', 'Nicolas Sarkozy'], event: ['France Germany relations'], place: ['Europe'], illustration: ['Meeting'],}
   ]

  constructor(public filterService: FilterService) {
  }

  ngOnChanges(): void {
    this.selectedClusters = this.filterService.getSelectedClusters();
  }

  getIconByClusterType(cluster: Cluster): string {
    if (cluster.type === 'event') return 'event';
    else if (cluster.type === 'personality') return 'emoji_people';
    else if (cluster.type === 'place') return 'home';
    else if (cluster.type === 'illustration') return 'auto_stories';
    else return 'block'
  }

}
