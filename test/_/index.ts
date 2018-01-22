import { Test } from 'beater';
import { tests as fetchTests } from './fetch';
import { tests as getBaseUrlTests } from './get-base-url';

const tests = ([] as Test[])
  .concat(fetchTests)
  .concat(getBaseUrlTests);

export { tests };
