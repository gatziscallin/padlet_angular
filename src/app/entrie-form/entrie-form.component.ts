import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Entrie} from "../shared/entrie";
import {EntrieFactory} from "../shared/entrie-factory";
import {EntrieService} from "../shared/entrie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EntrieFormErrorMessages} from "../entrie-form/entrie-form-error-messages";

@Component({
  selector: 'bs-entrie-form',
  templateUrl: './entrie-form.component.html',
  styles: [
  ]
})

/*
  Diese Komponente ist die Formverarbeitung zum Erstellen/Bearbeiten/Löschen eines Eintrags
 */
export class EntrieFormComponent {

  entryForm: FormGroup;
  entrie: Entrie = EntrieFactory.empty();
  errors : { [key: string]: string} = {};
  isUpdatingEntrie = false;

  constructor(
    private fb: FormBuilder,
    private ps: EntrieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.entryForm = this.fb.group({});
  }

  /*
    Initialisierung des Eintrages

      Wenn eine id vorhanden ist, wird über den ps.getSingleEntrie(id)-Aufruf ein HTTP-Anfrage an den Server gesendet,
      um den einzelnen Eintrag abzurufen. Das Ergebnis der Anfrage wird über den subscribe()-Aufruf verarbeitet. Ist
      bereits ein Eintrag vorhanden wird isUpdatingEntrie auf true gesetzt.

      Schließlich wird die Methode initEntrie() unabhängig davon, ob eine id vorhanden war oder nicht, erneut
      aufgerufen, um sicherzustellen, dass der Eintrag richtig initialisiert wird.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if(id){
      this.isUpdatingEntrie = true;
      this.ps.getSingleEntrie(id).subscribe
      (entrie => {
          this.entrie = entrie
          this.initEntrie();
        }
      );
    }
    this.initEntrie();
  }

  /*
    Die Werte der Formularkontrollen werden mit den entsprechenden Werten und Validatoren des entrie-Objekts vorbelegt.
   */
  initEntrie() {
    this.entryForm = this.fb.group({
      id: this.entrie.id,
      user_id: [this.entrie.user_id, Validators.required],
      padlet_id: [this.route.snapshot.params["padlet_id"], Validators.required],
      title: [this.entrie.title, Validators.required],
      content: [this.entrie.content, Validators.required]
    });
    // Bei Änderungen wird die Methode updateErrorMessages() aufgerufen, um eventuelle
    // Fehlermeldungen zu aktualisieren
    this.entryForm.statusChanges.subscribe(()=>
      this.updateErrorMessages());
  }

  /*
  Fehlermeldungen für das Formular werden basierend auf den Validierungsregeln und den aktuellen Formulareingaben
  angelegt. Die Fehlermeldungen können dann verwendet werden, um den Benutzer über ungültige Eingaben
  zu informieren und Feedback zu geben.
 */
  updateErrorMessages() {
    console.log("Is form invalid? " + this.entryForm.invalid);
    this.errors = {};

    for (const message of EntrieFormErrorMessages) {
      const control = this.entryForm.get(message.forControl);
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
    const entrie: Entrie = EntrieFactory.fromObject(this.entryForm.value);
    if(this.isUpdatingEntrie) {
      this.ps.updateEntrie(entrie).subscribe(res => {
        this.router.navigate(["../../../../../padlets", entrie.padlet_id], {
          relativeTo: this.route
        });
      });
    } else {
      this.ps.saveEntrie(entrie).subscribe(res => {
        this.entrie = EntrieFactory.empty();
        this.entryForm.reset(EntrieFactory.empty());
        this.router.navigate(["../../../../padlets", entrie.padlet_id], {
          relativeTo: this.route
        });
      });
    }
  }
}
