import process from 'node:process';
import event from 'node:events';

export async function appMonitor() {
  const memoryUsage = process.memoryUsage();

  const rssMb = parseFloat((memoryUsage.rss / 1024 / 1024).toFixed(2));
  const heapTotalMb = parseFloat((memoryUsage.heapTotal / 1024 / 1024).toFixed(2));
  const heapUsedMb = parseFloat((memoryUsage.heapUsed / 1024 / 1024).toFixed(2));
  const externalMb = parseFloat((memoryUsage.external / 1024 / 1024).toFixed(2));
  const SIGHUPs = event.listenerCount(process, 'SIGHUP');
  const SIGINTs = event.listenerCount(process, 'SIGINT');
  const SIGTERMs = event.listenerCount(process, 'SIGTERM');

//   console.log(`
//      rss: ${rssMb} MB
//     heap: ${heapUsedMb} / ${heapTotalMb} MB
// external: ${externalMb} MB
//  SIGHUPs: ${SIGHUPs}, SIGINTs: ${SIGINTs}, SIGTERMs: ${SIGTERMs}
// `);

  return {
    rssMb,
    heapTotalMb,
    heapUsedMb,
    externalMb,
    SIGHUPs,
    SIGINTs,
    SIGTERMs,
  };
}
