import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from
    "@angular/common/http";
import {Observable} from 'rxjs';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  /**
   * Durch den Aufruf request.clone() wird eine Kopie der ursprünglichen Anfrage erstellt, um sie zu modifizieren,
   * ohne die ursprüngliche Anfrage selbst zu ändern.
   * In der setHeaders-Eigenschaft der geklonten Anfrage wird der Autorisierungsheader mit dem JWT-Token aus der
   * sessionStorage hinzugefügt. Hier wird der Header mit dem Schlüssel "Authorization" und dem Wert "Bearer {Token}"
   * gesetzt, wobei {Token} durch den Wert aus der sessionStorage ersetzt wird.
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    return next.handle(request);
  }
}
