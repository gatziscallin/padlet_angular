import {User} from "./user";

export class UserFactory {

  static empty() : User{
    return new User(1,"Julia", "Kriegner","lisa@maier.at","secret", "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.masslive.com%2Fresizer%2FkNl3qvErgJ3B0Cu-WSBWFYc1B8Q%3D%2Farc-anglerfish-arc2-prod-advancelocal%2Fpublic%2FW5HI6Y4DINDTNP76R6CLA5IWRU.jpeg&tbnid=BI-_lAL0uPgAFM&vet=12ahUKEwi79aWk-_7-AhUR_aQKHR3YAooQMygJegUIARD4AQ..i&imgrefurl=https%3A%2F%2Fwww.masslive.com%2Fpolitics%2F2021%2F11%2Fi-take-great-pride-in-being-a-trailblazer-delmaria-lopez-becomes-first-person-of-color-elected-to-chicopee-city-council-shares-goals.html&docid=cgxLlA9QfulJIM&w=1280&h=924&q=person&ved=2ahUKEwi79aWk-_7-AhUR_aQKHR3YAooQMygJegUIARD4AQ");
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
