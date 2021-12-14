import { Component, OnInit } from '@angular/core';
import { File } from 'src/models/file.model';

@Component({
  selector: 'app-index-crobora-box',
  templateUrl: './index-crobora-box.component.html',
  styleUrls: ['./index-crobora-box.component.css']
})
export class IndexCROBORABoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  index : File = {
    title: "50 ans d'amitié franco-allemande",
    nbImage: 12,
    canal_de_transmission: "TF1",
    date_de_diffusion: "2012-05-15 00:00:00",
    personality: ['Angela Merkel', 'Nicolas Sarkozy'],
    event: ['France Germany relations'],
    place: ['Europe'],
    illustration: ['Meeting'],
  }
}
