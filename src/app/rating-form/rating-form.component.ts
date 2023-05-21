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

  initRating() {
    this.ratingForm = this.fb.group({
      id:this.rating.id,
      user_id: [1, Validators.required],
      entrie_id: [this.route.snapshot.params["entrie_id"], Validators.required],
      rating: [this.rating.rating, Validators.required]
    });
    this.ratingForm.statusChanges.subscribe(()=>
      this.updateErrorMessages());
  }

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

  submitForm() {
    const rating: Rating = RatingFactory.fromObject(this.ratingForm.value);
    console.log("Rating anlegen");
    this.ps.saveRating(rating).subscribe(res => {
      this.rating = RatingFactory.empty();
      this.ratingForm.reset(RatingFactory.empty());
      this.router.navigate(["/padlets", this.route.snapshot.params["padlet_id"]]);
    });
  }
}
