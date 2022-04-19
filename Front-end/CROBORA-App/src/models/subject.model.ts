export interface Subject {
  _id?: string;
  ID_document?: string;
  source?: string;
  document_title? : string;
  title_programme?:string;
  channel?: string;
  day_airing?: string;
  time_start?:string;
  time_stop?:string,
  date_place_consult?: string;
  images?:string[];
  link_to_video?:string;
  extra? : Extra;
}

export interface Extra{
  program_details: string;
  day ?: string;
  duration: string;
  airing_state ?: string;
  type: string;
  credits: string;
  descriptor?: string;
  introductory_summary?: string;
  document_summary?:string;
  airing_company ?: string;
  producers ?: string;
  range ?: string;
  collection ?: string;
  title_material ?: string;
  content_audio?:string;
  content_video?:string;
  document?:string;
  subscribers?:string;
  language?:string;
  comments_authorization?:string;
  likes?:string;
  dislikes?:string;
  views?:string;
  other_fiction?:string;
  comments?:string;
  platform?:string;
}