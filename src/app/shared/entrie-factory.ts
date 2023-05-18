import {Entrie} from "./entrie";

export class EntrieFactory {

  static empty() : Entrie{
    return new Entrie(1,1, 1,"Entry title","Mein Inhalt");
  }


  static fromObject(rawEntrie: any) : Entrie{
    return new Entrie(
      rawEntrie.id,
      rawEntrie.user_id,
      rawEntrie.padlet_id,
      rawEntrie.title,
      rawEntrie.content
    );

  }
}
