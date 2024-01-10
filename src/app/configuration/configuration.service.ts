import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  
  public url: any;

  constructor(private http: HttpClient) {}

  loadConfig() : Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('skip_url_configuration',"true");
    return this.http.get<BasePortalConfiguration>('./assets/config/config.json', 
           {headers: headers}).pipe(
      map((data: BasePortalConfiguration) => {
        this.url = data.api_url +"/"+data.webAppPath;
        localStorage.setItem('URL_API',this.url);
      }),
      catchError((error: any) => {
        console.error('Error loading config:', error);
        return of(null);
      })
    );
  }

  public get backendUrl(): string {
    return this.url;
  }
}

export interface BasePortalConfiguration {
  api_url : String;
  webAppPath: String;
}
