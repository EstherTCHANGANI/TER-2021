import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { File } from 'src/models/file.model';

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArchivePageComponent implements OnInit {

  constructor() { }

  file : File = {
    title: "50 ans d'amitié franco-allemande",
    nbImage: 12,
    canal_de_transmission: "TF1",
    date_de_diffusion: "2012-05-15 00:00:00",
    personality: ['Angela Merkel', 'Nicolas Sarkozy'],
    event: ['France Germany relations'],
    place: ['Europe'],
    illustration: ['Meeting'],
  }

  ngOnInit(): void {
  }

  addToFav():void{

  }
}
