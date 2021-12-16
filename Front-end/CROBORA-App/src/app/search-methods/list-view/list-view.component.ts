import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from 'src/services/filter.service';
import { File } from '../../../models/file.model'
import { HttpService } from '../../../services/http.service';

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

  // fileList: File[] = [
  //   { titre: "Signature du traité de Lisbonne", nbImage: 4, canal_de_transmission: null, date_de_diffusion: null,
  //    personnalite: ['Hans-Gert Pöttering'], evenement: ['Treaty', 'Treaty of Lisbonne'], lieu: ['Lisbonne', 'Portugal'], illustration: ['Signature'],
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
  //   }},
  //   {titre: "50 ans d'amitié franco-allemande", nbImage: 12, canal_de_transmission: "TF1", date_de_diffusion: "2012-05-15 00:00:00",
  //    personnalite: ['Angela Merkel', 'Nicolas Sarkozy'], evenement: ['France Germany relations'], lieu: ['Europe'], illustration: ['Meeting'],
  //    extra:{
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
  //   }}
  // ]

  eventClusters: string[] = [];
  personalityClusters: string[] = [];
  placeClusters: string[] = [];
  illustrationClusters: string[] = [];

  constructor(public filterService: FilterService, public httpService: HttpService) { }

  ngOnInit(): void {
  }

  getClustersQuantity(file: File): number {
    return file.evenement.length + file.personnalite.length + file.lieu.length + file.illustration.length;;
  }

  goToVisualisationPage(file: File) {
    console.log(file);
  }

}
