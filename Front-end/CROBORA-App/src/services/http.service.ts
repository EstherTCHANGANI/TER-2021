import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cluster } from 'src/models/cluster.model';
import { File } from 'src/models/file.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private BACKEND_URL = 'localhost:3000'

  constructor(private http: HttpClient) { }

  getClusters(): Observable<Cluster[]>{
    return this.http.get<Cluster[]>(this.BACKEND_URL + "/cluster/names");
  }

  getFilesByCluster(clusterTypes: string[], keywords: string[]): Observable<File[]> {
    let route = '/events?';
    clusterTypes.forEach((type) => {
      route = route + 'cluster=' + type + '&';
    });
    keywords.forEach((keyword) => {
      route = route + 'keyword=' + keyword + '&';
    });
    console.log(route.slice(0, -1));
    return this.http.get<File[]>(this.BACKEND_URL + route.slice(0, -1));
  }

}