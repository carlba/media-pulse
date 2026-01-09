/**
 * Example script demonstrating the Media Pulse system
 * 
 * Prerequisites:
 * 1. Redis server must be running (default: localhost:6379)
 * 2. Start this script to see the system in action
 * 
 * To run:
 * 1. Start Redis: redis-server
 * 2. Run: npm run start:dev
 */

import { TraktMonitorService } from './services/traktMonitorService.js';
import { createFolderScanWorker } from './workers/folderScanWorker.js';

async function runExample() {
  console.log('=== Media Pulse Example ===\n');

  // Step 1: Start the folder scan worker
  console.log('1. Starting folder scan worker...');
  const worker = createFolderScanWorker();
  console.log('   ✓ Worker started and listening for jobs\n');

  // Step 2: Create and start the Trakt monitor service
  console.log('2. Starting Trakt monitor service...');
  const monitor = new TraktMonitorService();
  monitor.start();
  console.log('   ✓ Monitor started\n');

  // Step 3: Simulate Trakt.tv changes
  console.log('3. Simulating Trakt.tv list changes...\n');

  // Example 1: New episode added
  await monitor.processChange({
    type: 'episode',
    title: 'Breaking Bad S01E01 - Pilot',
    folderPath: '/media/tv/Breaking Bad/Season 01',
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Example 2: New season added
  await monitor.processChange({
    type: 'season',
    title: 'The Wire - Season 5',
    folderPath: '/media/tv/The Wire/Season 05',
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Example 3: New series added (no folder path yet)
  await monitor.processChange({
    type: 'series',
    title: 'New Show 2024',
    // No folderPath - will be logged but not queued
  });

  // Wait for jobs to process
  console.log('\n4. Waiting for jobs to complete...');
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Cleanup
  console.log('\n5. Shutting down...');
  monitor.stop();
  await worker.close();
  console.log('   ✓ Shutdown complete\n');

  console.log('=== Example Complete ===');
  process.exit(0);
}

// Run the example
runExample().catch((error) => {
  console.error('Error running example:', error);
  process.exit(1);
});
