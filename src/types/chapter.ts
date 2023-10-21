import { Subject } from './subject';
import { User } from './user';

export type Chapter = {
  _id: string;
  name: string;
  subject: Subject;
  description: string;

  createdBy: User;
  createdAt: number;
  lastUpdatedAt?: number;
  deletedAt?: number;
};
