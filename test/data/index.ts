import { Test } from 'beater';
import { tests as clientTests } from './client';

const tests = ([] as Test[])
  .concat(clientTests);

export { tests };
