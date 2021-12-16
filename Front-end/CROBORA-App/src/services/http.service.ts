import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cluster } from 'src/models/cluster.model';
import { File } from 'src/models/file.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private BACKEND_URL = 'http://localhost:3000';
  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) { }

  getClusters(): Observable<Cluster[]>{
    return this.http.get<Cluster[]>(this.BACKEND_URL + "/cluster/names", { headers: this.headers });
  }

  getFilesByCluster(clusterTypes: string[], clusters: Cluster[]): Observable<File[]> {
    let route = '/events?';
    clusterTypes.forEach((type) => {
      route = route + 'cluster=' + type + '&';
    });
    clusters.forEach((cluster) => {
      route = route + 'keyword=' + cluster.value + '&';
    });
    console.log(route.slice(0, -1));
    return this.http.get<File[]>(this.BACKEND_URL + route.slice(0, -1), { headers: this.headers });
  }

}