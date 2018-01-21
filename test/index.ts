import { Test, run } from 'beater';
import { tests as addTests } from './add';
import { tests as dataTests } from './data';
import { tests as fetchTests } from './fetch';

const tests = ([] as Test[])
  .concat(addTests)
  .concat(dataTests)
  .concat(fetchTests);

run(tests).catch(() => process.exit(1));
