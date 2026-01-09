import type { TraktChange } from '../types/index.js';
import { addFolderScanJob } from '../queue/folderScanQueue.js';

/**
 * Service to monitor Trakt.tv list changes
 * This is a simplified version that demonstrates the pattern
 */
export class TraktMonitorService {
  private isRunning = false;

  /**
   * Process a Trakt.tv change event
   */
  async processChange(change: TraktChange): Promise<void> {
    console.log(`Detected Trakt.tv change: ${change.type} - ${change.title}`);

    // If we have a folder path, queue a scan job
    if (change.folderPath) {
      await addFolderScanJob({
        folderPath: change.folderPath,
        title: change.title,
        type: change.type,
      });
      console.log(`Queued folder scan for: ${change.folderPath}`);
    } else {
      console.log(`No folder path provided for: ${change.title}`);
    }
  }

  /**
   * Start monitoring (placeholder for actual implementation)
   */
  start(): void {
    if (this.isRunning) {
      console.log('Trakt monitor is already running');
      return;
    }

    this.isRunning = true;
    console.log('Trakt monitor service started');
    // TODO: Implement actual Trakt.tv API integration here
  }

  /**
   * Stop monitoring
   */
  stop(): void {
    this.isRunning = false;
    console.log('Trakt monitor service stopped');
  }

  /**
   * Check if the service is running
   */
  getStatus(): boolean {
    return this.isRunning;
  }
}
