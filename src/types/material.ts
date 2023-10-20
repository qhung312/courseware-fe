export type Material = {
  _id: string;
  name: string;
  subject: string;
  chapter: string;

  description: string;
  resource: string;
  createdBy: string;
  createdAt: number;
  lastUpdatedAt?: number;

  deletedAt?: number;
};
