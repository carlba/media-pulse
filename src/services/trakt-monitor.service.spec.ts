import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TraktMonitorService } from './trakt-monitor.service.js';
import * as folderScanQueue from '../queue/folder-scan.queue.js';

// Mock the queue module
vi.mock('../queue/folder-scan.queue.js', () => ({
  addFolderScanJob: vi.fn().mockResolvedValue(undefined),
  folderScanQueue: {},
}));

describe('TraktMonitorService', () => {
  let service: TraktMonitorService;

  beforeEach(() => {
    service = new TraktMonitorService();
    vi.clearAllMocks();
  });

  it('should start and stop the service', () => {
    expect(service.getStatus()).toBe(false);

    service.start();
    expect(service.getStatus()).toBe(true);

    service.stop();
    expect(service.getStatus()).toBe(false);
  });

  it('should not start twice', () => {
    service.start();
    expect(service.getStatus()).toBe(true);

    service.start(); // Should not cause issues
    expect(service.getStatus()).toBe(true);

    service.stop();
  });

  it('should process a change with folder path', async () => {
    await service.processChange({
      type: 'episode',
      title: 'Test Episode',
      folderPath: '/test/path',
    });

    expect(folderScanQueue.addFolderScanJob).toHaveBeenCalledWith({
      folderPath: '/test/path',
      title: 'Test Episode',
      type: 'episode',
    });
  });

  it('should process a change without folder path', async () => {
    await service.processChange({
      type: 'series',
      title: 'Test Series',
    });

    expect(folderScanQueue.addFolderScanJob).not.toHaveBeenCalled();
  });
});
