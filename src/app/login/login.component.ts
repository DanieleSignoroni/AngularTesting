import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginConfiguration, LoginConfigurationService } from '../login-configuration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  public form? : FormGroup;
  
  hidePassword = true;
  invalidCredentialMsg?: string;
  username?: string;
  password?: string;
  company?: string;
  retUrl: string = "home";
  logout = false;
  loginConfig: LoginConfiguration | undefined;

  constructor(private fb: FormBuilder,private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute, private loginConfigurationService : LoginConfigurationService) {
  }

  buildForm(){
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      company:  ['', Validators.required]
    });
  }

  ngOnInit() {
    window.document.title = "Login"
    this.loginConfigurationService.loadConfig().subscribe({
      next: (config: LoginConfiguration) => {
        this.loginConfig = config;
        this.buildForm();
      },
      error: (error) => {
        console.error('Error fetching login configuration :', error);
      }
    });
    this.activatedRoute.queryParamMap
      .subscribe(params => {
        let slo = params.get('logout');
        this.logout = slo !== null && slo.toLowerCase() === 'true';
        if (this.logout) {
          this.authService.logout();
          this.authService.removeJwtToken();
        }
      });

      if(this.authService.isUserLoggedIn()){
        if(this.retUrl)
          this.router.navigate([this.retUrl]);
        else this.router.navigate(['']);
      }

  }

  buildUsername(username: string, company: string) : string{
    if (!company) {
      company = '001';
    }
    return username + "_" + company;
  }

  onFormSubmit(loginForm : any) {
    if(loginForm.valid){
      let username = this.buildUsername(loginForm.value.username, loginForm.value.company);
      this.authService.
      login(username, loginForm.value.password).subscribe(data => {
        if (this.retUrl != null) {
          this.router.navigate([this.retUrl]);
        } else {
          this.router.navigate(['ui']);
        }
      });
    }
  }

}
