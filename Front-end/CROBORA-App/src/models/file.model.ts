export interface File {
  _id?: string;
  ID_document?: string;
  source?: string;
  document_title? : string;
  nbImage?: number;
  channel?: string;
  airing_time?: string;
  day_airing?: string;
  date_consult?: string;
  place_consult?: string;
  duration?: string;
  image_title?: string;
  images_title?:string[];
  celebrity?: string[];
  event?: string[];
  location?: string[];
  illustration?: string[];
  extra? : Extra;
}

export interface Extra{
  _id? : string;
  database: string;
  ID_document?: number;
  document_title_x: string;
  title_programme_x: string;
  program_details: string;
  channel: string;
  day_airing_x: string;
  day ?: string;
  airing_state ?: string;
  time_start: string;
  time_stop: string;
  duration: string;
  type: string;
  credits: string;
  descriptors ?: string;
  introductory_summary ?: string;
  airing_company ?: string;
  producers ?: string;
  range ?: string;
  collection ?: string;
  title_material ?: string;
  image_title?: string;
}
