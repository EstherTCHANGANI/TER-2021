import { Component, Input, OnInit } from '@angular/core';
import { File } from '../../../models/file.model'

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  @Input() eventChecked?: boolean;
  @Input() personalityChecked?: boolean;
  @Input() placeChecked?: boolean;
  @Input() illustrationChecked?: boolean;

  fileList: File[] = [
    { title: "Signature du traité de Lisbonne", nbImage: 4, canal_de_transmission: null, date_de_diffusion: null,
     personality: ['Hans-Gert Pöttering'], event: ['Treaty', 'Treaty of Lisbonne'], place: ['Lisbonne', 'Portugal'], illustration: ['Signature'],},
    {title: "50 ans d'amitié franco-allemande", nbImage: 12, canal_de_transmission: "TF1", date_de_diffusion: "2012-05-15 00:00:00",
     personality: ['Angela Merkel', 'Nicolas Sarkozy'], event: ['France Germany relations'], place: ['Europe'], illustration: ['Meeting'],}
  ]

  eventClusters: string[] = [];
  personalityClusters: string[] = [];
  placeClusters: string[] = [];
  illustrationClusters: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getClustersQuantity(file: File): number {
    return file.event.length + file.personality.length + file.place.length + file.illustration.length;;
  }

}
