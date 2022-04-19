import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cluster } from 'src/models/cluster.model';
import { Subject } from 'src/models/subject.model';
import { Image } from 'src/models/image.model';

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

  getSubject(ID_document : string): Observable<Subject> {
    this.requestLoading = true;
    return this.http.get<Subject>(this.BACKEND_URL + '/subject?ID_doc=' + ID_document, { headers: this.headers });
  }

}