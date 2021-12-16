export interface File {
  _id?: string;
  id?: number;
  source?: string;
  titre : string;
  nbImage?: number;
  canal_de_transmission: string;
  date_de_diffusion: string;
  date_de_diffusion_meta?: string;
  Date_de_consultation?: string;
  Lieu_de_consultation?: string;
  duree?: string;
  image?: string;
  images?: string[];
  personnalite: string[];
  evenement: string[];
  lieu: string[];
  illustration: string[];
  extra : Extra;
}

export interface Extra{
  _id? : string;
  database: string;
  ID_notice?: number;
  Titre_propre_x: string;
  Titre_collection_x: string;
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
  Image?: string;
}
