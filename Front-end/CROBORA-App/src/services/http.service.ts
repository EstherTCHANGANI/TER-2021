import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Cluster } from 'src/models/cluster.model';
import { ArchiveData } from 'src/models/archiveData.model';
import { Image } from 'src/models/image.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private BACKEND_URL = 'http://localhost:3000';
  requestLoading: boolean = false;

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) { }

  getClusters(): Observable<Cluster[]>{
    this.requestLoading = true;
    return this.http.get<Cluster[]>(this.BACKEND_URL + "/cluster/names", { headers: this.headers });
  }

  getImagesByCluster(clusterTypes: string[], clusters: Cluster[], option: Number): Observable<Image[]> {
    this.requestLoading = true;
    let route = '/events?';
    clusterTypes.forEach((type) => {
      route = route + 'cluster=' + type + '&';
    });
    clusters.forEach((cluster) => {
      route = route + 'keyword=' + cluster.value + '&';
    });
    route = route + 'allImages=' + option;
    console.log(route.slice(0, -1));
    return this.http.get<Image[]>(this.BACKEND_URL + route, { headers: this.headers });
  }

  getImagesByTitle(title: string): Observable<Image[]> {
    this.requestLoading = true;
    return this.http.get<Image[]>(this.BACKEND_URL + '/search?keyword=' + title, { headers: this.headers });
  }

  getAllImages(){
    this.requestLoading = true;
    return this.http.get<Image[]>(this.BACKEND_URL + '/cluster', { headers: this.headers });
  }

  isRequestLoading(): boolean {
    return this.requestLoading;
  }

  getArchiveData(ID_document : string): Observable<ArchiveData> {
    this.requestLoading = true;
    return this.http.get<ArchiveData>(this.BACKEND_URL + '/subject?ID_doc=' + ID_document, { headers: this.headers });
  }
  /*!!!!! mettre à jour dans le back-end pour que l'on recherche plus des "subjects"!!!!!!!*/

  /* Pour vérifier si une image existe bien dans le dossier assets de la plateforme */

  screenExists(url: string): Observable<boolean> {
    return this.http.get(url)
        .pipe(
            map(response => {
                return true;
            }),
            catchError(error => {
                return of(false);
            })
        );
  }
}