import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  constructor() {}

  /**
   * Wenn das empfangene Ereignis eine HttpResponse ist, können spezifische Aktionen ausführt werden.
   * Wenn das empfangene Ereignis eine HttpErrorResponse ist, können Fehler behandelt werden, die während der Kommunikation
   * mit dem Server auftreten. Im speziellen Fall einer 401-Fehlerantwort (Unauthorized) wird eine Benachrichtigung angezeigt,
   * dass der Benutzername oder das Passwort inkorrekt ist.
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            window.alert("Incorrect username or password");
          }
        }
      })
    );
  }
}
