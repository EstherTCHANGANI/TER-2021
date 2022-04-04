import { Component, Input, OnInit } from '@angular/core';
import { File } from 'src/models/file.model';

export class Image {
  name: String;
  src : String;
}

@Component({
  selector: 'app-thumbnails-box',
  templateUrl: './thumbnails-box.component.html',
  styleUrls: ['./thumbnails-box.component.css']
})
export class ThumbnailsBoxComponent implements OnInit {

  @Input()
  file : File;

  constructor() { }

  ngOnInit(): void {
    this.accessImage();
    console.log(this.images);
  }

   images : Image[] = [];

  accessImage(){
    if (this.file.images_title.length > 0){
      for (let title of this.file.images_title){
        let image : Image = {name : "", src :""};
        let source : String = '../../../../assets/images/images_archives/'
        if (this.file.extra.channel === "TF1"){
          source += "Atlas_TF1/"+title+".png"
        }
        if (this.file.extra.channel === "France 2"){
          source += "Atlas_France2/" + title + ".png";
        }
        if (this.file.extra.channel === "France 3"){
          source += "Atlas_France3/" + title + ".png";
        }
        if (this.file.extra.channel === "ARTE"){
          source += "Atlas_Arte/" + title + ".jpg";
        }
        if(this.file.source === "Fiches_RAI_merged"){
          source += "Atlas_RaiUno/" ;
          let programme13 = ["13.30","1330","13 30","13.00","1300","13 00"];
          let programme20 = ["20.00","2000","20 00","2030","20.30","20 30"];
          if(programme13.some(programme13=> this.file.extra.title_programme_x.includes(programme13))){
            source+= "Screenshot TG1 edizione 1330 (Chiara)/" + title + ".png";
          }
          if(programme20.some(programme20=> this.file.extra.title_programme_x.includes(programme20))){
            source+= "Screenshot TG1 edizione 20.00 (Alessia)/" + title + ".png";
          }
        }

        image.name=title;
        image.src=source;

        this.images.push(image);

        console.log("image " + image.name);
        console.log("image " + image.src);
      }
    }else{
      console.log(this.file);
    }  
  }


  

  /*images: Image[] = [
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
  ];*/

}
