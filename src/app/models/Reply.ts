import {User} from "./User";
import {Ticket} from "./Ticket";

export class Reply {
  id!: number;
  content!: string;
  createdAt!: Date;
  user!: User;
  userId!: string;
  ticket!: Ticket;
  ticketId!: number;

}
