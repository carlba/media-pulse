import { describe, it, expect } from 'vitest';
import type { TraktChange, FolderScanJob, TraktChangeType } from './index.js';

describe('Types', () => {
  it('should allow valid TraktChangeType values', () => {
    const types: TraktChangeType[] = ['episode', 'season', 'series'];
    expect(types).toContain('episode');
    expect(types).toContain('season');
    expect(types).toContain('series');
  });

  it('should create a valid TraktChange object', () => {
    const change: TraktChange = {
      type: 'episode',
      title: 'Breaking Bad S01E01',
      folderPath: '/media/tv/Breaking Bad',
    };

    expect(change.type).toBe('episode');
    expect(change.title).toBe('Breaking Bad S01E01');
    expect(change.folderPath).toBe('/media/tv/Breaking Bad');
  });

  it('should create a valid FolderScanJob object', () => {
    const job: FolderScanJob = {
      folderPath: '/media/tv/Breaking Bad',
      title: 'Breaking Bad S01E01',
      type: 'episode',
    };

    expect(job.folderPath).toBe('/media/tv/Breaking Bad');
    expect(job.title).toBe('Breaking Bad S01E01');
    expect(job.type).toBe('episode');
  });

  it('should allow TraktChange without folderPath', () => {
    const change: TraktChange = {
      type: 'series',
      title: 'New Series',
    };

    expect(change.folderPath).toBeUndefined();
  });
});
