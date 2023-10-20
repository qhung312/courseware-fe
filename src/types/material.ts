import { Chapter } from './chapter';
import { Subject } from './subject';
import { User } from './user';

export type Material = {
  _id: string;
  name: string;
  subject: Subject;
  chapter: Chapter;

  description: string;
  resource: {
    originalName: string;
  };
  createdBy: User;
  createdAt: number;
  lastUpdatedAt?: number;

  deletedAt?: number;
};
