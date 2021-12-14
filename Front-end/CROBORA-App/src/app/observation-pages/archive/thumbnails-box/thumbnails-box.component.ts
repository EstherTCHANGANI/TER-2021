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
    {name: 'One', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1.png'},
    {name: 'Two', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_2.png'},
    {name: 'Three', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_3.png'},
    {name: 'Four', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_4.png'},
    {name: 'Five', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_5.png'},
    {name: 'Six', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_6.png'},
    {name: 'Seven', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_7.png'},
    {name: 'Eight', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_8.png'},
    {name: 'Nine', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_9.png'},
    {name: 'Ten', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_10.png'},
    {name: 'Eleven', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_11.png'},
    {name: 'Twelve', src: '../../../../assets/images/ex_50ansfrall/150512_50AnsDAmitieFrancoAllemande_13h_TF1_12.png'},
  ];

}
