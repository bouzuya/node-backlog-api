import { Test, run } from 'beater';
import { tests as addTests } from './add';

const tests = ([] as Test[])
  .concat(addTests);

run(tests).catch(() => process.exit(1));
