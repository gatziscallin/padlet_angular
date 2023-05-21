import { User } from "./user";
import {Entrie} from "./entrie";
export { User } from "./user";


export class Padlet {
  constructor(
    public id: string,
    public name: string,
    public is_public: boolean,
    public user_id: number,
    public created_at: Date,
    public user: User,
    public entries: Entrie[]
  ) {}
}
