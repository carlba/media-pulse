/**
 * Type of change detected in Trakt.tv
 */
export type TraktChangeType = 'episode' | 'season' | 'series';

/**
 * Data for a Trakt.tv list change event
 */
export interface TraktChange {
  /** Type of content that changed */
  type: TraktChangeType;
  /** Name/title of the content */
  title: string;
  /** Optional path to scan */
  folderPath?: string;
}

/**
 * Job data for folder scan queue
 */
export interface FolderScanJob {
  /** Path to the folder to scan */
  folderPath: string;
  /** Title that triggered the scan */
  title: string;
  /** Type of content */
  type: TraktChangeType;
}
