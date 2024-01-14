import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ConfigurationService } from './configuration/configuration.service';
import { AUTH_API_URLS } from './shared/BASE_API_URLS';

@Injectable({
  providedIn: 'root'
})

export class LoginConfigurationService {

  public login_configuration: any;

  constructor(private http: HttpClient, private s: ConfigurationService, private basePortalConfiguration: ConfigurationService) { }

  loadConfig() {
    return this.http.get<LoginConfiguration>(AUTH_API_URLS.getLoginConfigurationURL()).pipe(
      map((data: any) => {
        this.login_configuration = this.processConfig(data);
        console.log('Configuration data:', data);
        return this.login_configuration; // Return the processed data or the original data
      }),
      catchError((error: any) => {
        console.error('Error loading config:', error);
        return of(null);
      })
    );
  }

  /**
   * Funzione che permette di configurare l'URL dell'immagine che risiede su sever.
   * L'immagine e' stata inserita tramite back-end e risiede dunque sotto Panthera.
   * Tramite l'URL configurato dal @link ConfigurationService ,
   * compongo l'URL che mi permetterà di usare l'immagine nel login.
   * @param config 
   * @returns 
   */
  private processConfig(config: LoginConfiguration): LoginConfiguration {
    config.companies.forEach(company => {
      company.logo = this.basePortalConfiguration.backendUrl + company.logo;
    });
    config.logo_login = this.basePortalConfiguration.backendUrl + config.logo_login;
    return config;
  }

}
export interface LoginConfiguration {
  companies: CompanyConfiguration[];
  logo_login: string;
  label_btn_submit: string;
  label_copyright: string;
  label_password: string;
  label_username: string;
}

export interface CompanyConfiguration {
  logo: string;
  ragione_sociale: string;
  id_azienda: string;
}
