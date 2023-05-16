import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Padlet, User } from "../shared/padlet";
import {PadletService} from "../shared/padlet.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: [
  ]
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];

  constructor(private ps: PadletService) {
  }

  @Output() showDetailsEvent = new EventEmitter<Padlet>();

  ngOnInit() {
    this.padlets = this.ps.getAllPadlets();
  }
}
