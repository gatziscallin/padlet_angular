import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

interface Token {
  exp: number;
  user: {
    id: string;
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private api = 'http://padlet.s2010456018.student.kwmhgb.at/api/auth';

  constructor (private http: HttpClient) { }

  /**
   * Login mit den im Formular verwendeten Daten
   * @param email
   * @param password
   */
  login (email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  /**
   * nimmt Token und speichert ihn in Session Storage vom Browser
   */
  public setSessionStorage (token: string) {
    console.log("saving token");
    console.log(jwt_decode(token));
    const decodedToken = jwt_decode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
  }

  /**
   * Entfernt Token aus dem Session Storage
   */
  public logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    console.log("logged out");
  }

  /**
   * Gibt zurück, ob gerade ein Nutzer angemeldet ist. Und liefert zurück, ob das expirationDate vom token noch aktuell ist
   */
  public isLoggedIn() : boolean {
    if (sessionStorage.getItem("token")) {
      let token: string = <string>sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if(expirationDate < new Date()) {
        console.log("token expired");
        return false;
      }
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Liefert zurück, ob der Nutzer ausgeloggt ist
   */
  public isLoggedOut() : boolean {
    return !this.isLoggedIn();
  }

}
