import { Injectable } from '@angular/core';
import { Padlet, User } from "./padlet";
import {Entrie} from "./entrie";

@Injectable({
  providedIn: 'root'
})
export class PadletService {
  padlets: Padlet[];
  entries: Entrie[];

  constructor() {
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
    ],
      this.entries = [
        new Entrie(
          1, new User(3,'Susi', 'Huber', 'test@test.at', 'secret', 'https://i.pi'),
          1,'Titel Entrie 1', 'content'),
        new Entrie(
          2, new User(4,'Susi', 'Huber', 'test@test.at', 'secret', 'https://i.pi'),
          1,'Titel Entrie 2', 'content'),
      ]
  }

  getAllPadlets() {
    return this.padlets;
  }

  getAllEntries(id:number) : Entrie[]{
    return <Array<Entrie>>this.entries.filter(entrie=>entrie.padlet_id == id);
  }

  getSinglePadlet(id:number) : Padlet {
    return <Padlet>this.padlets.find(padlet => padlet.id == id);
  }
}
