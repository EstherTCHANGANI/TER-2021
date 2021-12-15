import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Cluster } from 'src/models/cluster.model';
import { File } from 'src/models/file.model';
import { FilterService } from 'src/services/filter.service';

@Component({
  selector: 'app-cluster-view',
  templateUrl: './cluster-view.component.html',
  styleUrls: ['./cluster-view.component.css']
})
export class ClusterViewComponent implements OnChanges {

  @Input() eventChecked?: boolean;
  @Input() personalityChecked?: boolean;
  @Input() placeChecked?: boolean;
  @Input() illustrationChecked?: boolean;
  selectedClusters: Cluster[] =  [];

  fileList: File[] = [
    { title: "Signature du traité de Lisbonne", nbImage: 4, canal_de_transmission: null, date_de_diffusion: null,
      personality: ['Hans-Gert Pöttering'], event: ['Treaty', 'Treaty of Lisbonne'], place: ['Lisbonne', 'Portugal'], illustration: ['Signature'],extra:{
        _id: "61a79ba58cdcf53b5627d811",
        database: "fiches_INA",
        ID_notice: 4712188001012,
        Titre_propre: "50 ans d'amitie franco-allemande",
        Titre_collection: "LE 13H",
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
      }},
    {title: "50 ans d'amitié franco-allemandes", nbImage: 12, canal_de_transmission: "TF1", date_de_diffusion: "2012-05-15 00:00:00",
      personality: ['Angela Merkel', 'Nicolas Sarkozy'], event: ['France Germany relations'], place: ['Europe'], illustration: ['Meeting'],extra:{
        _id: "61a79ba58cdcf53b5627d811",
        database: "fiches_INA",
        ID_notice: 4712188001012,
        Titre_propre: "50 ans d'amitie franco-allemande",
        Titre_collection: "LE 13H",
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
      }}
   ]

  constructor(public filterService: FilterService) {
  }

  ngOnChanges(): void {
    this.selectedClusters = this.filterService.getSelectedClusters();
  }

  getIconByClusterType(cluster: Cluster): string {
    if (cluster.type === 'event') return 'event';
    else if (cluster.type === 'personality') return 'emoji_people';
    else if (cluster.type === 'place') return 'home';
    else if (cluster.type === 'illustration') return 'auto_stories';
    else return 'block'
  }

}
