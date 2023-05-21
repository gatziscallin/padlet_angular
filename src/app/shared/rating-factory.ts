import {Rating} from "./rating";
import {User} from "./user";
import {Entrie} from "./entrie";

export class RatingFactory {

  static empty() : Rating{
    return new Rating(1,1,new User(1,'', '', '', '', ''),
      1,1);
  }


  static fromObject(rawRating: any) : Rating{
    return new Rating(
      rawRating.id,
      rawRating.user_id,
      rawRating.User,
      rawRating.entrie_id,
      rawRating.rating
    );

  }
}
