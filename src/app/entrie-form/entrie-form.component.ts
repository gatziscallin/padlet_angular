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

  initEntrie() {
    this.entryForm = this.fb.group({
      id: this.entrie.id,
      user_id: [this.entrie.user_id, Validators.required],
      padlet_id: [this.route.snapshot.params["padlet_id"], Validators.required],
      title: [this.entrie.title, Validators.required],
      content: [this.entrie.content, Validators.required]
    });
    this.entryForm.statusChanges.subscribe(()=>
      this.updateErrorMessages());
  }

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
