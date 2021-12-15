import { Component, OnInit } from '@angular/core';

export interface Image {
  name: string;
  src : string;
}

@Component({
  selector: 'app-thumbnails-box',
  templateUrl: './thumbnails-box.component.html',
  styleUrls: ['./thumbnails-box.component.css']
})
export class ThumbnailsBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  images: Image[] = [
    {name: '150512_50AnsDAmitieFrancoAllemande_13h_TF1', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1.png'},
    {name: '150512_50AnsDAmitieFrancoAllemande_13h_TF1_2', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_2.png'},
    {name: '150512_50AnsDAmitieFrancoAllemande_13h_TF1_3', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_3.png'},
    {name: '150512_50AnsDAmitieFrancoAllemande_13h_TF1_4', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_4.png'},
    {name: '150512_50AnsDAmitieFrancoAllemande_13h_TF1_5', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_5.png'},
    {name: '150512_50AnsDAmitieFrancoAllemande_13h_TF1_6', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_6.png'},
    {name: '150512_50AnsDAmitieFrancoAllemande_13h_TF1_7', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_7.png'},
    {name: '150512_50AnsDAmitieFrancoAllemande_13h_TF1_8', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_8.png'},
    {name: '150512_50AnsDAmitieFrancoAllemande_13h_TF1_9', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_9.png'},
    {name: '150512_50AnsDAmitieFrancoAllemande_13h_TF1_10', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_10.png'},
    {name: '150512_50AnsDAmitieFrancoAllemande_13h_TF1_11', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_11.png'},
    {name: '150512_50AnsDAmitieFrancoAllemande_13h_TF1_12', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_12.png'},
  ];

}
