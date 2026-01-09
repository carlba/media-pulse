import { TraktMonitorService } from './services/trakt-monitor.service.js';
import { createFolderScanWorker } from './workers/folder-scan.worker.js';

export function helloWorld() {
  return 'Hello World!';
}

/**
 * Main entry point for the Media Pulse application
 */
async function main() {
  console.log('Starting Media Pulse...');

  // Create and start the folder scan worker
  const worker = createFolderScanWorker();
  console.log('Folder scan worker started');

  // Create the Trakt monitor service
  const traktMonitor = new TraktMonitorService();
  traktMonitor.start();

  // Example: Process a test change
  // In production, this would be triggered by actual Trakt.tv API events
  await traktMonitor.processChange({
    type: 'episode',
    title: 'Breaking Bad S01E01',
    folderPath: '/media/tv/Breaking Bad',
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down gracefully...');
    traktMonitor.stop();
    void worker.close().then(() => {
      process.exit(0);
    });
  });
}

// Run the application if this file is executed directly
// We compare resolved file paths to handle different module resolution scenarios
const isMainModule =
  process.argv[1] && import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`;

if (isMainModule) {
  main().catch((error) => {
    console.error('Error starting application:', error);
    process.exit(1);
  });
}

export { TraktMonitorService } from './services/trakt-monitor.service.js';
export { createFolderScanWorker } from './workers/folder-scan.worker.js';
export { addFolderScanJob, folderScanQueue } from './queue/folder-scan.queue.js';
export * from './types/index.js';
