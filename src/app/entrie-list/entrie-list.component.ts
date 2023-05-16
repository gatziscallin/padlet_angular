import { Component, Input } from '@angular/core';
import { Entrie } from "../shared/entrie";
import { User } from "../shared/entrie";
import { Padlet } from "../shared/entrie";

@Component({
  selector: 'bs-entrie-list',
  templateUrl: './entrie-list.component.html',
  styles: [
  ]
})
export class EntrieListComponent {
  @Input() entries: Entrie[] = [];

  constructor() {
  }

  ngOnInit() {
    this.entries = [
      new Entrie(1, new User(1, 'Susi', 'Huber', 'test@test.at', 'secret',
          'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png'), new Padlet(1,
          'Padlet 1', true,
          new User(3, 'Julia', 'Müller', 'test@test.at', 'secret',
            'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png')),
        'Erster Eintrag', 'Blablabla'),
      new Entrie(2, new User(2, 'Susi', 'Huber', 'test@test.at', 'secret',
          'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png'), new Padlet(1,
          'Padlet 1', true,
          new User(3, 'Julia', 'Müller', 'test@test.at', 'secret',
            'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png')),
        'Erster Eintrag', 'Blablabla')
    ]
  }
}
