import {Entrie, Padlet, User} from "./entrie";
import {Rating} from "./rating";
import {Comment} from "./comment";

export class EntrieFactory {

  static empty() : Entrie{

    return new Entrie(1,1, 1, 'Title', 'Content', [], []);
  }
  static fromObject(rawEntrie: any) : Entrie{
    return new Entrie(
      rawEntrie.id,
      rawEntrie.user_id,
      rawEntrie.padlet_id,
      rawEntrie.title,
      rawEntrie.content,
      rawEntrie.rating,
      rawEntrie.comment
    );
  }
}
