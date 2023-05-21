import {Padlet, User} from "./padlet";
import {PadletService} from "./padlet.service";

export class PadletFactory {
  constructor(public ps: PadletService) {
  }

  static empty(): Padlet {
    return new Padlet('', '', true,1, new Date(), new User(1,'','','','',''),[]);
  }

  static fromObject(rawPadlet: any): Padlet {
    return new Padlet(
      rawPadlet.id,
      rawPadlet.name,
      rawPadlet.is_public,
      rawPadlet.user_id,
      rawPadlet.created_at,
      rawPadlet.user,
      rawPadlet.entries
    );
  }
}
