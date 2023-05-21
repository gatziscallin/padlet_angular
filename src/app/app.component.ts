import {Component} from '@angular/core';
import {Padlet} from "./shared/padlet";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  padlet : Padlet | undefined;

  constructor(private http: HttpClient, private authService: AuthenticationService){
    http.get<Padlet>('http://padlet.s2010456018.student.kwmhgb.at/padlets').subscribe(val => this.padlet = val);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    } else {
      return "Login";
    }
  }

}
