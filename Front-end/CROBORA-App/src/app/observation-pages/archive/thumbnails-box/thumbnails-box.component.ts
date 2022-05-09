import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/models/image.model';
import { ArchiveData } from 'src/models/archiveData.model';
import { HttpService } from '../../../../services/http.service';

export class ImageLink {
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
  archiveData : ArchiveData;

  @Input()
  images : Image[];

  constructor(public httpService: HttpService) { }

  ngOnInit(): void {
    this.accessImage();
    console.log(this.imagesLink);
  }

  imagesLink : ImageLink[] = [];

  accessImage(){
    if (this.archiveData.images != null){
      for (let title of this.archiveData.images){
        let image : ImageLink = {name : "", src :""};
        let source : String = '../../../../assets/images/images_archives/'
        if (this.archiveData.channel === "TF1"){
          source += "Atlas_TF1/" + title + ".png";
        }
        if (this.archiveData.channel === "France 2"){
          source += "Atlas_France2/" + title + ".png";
        }
        if (this.archiveData.channel === "France 3"){
          source += "Atlas_France3/" + title + ".png";
        }
        if (this.archiveData.channel === "ARTE"){
          source += "Atlas_Arte/" + title + ".jpg";
        }
        if(this.archiveData.source === "Fiches_RAI_final"){
          source += "Atlas_RaiUno/" ;
          let programme13 = ["13.30","1330","13 30","13.00","1300","13 00"];
          let programme20 = ["20.00","2000","20 00","2030","20.30","20 30"];
          if(programme13.some(programme13=> this.archiveData.title_programme.includes(programme13))){
            source+= "Screenshot TG1 edizione 1330 (Chiara)/" + title + ".png";
          }
          if(programme20.some(programme20=> this.archiveData.title_programme.includes(programme20))){
            source+= "Screenshot TG1 edizione 20.00 (Alessia)/" + title + ".png";
          }
        }

        image.name=title;
        image.src=source;

        
        console.log("image " + image.name);
        console.log("image " + image.src);

        this.imagesLink.push(image);
        
      }
    }else{
      console.log(this.archiveData);
    }
  }

  requestNotLoaded(){
    return this.httpService.isRequestLoading();
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
