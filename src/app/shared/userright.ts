import { User } from "./user";
import { Padlet } from "./padlet";
export { User } from "./user";
export { Padlet } from "./padlet";

export class Userright {
  constructor(
    public user_id:User,
    public padlet_id:Padlet,
    public read:number,
    public Delete:number,
    public edit:number
  ) {}
}
