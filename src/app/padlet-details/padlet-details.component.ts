import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Padlet} from "../shared/padlet";


@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})
export class PadletDetailsComponent {

  @Input() padlet: Padlet | undefined
  @Output() showListEvent = new EventEmitter<any>();

  showPadletList() {
    this.showListEvent.emit();
  }

}
