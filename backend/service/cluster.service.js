import mongoService from "./mongo.service";
import _ from "lodash";

class ClusterService {

    /**
     * 
     * @param {string[]} clusters 
     * @param {string[]} keywords 
     * @returns 
     */
    async groupByEvent(clusters, keywords) {
        // const events = await mongoService
        //     .getCollection("fiches_event")
        //     .find()
        //     .toArray();
        // TODO :: remplacer par la ligne de dessus
        const events = mockData;

        if (_.isEmpty(clusters) || _.isEmpty(keywords)) {
            return _.groupBy(events, "Événement");
        }

        const filteredEvent = events.filter(event =>
            clusters.find(cluster =>
                _.isArray(event[cluster])
                    ? event[cluster].find(el => keywords.indexOf(el) >= 0)
                    : keywords.indexOf(event[cluster]) >= 0
            )
        )

        return _.groupBy(filteredEvent, "Événement")

    }

}

export default new ClusterService();

const mockData = [
    {
        "id": 1641641004010,
        "source": "fiches_INA",
        "extra": {
            "_id": "61a79ba58cdcf53b5627e3e1",
            "ID_notice": 1641641004010,
            "Titre_propre": "[Les filières d'immigration clandestine]",
            "Titre_collection": "TF1 20 heures",
            "Titre_programme": "TF1 20 heures : [émission du 17 Février 2001]",
            "France 2": "TF1",
            "Date_de_diffusion": "2001-02-17 00:00:00",
            "Jour": "samedi",
            "Statut_de_diffusion": "Première diffusion",
            "Heure_de_diffusion": "20:09:46",
            "Heure_de_fin_de_diffusion": "20:11:24",
            "Duree": "00:01:38:00",
            "Genre": "Journal télévisé",
            "Generique": "JOU,Lalo Corinne",
            "Descripteurs": "Union européenne ; immigration ; clandestin ; réfugié ; accord international (Schengen) ; frontière ; mafia",
            "Chapeau": "Reportage. Le point sur les filières d'immigration clandestine alors qu'un bateau transportant huit cents réfugiés kurdes a fait naufrage au large des côtes varoises. La Grande Bretagne reste la destination privilégiée du fait des contrôles qui sont moins importants. Au sein de L'Union Européenne, chaque pays s'engage à surveiller ses frontières. Commentaire sur cartes géographiques alternant avec des images d'archives et factuelles et l'interview de Catherine WITOL DE WENDEN (chercheurse au CNRS-CERI).",
            "Societe_de_programmes": "Télévision Française 1",
            "Producteurs": "Producteur, Boulogne Billancourt : Télévision Française 1, 2001",
            "Extension_geographique": "National",
            "Fonds": "Télévision Francaise 1 Actualités",
            "Titre_materiel": "[TF1 du 17 février 2001 de 19h51 à 20h58]"
        },
        "titre": "[Les filières d'immigration clandestine]",
        "canal de transmission": "TF1",
        "date de diffusion": "2001-02-17 00:00:00",
        "Duree": "00:01:38:00",
        "Image": "170201_LesFilieresDImmigrationClandestine_20h_TF1",
        "Personnalité": [],
        "Événement": "External immigration",
        "Lieu": "Italy",
        "Illustration": ["Migrant", "Arrival", "Coast"],
        "Date de consultation": "06/04/2021",
        "Lieu de consultation": "Lyon"
    },
    {
        "id": 1711274005017,
        "source": "fiches_INA",
        "extra": {
            "_id": "61a79ba58cdcf53b5627e3e6",
            "ID_notice": 1711274005017,
            "Titre_propre": "[Coût de la fièvre aphteuse pour l'Union Européenne]",
            "Titre_collection": "TF1 20 heures",
            "Titre_programme": "TF1 20 heures : [émission du 23 Mai 2001]",
            "France 2": "TF1",
            "Date_de_diffusion": "2001-05-23 00:00:00",
            "Jour": "mercredi",
            "Statut_de_diffusion": "Première diffusion",
            "Heure_de_diffusion": "20:15:17",
            "Heure_de_fin_de_diffusion": "20:16:43",
            "Duree": "00:01:26:00",
            "Genre": "Journal télévisé",
            "Generique": null,
            "Descripteurs": "Europe ; élevage ; bétail ; épizootie ; fièvre aphteuse ; dépense ; budget",
            "Chapeau": "Reportage consacré au coût des mesures prises pour éradiquer l'épizootie de fièvre aphteuse en Europe et pour l'Union Européenne. Commentaire sur images d'archives et d'illustration des différentes crises sanitaires depuis 1999. Détails sur banc titre du budget agricole de l'Europe, de son dépassement l'an passé, et de celui à venir.",
            "Societe_de_programmes": "Télévision Française 1",
            "Producteurs": "Producteur, Boulogne Billancourt : Télévision Française 1, 2001",
            "Extension_geographique": "National",
            "Fonds": "Télévision Francaise 1 Actualités",
            "Titre_materiel": "[TF1 du 23 mai 2001 de 19h51 à 20h38]"
        },
        "titre": "[Coût de la fièvre aphteuse pour l'Union Européenne]",
        "canal de transmission": "TF1",
        "date de diffusion": "2001-05-23 00:00:00",
        "Duree": "00:01:26:00",
        "Image": "230501_CoutDeLaFievreAphteusePourLUnionEuropeenne_20h_TF1",
        "Personnalité": [],
        "Événement": "Foot and mouth disease",
        "Lieu": "France",
        "Illustration": ["Field"],
        "Date de consultation": "06/04/2021",
        "Lieu de consultation": "Lyon"
    },
    {
        "id": 2324900001023,
        "source": "fiches_INA",
        "extra": {
            "_id": "61a79ba58cdcf53b5627dd8a",
            "ID_notice": 2324900001023,
            "Titre_propre": "[L'Euro en Grande Bretagne]",
            "Titre_collection": "TF1 20 heures",
            "Titre_programme": "TF1 20 heures : [émission du 09 juin 2003]",
            "France 2": "TF1",
            "Date_de_diffusion": "09/06/2003",
            "Jour": "lundi",
            "Statut_de_diffusion": "Première diffusion",
            "Heure_de_diffusion": "20:25:46",
            "Heure_de_fin_de_diffusion": "20:27:21",
            "Duree": "00:01:34:17",
            "Genre": "Journal télévisé",
            "Generique": "JOU,Bellet Nicolas ; JRI,Geoffrion David",
            "Descripteurs": "Grande Bretagne ; Union européenne ; politique monétaire ; accord monétaire (Pacte de stabilité et de croissance) ; euro ; opinion publique",
            "Chapeau": "Reportage. Le ministre britanique des Finances a annoncé officiellement aujourd'hui que son pays n'était pas prêt pour le moment à adopter l'Euro. L'opinion publique se montre toujours très méfiante vis à vis de la monnaie unique. Commentaire sur images d'archives et images d'illustration, interviews de Mathew Mc GREGOR, campagne \"Non à l'Euro\", et de Yasmina ALIBAHAI BROWN, éditorialiste au journal \"The Independent\".",
            "Societe_de_programmes": "Télévision Française 1",
            "Producteurs": "Producteur, Boulogne Billancourt : Télévision Française 1, 2003",
            "Extension_geographique": "National",
            "Fonds": "Télévision Francaise 1 Actualités",
            "Titre_materiel": "[Journée de programme TF1 du 21 avril 2003]"
        },
        "titre": "[L'Euro en Grande Bretagne]",
        "canal de transmission": "TF1",
        "date de diffusion": "2003-06-09 00:00:00",
        "Duree": "00:01:34:17",
        "Image": "090603_LEuroEnGrandeBretagne_20h_TF1",
        "Personnalité": ["Adolf Hitler"],
        "Événement": "Euroscepticism",
        "Lieu": "United Kingdom",
        "Illustration": ["Media", "Swastika", "BW"],
        "Date de consultation": "22/04/2021",
        "Lieu de consultation": "Lyon"
    },
    {
        "id": 4686217001009,
        "source": "fiches_INA",
        "extra": {
            "_id": "61a79ba58cdcf53b5627dd18",
            "ID_notice": 4686217001009,
            "Titre_propre": "Journal de campagne - plateau francois bachy + propositions des candidats au niveau europeen",
            "Titre_collection": "LE 13H",
            "Titre_programme": "LE 13H : [émission du 29 mars 2012]",
            "France 2": "TF1",
            "Date_de_diffusion": "29/03/2012",
            "Jour": "jeudi",
            "Statut_de_diffusion": "Première diffusion",
            "Heure_de_diffusion": "13:10:35",
            "Heure_de_fin_de_diffusion": "13:13:08",
            "Duree": "00:02:33:00",
            "Genre": "Journal télévisé",
            "Generique": "JOU,Atalaya Amandine",
            "Descripteurs": "France ; Villepinte-Seine Saint Denis ; Strasbourg ; Grèce ; Athènes ; Belgique ; Bruxelles ; Grande Bretagne ; Londres ; politique ; campagne électorale ; discours ; Joly Eva ; candidat ; politique économique ; Union européenne ; Commission européenne ; banderole ; euro ; affiche ; parlement ; façade ; manifestant ; solidarité ; crise économique ; document d'archives ; Bayrou François ; MoDem-France ; EELV-France ; Poutou Philippe ; Mélenchon Jean Luc ; Dupont Aignan Nicolas ; Le Pen Marine ; Français à l'étranger (expatrié) ; militant ; infographie ; visite ; Merkel Angela ; Sarkozy Nicolas ; réforme ; paysage de plateau ; Bachy François ; petite phrase",
            "Chapeau": null,
            "Societe_de_programmes": "Télévision Française 1",
            "Producteurs": "Producteur, Boulogne Billancourt : Télévision Française 1, 2012",
            "Extension_geographique": "National",
            "Fonds": "Télévision Francaise 1 Actualités",
            "Titre_materiel": "[Journée de captation TF1 du 29 mars 2012]"
        },
        "titre": "Journal de campagne - plateau francois bachy + propositions des candidats au niveau europeen",
        "canal de transmission": "TF1",
        "date de diffusion": "2012-03-29 00:00:00",
        "Duree": "00:02:33:00",
        "Image": "290312_JournalDeCampagnePlateauFrancoisBachyPropositionsDesCandidatsAuNiveauEuropeen_13h_TF1",
        "Personnalité": ["Angela Merkel"],
        "Événement": "Nicolas Sarkozy s Europe",
        "Lieu": "Brussels",
        "Illustration": ["Signature"],
        "Date de consultation": "18/05/2021",
        "Lieu de consultation": "Lyon"
    },
    {
        "id": 4712188001012,
        "source": "fiches_INA",
        "extra": {
            "_id": "61a79ba58cdcf53b5627d811",
            "ID_notice": 4712188001012,
            "Titre_propre": "50 ans d'amitie franco-allemande",
            "Titre_collection": "LE 13H",
            "Titre_programme": "LE 13H : [émission du 15 mai 2012]",
            "France 2": "TF1",
            "Date_de_diffusion": "15/05/2012",
            "Jour": "mardi",
            "Statut_de_diffusion": "Première diffusion",
            "Heure_de_diffusion": "13:14:23",
            "Heure_de_fin_de_diffusion": "13:16:13",
            "Duree": "00:01:50:00",
            "Genre": "Journal télévisé",
            "Generique": "JOU,Cros Anne Laure",
            "Descripteurs": "Europe ; France ; politique ; Allemagne ; relations diplomatiques ; Union européenne ; document d'archives ; chancelier ; chef d'Etat ; Sarkozy Nicolas ; Merkel Angela ; Gaulle Charles de ; signature ; Pompidou Georges ; Brandt Willy ; Schmidt Helmut ; Mitterrand François ; Kohl Helmut ; Chirac Jacques ; Schröder Gerhard ; commémoration ; anniversaire ; débarquement",
            "Chapeau": null,
            "Societe_de_programmes": "Télévision Française 1",
            "Producteurs": "Producteur, Boulogne Billancourt : Télévision Française 1, 2012 ; Producteur, Bry sur Marne : Institut national de l'audiovisuel, 2012 ; Producteur, Royaume Uni : Reuters Television, 2012",
            "Extension_geographique": "National",
            "Fonds": "Télévision Francaise 1 Actualités",
            "Titre_materiel": "[Journée de captation TF1 du 15 mai 2012]"
        },
        "titre": "50 ans d'amitie franco-allemande",
        "canal de transmission": "TF1",
        "date de diffusion": "2012-05-15 00:00:00",
        "Duree": "00:01:50:00",
        "Image": "150512_50AnsDAmitieFrancoAllemande_13h_TF1",
        "Personnalité": ["Angela Merkel"],
        "Événement": "France Germany relations",
        "Lieu": "Europe",
        "Illustration": ["Meeting"],
        "Date de consultation": "18/05/2021",
        "Lieu de consultation": "Lyon"
    }
]