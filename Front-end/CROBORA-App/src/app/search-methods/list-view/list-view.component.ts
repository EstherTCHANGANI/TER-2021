import { Component, Input, OnInit } from '@angular/core';

interface File {
  title: string;
  personality: string[];
  event: string[];
  place: string[];
  illustration: string[];
}

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
    {title: 'La signature du traité de Lisbonne', personality: ['Hans-Gert Pöttering'], event: ['Treaty', 'Treaty of Lisbonne'], place: ['Lisbonne', 'Portugal'], illustration: ['Signature']},
    {title: "50 ans d'amitie franco-allemande", personality: ['Angela Merkel', 'Nicolas Sarkozy'], event: ['France Germany relations'], place: ['Europe'], illustration: ['Meeting']}
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
