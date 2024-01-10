import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from './configuration/configuration.service';
import { catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private configService: ConfigurationService, private http: HttpClient) {}

  ngOnInit(){
    this.url = this.configService.backendUrl;
  }

  title = 'test-configuration';
  url? : string;
}
