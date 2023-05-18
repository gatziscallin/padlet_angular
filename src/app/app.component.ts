import {Component} from '@angular/core';
import {Padlet} from "./shared/padlet";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  padlet : Padlet | undefined;

  constructor(private http: HttpClient){
    http.get<Padlet>('http://padlet.s2010456018.student.kwmhgb.at/padlets').subscribe(val => this.padlet = val);
  }

}
