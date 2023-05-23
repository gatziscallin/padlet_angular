import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';


interface Response {
  access_token : string;
}

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService

  ) {
    this.loginForm = this.fb.group({});
  }

  /**
    Initialwerte werden gesetzt und Validatoren vergeben
   */
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  /**
   login() überprüft, ob sowohl der Benutzername als auch das Passwort im Formularfeld angegeben wurden.
   Wenn beide Felder ausgefüllt sind, wird die login()-Methode des authService aufgerufen.
   Falls die Anmeldung erfolgreich ist, wird der Zugriffstoken im Session Storage gespeichert
   und der Benutzer wird zur Startseite umgeleitet.
   */
  login() {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe((res:any) => {
        console.log(res);
        this.authService.setSessionStorage((res as Response).access_token);
        this.router.navigateByUrl("/");
      });
    }
  }

  /**
   * Gibt an, ob der Benutzer angemeldet ist
   */
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  /**
   * Loggt den Nutzer über den Authentication Service aus
   */
  logout() {
    this.authService.logout();
  }

}
