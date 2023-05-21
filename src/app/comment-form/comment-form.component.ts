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

  initComment() {
    this.commentForm = this.fb.group({
      id: this.comment.id,
      user_id: [this.comment.user_id,Validators.required],
      entrie_id: [this.route.snapshot.params["entrie_id"], Validators.required],
      comment: [this.comment.comment, Validators.required]
    });
    this.commentForm.statusChanges.subscribe(()=>
      this.updateErrorMessages());
  }

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

  submitForm() {
    const comment: Comment = CommentFactory.fromObject(this.commentForm.value);
    this.ps.saveComment(comment).subscribe(res => {
      this.comment = CommentFactory.empty();
      this.commentForm.reset(CommentFactory.empty());
      this.router.navigate(["/padlets", this.route.snapshot.params["padlet_id"]]);
    });
  }
}





