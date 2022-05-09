import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/models/image.model';
import {Cluster} from 'src/models/cluster.model';
import { HttpService } from 'src/services/http.service';


export class ImageLink {
  name: String;
  src : String;

  constructor(name,src){
    this.name=name;
    this.src=src;
  }
}

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {
  @Input()
  group_image : Image[] =[];

  constructor(private httpService : HttpService) { }

  ngOnInit(): void {
  }

  getAllKeywords(group_image : Image[]) : Cluster[]{
    let keywords : Cluster[] = [] ;
    let categories = ["event","celebrity","loaction","illustration"]
    for (let image of group_image){
      for(let categorie of categories){
        let keyword_list = image[categorie];
        if (keyword_list!=null){
          for (let el of keyword_list){
            const keyword: Cluster = { value: el, type: categorie };
            keywords.push(keyword);  
          }
        }
      }
    }
    return listObjectToSet(keywords).sort((a,b)=>{
      return compare(a.value, b.value);
    });
  }

  getGroupKeywords(group_image : Image[], keyword : string) : string[] {
    let keywords = [];
    for(let image of group_image){
      let keyword_list = image[keyword];
      if (keyword_list!==null){
        for (let el of keyword_list){
          keywords.push(el);
        }
      }
    }
    return [...new Set(keywords)];
  } 

  getKeywordImage(groupe_image){
    let images_link=[];
    for(let image of groupe_image){
      let name = image.image_title;
      let src=this.constructLink(image.image_title);
      /*if (!this.httpService.screenExists(src)){
        src='../../../../assets/images/images_archives/image-not-found.png'
      }*/
      images_link.push(new ImageLink(name, src));
    }
    return images_link;
  }

  getImagebyKeyword(groupe_image,keyword:Cluster){
    let images_link=[];
    for(let image of groupe_image){
      let image_data = image[keyword.type];
      if (image_data!=null && image_data.includes(keyword.value)){
        let name = image.image_title;
        let src=this.constructLink(image.image_title);
        /*if (!this.httpService.screenExists(src)){
          src='../../../../assets/images/images_archives/image-not-found.png'
        }*/
        images_link.push(new ImageLink(name, src));
      }
    }
    return images_link;
  }

  constructLink(name_image){
    if (name_image.includes("TF1")){
      return '../../../../assets/images/images_archives/Atlas_TF1/'+name_image+".png";
    }
    if (name_image.includes("FR2")){
      return '../../../../assets/images/images_archives/Atlas_France2/'+name_image+".png";
    }
    if (name_image.includes("FR3")){
      return '../../../../assets/images/images_archives/Atlas_France3/'+name_image+".png";
    }
    if (name_image.includes("ARTE")){
      return '../../../../assets/images/images_archives/Atlas_Arte/'+name_image+".jpg";
    }
    if (name_image.includes("TG1")){
      return '../../../../assets/images/images_archives/Atlas_RaiUno/'+name_image+".png";
    }
    else{
      return '';
    }
  }
}

function compare(a: number | string, b: number | string) {
  return (a < b ? -1 : 1);
}

function listObjectToSet(list){ //if objects of list have a value parameter
  let resSet=[]
  for (let element of list){
    let found=false;
    resSet.forEach((item) => {
      if(element.value==item.value){
        found=true;
      }
    });
    if(!found){
      resSet.push(element);
    }
  }
  return resSet;
}