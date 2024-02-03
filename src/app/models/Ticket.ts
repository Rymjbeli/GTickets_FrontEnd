import {User} from "./User";
import {Reply} from "./Reply";


export class Ticket {
  id!: number;
  title!: string;
  content!: string;
  status!: string;
  createdAt!: Date;
  updatedAt!: Date;
  priority!: string;
  userId!: string;
  user!: User;
  replies!: Reply[];

}
