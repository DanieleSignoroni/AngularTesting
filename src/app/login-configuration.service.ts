import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ConfigurationService } from './configuration/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class LoginConfigurationService {

  public login_configuration: any;

  constructor(private http: HttpClient,private s : ConfigurationService) {}

  loadConfig() {
    let url = '/api/portal/generale/configuration';
    return this.http.get<LoginConfiguration>(url).pipe(
      map((data: any) => {
       this.login_configuration = data;
        console.log('Configuration data:', data);
        return this.login_configuration; // Return the processed data or the original data
      }),
      catchError((error: any) => {
        console.error('Error loading config:', error);
        return of(null);
      })
    );
  }

}

export interface LoginConfiguration{
  label_pwd : string;
  label_btn : string;
  logo: string;
  forgot_password : string;
  label_user : string;
  logo_001 : string;
  logo_002: string;
}