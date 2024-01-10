import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly PTH_JWT_TOKEN_KEY = "jwt";

  dropSession : boolean = true;

  constructor(private http: HttpClient) {
    //if(!environment.production)
    //  this.dropSession = false;
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwtDecode(token);
    }
    catch(Error){
        return null;
    }
  }

  isUserLoggedIn(): boolean {
    let jwtToken = this.getJwtToken();
    if (jwtToken === null) {
      return false;
    }

    let decoded = this.getDecodedAccessToken(jwtToken);
    let exp = decoded['exp'];
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem(this.PTH_JWT_TOKEN_KEY);
      return false;
    }
    return true;
  }

  getJwtToken(): string | null{
    const token = localStorage.getItem(this.PTH_JWT_TOKEN_KEY);
    return token;
  }

  removeJwtToken() {
    localStorage.removeItem(this.PTH_JWT_TOKEN_KEY);
  }

  login(username: string, password: string) {
    return this.http.post<any>('api/authenticate/oauth/token', {
       username : username,
        password : password,
         grant_type : 'password'})
          // {headers: null})
    .pipe(
      tap(result => {
        let jwtToken = result.access_token;
        localStorage.setItem(this.PTH_JWT_TOKEN_KEY, jwtToken);
      })
    )
  }

  logout(){
    if(this.dropSession){
      let headers = new HttpHeaders();
      headers = headers.set(`Authorization`, `Bearer ${this.getJwtToken()}`);
      this.http.post('api/authenticate/logout', {headers: headers}).subscribe();
    }
  }
}

