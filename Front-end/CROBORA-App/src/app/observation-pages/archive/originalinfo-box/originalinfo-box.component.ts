import { Component, OnInit } from '@angular/core';
import { Extra } from 'src/models/file.model';

@Component({
  selector: 'app-originalinfo-box',
  templateUrl: './originalinfo-box.component.html',
  styleUrls: ['./originalinfo-box.component.css']
})
export class OriginalinfoBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  info : Extra = {
    _id: "61a79ba58cdcf53b5627d811",
    database: "fiches_INA",
    ID_notice: 4712188001012,
    Titre_propre_x: "50 ans d'amitie franco-allemande",
    Titre_collection_x: "LE 13H",
    Titre_programme: "LE 13H : [émission du 15 mai 2012]",
    Chaine: "TF1",
    Date_de_diffusion: "15/05/2012",
    Jour: "mardi",
    Statut_de_diffusion: "Première diffusion",
    Heure_de_diffusion: "13:14:23",
    Heure_de_fin_de_diffusion: "13:16:13",
    Duree: "00:01:50:00",
    Genre: "Journal télévisé",
    Generique: "JOU,Cros Anne Laure",
    Descripteurs: "Europe ; France ; politique ; Allemagne ; relations diplomatiques ; Union européenne ; document d'archives ; chancelier ; chef d'Etat ; Sarkozy Nicolas ; Merkel Angela ; Gaulle Charles de ; signature ; Pompidou Georges ; Brandt Willy ; Schmidt Helmut ; Mitterrand François ; Kohl Helmut ; Chirac Jacques ; Schröder Gerhard ; commémoration ; anniversaire ; débarquement",
    Chapeau: null,
    Societe_de_programmes: "Télévision Française 1",
    Producteurs: "Producteur, Boulogne Billancourt : Télévision Française 1, 2012 ; Producteur, Bry sur Marne : Institut national de l'audiovisuel, 2012 ; Producteur, Royaume Uni : Reuters Television, 2012",
    Extension_geographique: "National",
    Fonds: "Télévision Francaise 1 Actualités",
    Titre_materiel: "[Journée de captation TF1 du 15 mai 2012]"
  }


}
