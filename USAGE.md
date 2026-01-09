# Media Pulse

A tool that monitors Trakt.tv list changes (episodes, seasons, series) and triggers folder scans using BullMQ.

## Features

- **Trakt.tv List Monitoring**: Detects when episodes, seasons, or series are added to Trakt.tv lists
- **Queue-based Processing**: Uses BullMQ for reliable job processing
- **Worker Architecture**: Separate worker processes for scanning folders
- **Simple and Extensible**: Built to start simple and expand functionality

## Architecture

The system consists of three main components:

1. **TraktMonitorService**: Monitors Trakt.tv for list changes
2. **Queue System**: BullMQ-based queue for managing folder scan jobs
3. **FolderScanWorker**: Worker that processes folder scan jobs

## Requirements

- Node.js 24.x or higher
- Redis server (for BullMQ)
- TypeScript

## Installation

```bash
npm install
```

## Configuration

Configure Redis connection via environment variables:

```bash
REDIS_HOST=localhost  # default: localhost
REDIS_PORT=6379       # default: 6379
```

## Usage

### Running the Example

To see the system in action with sample data:

```bash
# Option 1: Using Docker Compose (recommended)
docker-compose up -d  # Start Redis in background
npm run example       # Run the example
docker-compose down   # Stop Redis when done

# Option 2: Using local Redis
# 1. Start Redis server (in a separate terminal)
redis-server

# 2. Run the example
npm run example
```

The example demonstrates:
- Starting the worker and monitor service
- Processing different types of Trakt.tv changes (episode, season, series)
- Queue-based job processing
- Graceful shutdown

### Starting the Application

```bash
# Development mode with auto-reload
npm run start:dev

# Production mode
npm run build
npm start
```

### Example: Processing a Trakt.tv Change

```typescript
import { TraktMonitorService } from './services/traktMonitorService.js';
import { createFolderScanWorker } from './workers/folderScanWorker.js';

// Start the worker
const worker = createFolderScanWorker();

// Create monitor service
const monitor = new TraktMonitorService();
monitor.start();

// Process a change
await monitor.processChange({
  type: 'episode',
  title: 'Breaking Bad S01E01',
  folderPath: '/media/tv/Breaking Bad',
});
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test                # Run tests once
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format          # Format code
npm run format:check    # Check formatting
```

## Project Structure

```
src/
├── index.ts                    # Main entry point
├── types/
│   └── index.ts               # TypeScript type definitions
├── services/
│   └── traktMonitorService.ts # Trakt.tv monitoring service
├── queue/
│   └── folderScanQueue.ts     # BullMQ queue configuration
└── workers/
    └── folderScanWorker.ts    # Folder scan worker
```

## Extending the System

### Adding New Queue Types

1. Create a new queue configuration in `src/queue/`
2. Define job data types in `src/types/`
3. Create a worker in `src/workers/`

### Implementing Trakt.tv Integration

The `TraktMonitorService` currently has a placeholder implementation. To integrate with Trakt.tv:

1. Add the Trakt.tv API client library
2. Implement webhook or polling mechanism in `TraktMonitorService.start()`
3. Call `processChange()` when changes are detected

### Implementing Folder Scanning

The `FolderScanWorker` currently has a placeholder implementation. To add scanning logic:

1. Implement file system scanning in `processFolderScan()`
2. Add matching logic for content titles
3. Integrate with media management tools

## License

UNLICENSED
