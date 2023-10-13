import React from 'react';

import { ROLES } from './auth';

export type TRoute = {
  title: string;
  path: string;
  component: React.FC;
  isProtected: boolean;
  roles?: ROLES[];
};
