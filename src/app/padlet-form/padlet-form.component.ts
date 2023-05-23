import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Padlet} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFormErrorMessages} from "./padlet-form-error-messages";

@Component({
  selector: 'bs-padlet-form',
  templateUrl: './padlet-form.component.html',
  styles: [
  ]
})

/*
  Diese Komponente ist die Formverarbeitung zum Erstellen/Bearbeiten/Löschen eines Padlets
 */
export class PadletFormComponent implements OnInit {

  padletForm: FormGroup;
  padlet: Padlet = PadletFactory.empty();
  errors : { [key: string]: string} = {};
  isUpdatingPadlet = false;

  constructor(
    private fb: FormBuilder,
    private ps: PadletService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.padletForm = this.fb.group({});
  }

  /*
    Initialisierung des Padlets

      Wenn eine id vorhanden ist, wird über den ps.getSinglePadlet(id)-Aufruf ein HTTP-Anfrage an den Server gesendet,
      um das einzelne Padlet abzurufen. Das Ergebnis der Anfrage wird über den subscribe()-Aufruf verarbeitet. Ist
      bereits ein Padlet vorhanden wird isUpdatingPadlet auf true gesetzt.

      Schließlich wird die Methode initPadlet() unabhängig davon, ob eine id vorhanden war oder nicht, erneut
      aufgerufen, um sicherzustellen, dass das Padlet richtig initialisiert wird.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if(id){
      this.isUpdatingPadlet = true;
      this.ps.getSinglePadlet(id).subscribe
      (padlet => {
          this.padlet = padlet;
          this.initPadlet();
        }
      );
    }
    this.initPadlet();
  }

  /*
    Die Werte der Formularkontrollen werden mit den entsprechenden Werten und Validatoren des padlet-Objekts vorbelegt.
   */
  initPadlet() {
    this.padletForm = this.fb.group({
      id: this.padlet.id,
      name: [this.padlet.name, Validators.required],
      is_public: [this.padlet.is_public, Validators.required],
      user_id: [this.padlet.user_id, Validators.required]
    });
    // Bei Änderungen wird die Methode updateErrorMessages() aufgerufen, um eventuelle
    // Fehlermeldungen zu aktualisieren
    this.padletForm.statusChanges.subscribe(()=>
      this.updateErrorMessages());
  }

  /*
  Fehlermeldungen für das Formular werden basierend auf den Validierungsregeln und den aktuellen Formulareingaben
  angelegt. Die Fehlermeldungen können dann verwendet werden, um den Benutzer über ungültige Eingaben
  zu informieren und Feedback zu geben.
 */
  updateErrorMessages() {
    console.log("Is form invalid? " + this.padletForm.invalid);
    this.errors = {};

    for (const message of PadletFormErrorMessages) {
      const control = this.padletForm.get(message.forControl);
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

  submitForm() {
    const padlet: Padlet = PadletFactory.fromObject(this.padletForm.value);
    // vorhandene Autoren werden einfach kopiert, weil zeit fehlte neue anzulegen
    padlet.user = this.padlet.user;
          if(this.isUpdatingPadlet) {
            this.ps.updatePadlet(padlet).subscribe(res => {
              this.router.navigate(["padlets", padlet.id]);
            });
          } else {
            padlet.user_id = 1;
            console.log(padlet);
            this.ps.savePadlet(padlet).subscribe(res => {
              this.padlet = PadletFactory.empty();
              this.padletForm.reset(PadletFactory.empty());
              this.router.navigate(["padlets"]);
            });
          }
    }
}
