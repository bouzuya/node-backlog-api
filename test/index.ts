import { Test, run } from 'beater';
import { tests as dataTests } from './data';
import { tests as fetchTests } from './fetch';

const tests = ([] as Test[])
  .concat(dataTests)
  .concat(fetchTests);

run(tests).catch(() => process.exit(1));
