import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Padlet, User} from "../shared/padlet";
import {Comment} from "../shared/comment";
import {Rating} from "../shared/rating";

@Component({
  selector: 'bs-entrie-item',
  templateUrl: './entrie-item.component.html',
  styles: [
  ]
})
export class EntrieItemComponent {
  @Input() comment: Comment | undefined
  @Input() rating: Rating | undefined

  // kommentare und ratings müssen noch angezeigt werden
}
