import { Test, run } from 'beater';
import { tests as fetchTests } from './_/fetch';
import { tests as dataTests } from './data';

const tests = ([] as Test[])
  .concat(dataTests)
  .concat(fetchTests);

run(tests).catch(() => process.exit(1));
