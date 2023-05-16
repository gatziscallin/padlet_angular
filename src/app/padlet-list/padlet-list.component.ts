import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Padlet, User } from "../shared/padlet";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: [
  ]
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];

  @Output() showDetailsEvent = new EventEmitter<Padlet>();

  ngOnInit() {
    this.padlets = [
      new Padlet(1,
        'Web',
        true,
        new User(1,"Antonia","Kriegner","antonia@kriegner.at","secret","url"),
      ),
      new Padlet(2,
        'Kommunikation',
        false,
        new User(4,"Tobias","Ratzberger","tobi@ratz.at","secret","url"),
      )
    ]
  }

  showDetails(padlet: Padlet) {
    this.showDetailsEvent.emit(padlet);
  }
}
