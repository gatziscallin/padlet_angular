import {Comment} from "./comment";
import {User} from "./user";
import {Entrie} from "./entrie";

export class CommentFactory {

  static empty() : Comment{
    return new Comment(1, 1, new User(1,'', '', '', '', ''),
      1,new Entrie('',1,1,'','',new Date(),[],[]),'');
  }


  static fromObject(rawComment: any) : Comment{
    return new Comment(
      rawComment.id,
      rawComment.user_id,
      rawComment.User,
      rawComment.entrie_id,
      rawComment.Entrie,
      rawComment.comment
    );
  }
}
