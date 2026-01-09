import { Queue } from 'bullmq';
import type { QueueOptions } from 'bullmq';
import type { FolderScanJob } from '../types/index.js';
import { redisConnection } from './connection.js';

/**
 * Default queue configuration
 */
const defaultQueueConfig: QueueOptions = {
  connection: redisConnection,
};

/**
 * Queue for folder scan jobs
 */
export const folderScanQueue = new Queue<FolderScanJob>('folder-scan', defaultQueueConfig);

/**
 * Add a folder scan job to the queue
 */
export async function addFolderScanJob(jobData: FolderScanJob): Promise<void> {
  await folderScanQueue.add('scan-folder', jobData, {
    removeOnComplete: true,
    removeOnFail: false,
  });
}
