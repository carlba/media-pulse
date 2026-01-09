import { Worker, Job } from 'bullmq';
import type { FolderScanJob } from '../types/index.js';
import { redisConnection } from '../queue/connection.js';

/**
 * Process a folder scan job
 */
async function processFolderScan(job: Job<FolderScanJob>): Promise<void> {
  const { folderPath, title, type } = job.data;

  console.log(`Processing folder scan job:`);
  console.log(`  Type: ${type}`);
  console.log(`  Title: ${title}`);
  console.log(`  Folder: ${folderPath}`);

  // TODO: Implement actual folder scanning logic here
  // For now, this is a placeholder that demonstrates the worker is functioning
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log(`Completed folder scan for: ${title}`);
}

/**
 * Create and start a folder scan worker
 */
export function createFolderScanWorker(): Worker<FolderScanJob> {
  const worker = new Worker<FolderScanJob>('folder-scan', processFolderScan, {
    connection: redisConnection,
  });

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully`);
  });

  worker.on('failed', (job, err) => {
    if (job) {
      console.error(`Job ${job.id} failed with error:`, err);
    } else {
      console.error(`Job failed with error:`, err);
    }
  });

  return worker;
}
