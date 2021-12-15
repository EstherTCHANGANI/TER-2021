export interface File {
  title : string;
  nbImage: number;
  canal_de_transmission: string;
  date_de_diffusion: string;
  personality: string[];
  event: string[];
  place: string[];
  illustration: string[];
  extra : Extra;
}

export interface Extra{
  _id : string;
  database: string;
  ID_notice: number;
  Titre_propre: string;
  Titre_collection: string;
  Titre_programme: string;
  Chaine: string;
  Date_de_diffusion: string;
  Jour ?: string;
  Statut_de_diffusion ?: string;
  Heure_de_diffusion: string;
  Heure_de_fin_de_diffusion: string;
  Duree: string;
  Genre: string;
  Generique: string;
  Descripteurs ?: string;
  Chapeau ?: string;
  Societe_de_programmes ?: string;
  Producteurs ?: string;
  Extension_geographique ?: string;
  Fonds ?: string;
  Titre_materiel ?: string;
}
