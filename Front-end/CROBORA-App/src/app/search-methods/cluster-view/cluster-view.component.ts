import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Cluster } from 'src/models/cluster.model';
import { File } from 'src/models/file.model';
import { FilterService } from 'src/services/filter.service';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-cluster-view',
  templateUrl: './cluster-view.component.html',
  styleUrls: ['./cluster-view.component.css']
})
export class ClusterViewComponent implements OnInit, OnChanges {

  @Input() eventChecked?: boolean;
  @Input() celebrityChecked?: boolean;
  @Input() locationChecked?: boolean;
  @Input() illustrationChecked?: boolean;
  selectedClusters: Cluster[] =  [];

  fileList: File[] = [];
  // fileList: File[] = [
  //   { titre: "Signature du traité de Lisbonne", nbImage: 4, canal_de_transmission: null, date_de_diffusion: null,
  //     personnalite: ['Hans-Gert Pöttering'], evenement: ['Treaty', 'Treaty of Lisbonne'], lieu: ['Lisbonne', 'Portugal'], illustration: ['Signature'],extra:{
  //       _id: "61a79ba58cdcf53b5627d811",
  //       database: "fiches_INA",
  //       ID_notice: 4712188001012,
  //       Titre_propre_x: "50 ans d'amitie franco-allemande",
  //       Titre_collection_x: "LE 13H",
  //       Titre_programme: "LE 13H : [émission du 15 mai 2012]",
  //       Chaine: "TF1",
  //       Date_de_diffusion: "15/05/2012",
  //       Jour: "mardi",
  //       Statut_de_diffusion: "Première diffusion",
  //       Heure_de_diffusion: "13:14:23",
  //       Heure_de_fin_de_diffusion: "13:16:13",
  //       Duree: "00:01:50:00",
  //       Genre: "Journal télévisé",
  //       Generique: "JOU,Cros Anne Laure",
  //       Descripteurs: "Europe ; France ; politique ; Allemagne ; relations diplomatiques ; Union européenne ; document d'archives ; chancelier ; chef d'Etat ; Sarkozy Nicolas ; Merkel Angela ; Gaulle Charles de ; signature ; Pompidou Georges ; Brandt Willy ; Schmidt Helmut ; Mitterrand François ; Kohl Helmut ; Chirac Jacques ; Schröder Gerhard ; commémoration ; anniversaire ; débarquement",
  //       Chapeau: null,
  //       Societe_de_programmes: "Télévision Française 1",
  //       Producteurs: "Producteur, Boulogne Billancourt : Télévision Française 1, 2012 ; Producteur, Bry sur Marne : Institut national de l'audiovisuel, 2012 ; Producteur, Royaume Uni : Reuters Television, 2012",
  //       Extension_geographique: "National",
  //       Fonds: "Télévision Francaise 1 Actualités",
  //       Titre_materiel: "[Journée de captation TF1 du 15 mai 2012]"
  //     }},
  //   {titre: "50 ans d'amitié franco-allemandes", nbImage: 12, canal_de_transmission: "TF1", date_de_diffusion: "2012-05-15 00:00:00",
  //     personnalite: ['Angela Merkel', 'Nicolas Sarkozy'], evenement: ['France Germany relations'], lieu: ['Europe'], illustration: ['Meeting'],extra:{
  //       _id: "61a79ba58cdcf53b5627d811",
  //       database: "fiches_INA",
  //       ID_notice: 4712188001012,
  //       Titre_propre_x: "50 ans d'amitie franco-allemande",
  //       Titre_collection_x: "LE 13H",
  //       Titre_programme: "LE 13H : [émission du 15 mai 2012]",
  //       Chaine: "TF1",
  //       Date_de_diffusion: "15/05/2012",
  //       Jour: "mardi",
  //       Statut_de_diffusion: "Première diffusion",
  //       Heure_de_diffusion: "13:14:23",
  //       Heure_de_fin_de_diffusion: "13:16:13",
  //       Duree: "00:01:50:00",
  //       Genre: "Journal télévisé",
  //       Generique: "JOU,Cros Anne Laure",
  //       Descripteurs: "Europe ; France ; politique ; Allemagne ; relations diplomatiques ; Union européenne ; document d'archives ; chancelier ; chef d'Etat ; Sarkozy Nicolas ; Merkel Angela ; Gaulle Charles de ; signature ; Pompidou Georges ; Brandt Willy ; Schmidt Helmut ; Mitterrand François ; Kohl Helmut ; Chirac Jacques ; Schröder Gerhard ; commémoration ; anniversaire ; débarquement",
  //       Chapeau: null,
  //       Societe_de_programmes: "Télévision Française 1",
  //       Producteurs: "Producteur, Boulogne Billancourt : Télévision Française 1, 2012 ; Producteur, Bry sur Marne : Institut national de l'audiovisuel, 2012 ; Producteur, Royaume Uni : Reuters Television, 2012",
  //       Extension_geographique: "National",
  //       Fonds: "Télévision Francaise 1 Actualités",
  //       Titre_materiel: "[Journée de captation TF1 du 15 mai 2012]"
  //     }}
  //  ]

  constructor(public filterService: FilterService, private httpService: HttpService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.selectedClusters = this.filterService.getSelectedClusters();
  }

  getIconByClusterType(cluster: Cluster): string {
    if (cluster.type === 'evenement') return 'event';
    else if (cluster.type === 'personnalite') return 'emoji_people';
    else if (cluster.type === 'lieu') return 'home';
    else if (cluster.type === 'illustration') return 'auto_stories';
    else return 'block'
  }

  goToVisualisationPage(file: File) {
    console.log(file);
  }

  getFilesByCluster(cluster: Cluster): File[] {
    if (this.filterService.getSearchedFilesByCluster().size > 0) {
      return this.filterService.getSearchedFilesByCluster().get(cluster.value);
    } else return this.fileList;
  }

}
