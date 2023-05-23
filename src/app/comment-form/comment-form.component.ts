import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Comment } from "../shared/comment";
import {EntrieService} from "../shared/entrie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentFactory} from "../shared/comment-factory";
import {CommentFormErrorMessages} from "../comment-form/comment-form-error-messages";

@Component({
  selector: 'bs-comment-form',
  templateUrl: './comment-form.component.html',
  styles: [
  ]
})

/*
  Diese Komponente ist die Formverarbeitung zum Erstellen eines Kommentars
 */
export class CommentFormComponent {
  commentForm: FormGroup;
  comment: Comment = CommentFactory.empty();
  errors : { [key: string]: string} = {};

  constructor(
    private fb: FormBuilder,
    private ps: EntrieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.commentForm = this.fb.group({});
  }

  /*
    Initialisierung des Kommentars

      Wenn eine id vorhanden ist, wird über den ps.getSingleComment(id)-Aufruf ein HTTP-Anfrage an den Server gesendet,
      um den einzelnen Kommentar abzurufen. Das Ergebnis der Anfrage wird über den subscribe()-Aufruf verarbeitet.

      Schließlich wird die Methode initComment() unabhängig davon, ob eine id vorhanden war oder nicht, erneut
      aufgerufen, um sicherzustellen, dass der Kommentar richtig initialisiert wird.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if(id){
      this.ps.getSingleComment(id).subscribe
      (comment => {
          this.comment = comment
          this.initComment();
        }
      );
    }
    this.initComment();
  }

  /*
    Die Werte der Formularkontrollen werden mit den entsprechenden Werten und Validatoren des comment-Objekts vorbelegt.
   */
  initComment() {
    this.commentForm = this.fb.group({
      id: this.comment.id,
      user_id: [this.comment.user_id,Validators.required],
      entrie_id: [this.route.snapshot.params["entrie_id"], Validators.required],
      comment: [this.comment.comment, Validators.required],
      create_Date: [this.comment.create_date, Validators.required]
    });

    // Bei Änderungen wird die Methode updateErrorMessages() aufgerufen, um eventuelle
    // Fehlermeldungen zu aktualisieren.
    this.commentForm.statusChanges.subscribe(()=>
      this.updateErrorMessages());
  }

  /*
    Fehlermeldungen für das Formular werden basierend auf den Validierungsregeln und den aktuellen Formulareingaben
    angelegt. Die Fehlermeldungen können dann verwendet werden, um den Benutzer über ungültige Eingaben
    zu informieren und Feedback zu geben.
   */
  updateErrorMessages() {
    console.log("Is form invalid? " + this.commentForm.invalid);
    this.errors = {};

    for (const message of CommentFormErrorMessages) {
      const control = this.commentForm.get(message.forControl);
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
    Speichert neuen Kommentar in die Datenbank und verlinkt auf das jeweilige Padlet zurück, wo der Kommentar
    angelegt worden ist.
   */
  submitForm() {
    const comment: Comment = CommentFactory.fromObject(this.commentForm.value);
    this.ps.saveComment(comment).subscribe(res => {
      this.comment = CommentFactory.empty();
      this.commentForm.reset(CommentFactory.empty());
      this.router.navigate(["/padlets", this.route.snapshot.params["padlet_id"]]);
    });
  }
}





