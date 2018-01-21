import { Test, run } from 'beater';
import { tests as addTests } from './add';
import { tests as fetchTests } from './fetch';

const tests = ([] as Test[])
  .concat(addTests)
  .concat(fetchTests);

run(tests).catch(() => process.exit(1));
