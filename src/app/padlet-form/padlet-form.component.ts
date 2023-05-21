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

  initPadlet() {
    this.padletForm = this.fb.group({
      id: this.padlet.id,
      name: [this.padlet.name, Validators.required],
      is_public: [this.padlet.is_public, Validators.required],
      user_id: [this.padlet.user_id, Validators.required]
    });
    this.padletForm.statusChanges.subscribe(()=>
      this.updateErrorMessages());
  }

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
