import {Ticket} from "./Ticket";
import {Reply} from "./Reply";

export class User {
  id!: string;
  userName!: string;
  email!: string;
  password!: string;
  path!: string;
  role!: string;
  tickets!: Ticket[];
  // replies!: Reply[];
}
