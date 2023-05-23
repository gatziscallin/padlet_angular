import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Rating} from "../shared/rating";
import {RatingFactory} from "../shared/rating-factory";
import {EntrieService} from "../shared/entrie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RatingFormErrorMessages} from "../rating-form/rating-form-error-messages";

@Component({
  selector: 'bs-rating-form',
  templateUrl: './rating-form.component.html',
  styles: [
  ]
})

/*
  Diese Komponente ist die Formverarbeitung zum Erstellen eines Ratings
 */
export class RatingFormComponent {
  ratingForm: FormGroup;
  rating: Rating = RatingFactory.empty();
  errors : { [key: string]: string} = {};

  constructor(
    private fb: FormBuilder,
    private ps: EntrieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ratingForm = this.fb.group({});
  }

  /*
    Initialisierung des Ratings

      Wenn eine id vorhanden ist, wird über den ps.getSingleRating(entrie_id)-Aufruf ein HTTP-Anfrage an den Server gesendet,
      um den einzelnen Eintrag abzurufen. Das Ergebnis der Anfrage wird über den subscribe()-Aufruf verarbeitet.

      Schließlich wird die Methode initRating() unabhängig davon, ob eine id vorhanden war oder nicht, erneut
      aufgerufen, um sicherzustellen, dass das Rating richtig initialisiert wird.
   */
  ngOnInit(): void {
    const entrie_id = this.route.snapshot.params["entrie_id"];
    if(entrie_id){
      this.ps.getSingleRating(entrie_id).subscribe
      (comment => {
          this.rating = entrie_id
          this.initRating();
        }
      );
    }
    this.initRating();
  }

  /*
    Die Werte der Formularkontrollen werden mit den entsprechenden Werten und Validatoren des rating-Objekts vorbelegt.
   */
  initRating() {
    this.ratingForm = this.fb.group({
      id:this.rating.id,
      user_id: [1, Validators.required],
      entrie_id: [this.route.snapshot.params["entrie_id"], Validators.required],
      rating: [this.rating.rating, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
    // Bei Änderungen wird die Methode updateErrorMessages() aufgerufen, um eventuelle
    // Fehlermeldungen zu aktualisieren
    this.ratingForm.statusChanges.subscribe(()=>
      this.updateErrorMessages());
  }

  /*
  Fehlermeldungen für das Formular werden basierend auf den Validierungsregeln und den aktuellen Formulareingaben
  angelegt. Die Fehlermeldungen können dann verwendet werden, um den Benutzer über ungültige Eingaben
  zu informieren und Feedback zu geben.
 */
  updateErrorMessages() {
    console.log("Is form invalid? " + this.ratingForm.invalid);
    this.errors = {};

    for (const message of RatingFormErrorMessages) {
      const control = this.ratingForm.get(message.forControl);
      if(
        control &&
        control.dirty &&
        control.invalid &&
        control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  /*
  Speichert neues Rating in die Datenbank und verlinkt auf das jeweilige Padlet zurück, wo das Rating
  angelegt worden ist.
 */
  submitForm() {
    const rating: Rating = RatingFactory.fromObject(this.ratingForm.value);
    this.ps.saveRating(rating).subscribe(res => {
      this.rating = RatingFactory.empty();
      this.ratingForm.reset(RatingFactory.empty());
      this.router.navigate(["/padlets", this.route.snapshot.params["padlet_id"]]);
    });
  }
}
