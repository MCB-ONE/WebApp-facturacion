import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{


  /*Intercepta todas las peticiones al servidor
    => Cada request que se envíe al servidor va a pasar por esta lógica
  */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const securityToken = localStorage.getItem('token');

    /**Clona la petición que intercepta y le agrega al header de la petición el token
     * de seguirdad que está (o no) en localStorage*/
    const request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + securityToken),
    });

    return next.handle(request);

  }

}
