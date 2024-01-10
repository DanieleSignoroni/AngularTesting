import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

    constructor(private configuration: ConfigurationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('skip_url_configuration')) {
            const apiReq = req.clone({ url: `${this.configuration.url}/${req.url}` });
            return next.handle(apiReq);
        } else {
            return next.handle(req);
        }

    }
}