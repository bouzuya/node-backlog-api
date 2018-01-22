import { Test } from 'beater';
import { tests as buildUrlTests } from './build-url';
import { tests as fetchTests } from './fetch';
import { tests as getBaseUrlTests } from './get-base-url';

const tests = ([] as Test[])
  .concat(buildUrlTests)
  .concat(fetchTests)
  .concat(getBaseUrlTests);

export { tests };
