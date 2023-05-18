import {Padlet, User} from "./padlet";

export class PadletFactory {

  static empty(): Padlet {
    return new Padlet(1, 'Padlet', true,1,
      new User(1, 'Julia', 'Müller',
        'julia@mueller.com', 'secret', 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'), []);
  }

  static fromObject(rawPadlet: any): Padlet {
    return new Padlet(
      rawPadlet.id,
      rawPadlet.name,
      rawPadlet.is_public,
      rawPadlet.user_id,
      rawPadlet.user,
      rawPadlet.entries
    );
  }
}
