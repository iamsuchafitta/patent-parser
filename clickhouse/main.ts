import { MigrationManager } from './lib.js';
import { migration1Init } from './migrations/migration1-init.js';

await MigrationManager.run(async migrate => {
  await migrate(migration1Init, 'init');
});
