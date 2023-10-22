export type Chapter = {
  _id: string;
  name: string;
  subject: string;
  description: string;

  createdBy: string;
  createdAt: number;
  lastUpdatedAt?: number;
  deletedAt?: number;
};
