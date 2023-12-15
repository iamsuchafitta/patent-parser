import process from 'node:process';
import event from 'node:events';

export function appMonitor() {
  const memoryUsage = process.memoryUsage();

  const rss = (memoryUsage.rss / 1024 / 1024).toFixed(2);
  const heapTotal = (memoryUsage.heapTotal / 1024 / 1024).toFixed(2);
  const heapUsed = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
  const external = (memoryUsage.external / 1024 / 1024).toFixed(2);
  const SIGHUPs = event.listenerCount(process, 'SIGHUP');
  const SIGINTs = event.listenerCount(process, 'SIGINT');
  const SIGTERMs = event.listenerCount(process, 'SIGTERM');

  console.log(`
     rss: ${rss} MB
    heap: ${heapUsed} / ${heapTotal} MB
external: ${external} MB
 SIGHUPs: ${SIGHUPs}, SIGINTs: ${SIGINTs}, SIGTERMs: ${SIGTERMs}
`);
}
