import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'src/models/subject.model';
import { Image } from 'src/models/image.model';

@Component({
  selector: 'app-index-crobora-box',
  templateUrl: './index-crobora-box.component.html',
  styleUrls: ['./index-crobora-box.component.css']
})
export class IndexCROBORABoxComponent implements OnInit {

  @Input() images: Image[];
  @Input() subject: Subject;

  constructor() { }

  ngOnInit(): void {
  }

  // index : Subject = {
  //   titre: "50 ans d'amitié franco-allemande",
  //   nbImage: 12,
  //   canal_de_transmission: "TF1",
  //   date_de_diffusion: "2012-05-15 00:00:00",
  //   personnalite: ['Angela Merkel', 'Nicolas Sarkozy'],
  //   evenement: ['France Germany relations'],
  //   lieu: ['Europe'],
  //   illustration: ['Meeting'],
  //   extra:{
  //     _id: "61a79ba58cdcf53b5627d811",
  //     database: "fiches_INA",
  //     ID_notice: 4712188001012,
  //     Titre_propre_x: "50 ans d'amitie franco-allemande",
  //     Titre_collection_x: "LE 13H",
  //     Titre_programme: "LE 13H : [émission du 15 mai 2012]",
  //     Chaine: "TF1",
  //     Date_de_diffusion: "15/05/2012",
  //     Jour: "mardi",
  //     Statut_de_diffusion: "Première diffusion",
  //     Heure_de_diffusion: "13:14:23",
  //     Heure_de_fin_de_diffusion: "13:16:13",
  //     Duree: "00:01:50:00",
  //     Genre: "Journal télévisé",
  //     Generique: "JOU,Cros Anne Laure",
  //     Descripteurs: "Europe ; France ; politique ; Allemagne ; relations diplomatiques ; Union européenne ; document d'archives ; chancelier ; chef d'Etat ; Sarkozy Nicolas ; Merkel Angela ; Gaulle Charles de ; signature ; Pompidou Georges ; Brandt Willy ; Schmidt Helmut ; Mitterrand François ; Kohl Helmut ; Chirac Jacques ; Schröder Gerhard ; commémoration ; anniversaire ; débarquement",
  //     Chapeau: null,
  //     Societe_de_programmes: "Télévision Française 1",
  //     Producteurs: "Producteur, Boulogne Billancourt : Télévision Française 1, 2012 ; Producteur, Bry sur Marne : Institut national de l'audiovisuel, 2012 ; Producteur, Royaume Uni : Reuters Television, 2012",
  //     Extension_geographique: "National",
  //     Fonds: "Télévision Francaise 1 Actualités",
  //     Titre_materiel: "[Journée de captation TF1 du 15 mai 2012]"
  //   }
  // }

  getAllKeywords(keywordType : string){
    let resString="";
    for (let keyword of this.getGroupKeywords(this.images, keywordType)){
      resString+= keyword + ", ";
    }
    return resString;
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
}
