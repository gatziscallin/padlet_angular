import {User} from "./user";

export class UserFactory {

  static empty() : User{
    return new User(1,"Julia", "Kriegner","lisa@maier.at","secret", "");
  }


  static fromObject(rawUser: any) : User{
    return new User(
      rawUser.id,
      rawUser.firstName,
      rawUser.lastName,
      rawUser.email,
      rawUser.password,
      rawUser.image
    );

  }
}
