import {Component,EventEmitter,Input, OnInit,Output} from '@angular/core';
import {Padlet, User} from "../shared/padlet";
import {Entrie} from "../shared/entrie";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})
export class PadletDetailsComponent implements OnInit{

  @Input() padlet: Padlet | undefined

  @Output() showListEvent = new EventEmitter<any>();

  showPadletList(){
    this.showListEvent.emit();
  }

  entries: Entrie[] = [];


  ngOnInit(){
    this.entries = [
      new Entrie(
        1, new User(3,'Susi', 'Huber', 'test@test.at', 'secret', 'https://i.pi'),
        new Padlet(3, 'Padlet 3', true, new User(3,'Susi', 'Huber', 'test@test.at', 'secret', 'https://i.pi'),
          ),'Titel Entrie 1', 'content'),
      new Entrie(
        2, new User(4,'Susi', 'Huber', 'test@test.at', 'secret', 'https://i.pi'),
        new Padlet(4, 'Padlet 3',true, new User(5,'Susi', 'Huber', 'test@test.at', 'secret', 'https://i.pi'),
          ),'Titel Entrie 2', 'content'),
    ]
  }

}
