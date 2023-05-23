import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Padlet, User} from '../shared/padlet';
import {Entrie} from "../shared/entrie";
import {PadletService} from "../shared/padlet.service";
import {EntrieService} from "../shared/entrie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {UserFactory} from "../shared/user-factory";
import {EntrieFactory} from "../shared/entrie-factory";
import {Rating} from "../shared/rating";
import {Comment} from "../shared/comment";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})

export class PadletDetailsComponent implements OnInit {

  padlet: Padlet = PadletFactory.empty();
  entries: Entrie[] = [];
  entrie: Entrie = EntrieFactory.empty();

  user: User = UserFactory.empty();

  constructor(
    private ps: PadletService,
    private es: EntrieService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService
  ) {}

  /**
   * Die Funktion ngOnInit() wird beim Initialisieren der Komponente aufgerufen.
   * Sie ruft die Methode getSinglePadlet() des ps (PadletService) auf, um das einzelne Padlet abzurufen..
   * Das zurückgegebene Padlet wird subscribed und die Daten werden in den entsprechenden Variablen gespeichert.
   * Die Einträge des Padlets werden der Variable entries zugewiesen und der Benutzer des Padlets wird der Variable user zugewiesen.
   * Anschließend werden die Methoden getRatings() und getComments() aufgerufen, um die Bewertungen und Kommentare des Entries abzurufen.
   */
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.ps.getSinglePadlet(params['id'])
      .subscribe((p: Padlet) => {
        this.padlet = p;
        this.entries = this.padlet.entries;
        this.user = this.padlet.user;
        this.getRatings();
        this.getComments();
      });
  }

  /**
   * Die Funktion getRatings() wird verwendet, um die Bewertungen für jeden Eintrag des Padlets abzurufen.
   * Für jeden Eintrag wird die Methode getRatingsForEntrie() des ps (PadletService) aufgerufen, um die Bewertungen für
   * den jeweiligen Eintrag abzurufen.
   */
  getRatings() : void {
    for(let entrie of this.entries) {
      this.ps.getRatingsForEntrie(Number(entrie.id)).subscribe((res: Rating[]) => {
        entrie.ratings = res;
      })
    }
  }

  /**
   * Die Funktion getComments() wird verwendet, um die Kommentare für jeden Eintrag des Padlets abzurufen.
   * Für jeden Eintrag wird die Methode getCommentsForEntrie() des ps (PadletService) aufgerufen, um die Bewertungen für
   * den jeweiligen Eintrag abzurufen.
   */
  getComments() : void {
    for (let entrie of this.entries) {
      this.ps.getCommentsForEntrie(Number(entrie.id)).subscribe((res: Comment[]) => {
        entrie.comments = res;
      });
    }
  }

  /**
   * Durchläuft die Ratings zum jeweilen Entrie und gibt sie als Array zurück
   */
  getRating(rating: number) {
    return Array(rating)
  }

  /**
   * Bestätigungsnachricht, um sicherzustellen, dass der Benutzer das Padlet wirklich löschen möchte.
   * Anschließend wird die deletePadlet()-Methode des ps (PadletService) aufgerufen und der entsprechende Parameter übergeben, um das Padlet zu löschen.
   * Das Ergebnis wird subscribed und im Erfolgsfall wird zur vorherigen Seite navigiert, indem die Route entsprechend angepasst wird.
   */
  deletePadlet(){
    if (confirm('Padlet wirklich löschen?')) {
      const params = this.route.snapshot.params;
      this.ps.deletePadlet(params['id']).subscribe(
        (e: any) => {
          this.router.navigate(['../../'],
            {relativeTo: this.route});
        }
      )
    }
  }

  /**
   * Bestätigungsnachricht, um sicherzustellen, dass der Benutzer den Eintrag wirklich löschen möchte.
   * Falls die Bestätigung erfolgt, wird die deleteEntrie()-Methode des es (EntrieService) aufgerufen und die
   * entsprechende ID des Eintrags übergeben, um den Eintrag zu löschen.
   * Das Ergebnis wird subscribed und im Erfolgsfall wird eine Umleitung auf die aktuelle Seite durchgeführt.
   */
  deleteEntrie(id:string){
    if (confirm('Eintrag wirklich löschen?')) {
      this.es.deleteEntrie(Number(id)).subscribe(
        (e: any) => {
          const currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
        }
      )
    }
  }
}
