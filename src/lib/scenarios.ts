import { Scenario } from './types'

const generateCommitId = (index: number) => `commit-${index}`

export const scenarios: Scenario[] = [
  {
    id: 'free-explore-local',
    name: 'Yard Ops Drill',
    description: 'Master local Git moves—commits, branches, and merges on your home line',
    difficulty: 'beginner',
    icon: 'train',
    xpReward: 100,
    badge: {
      id: 'local-explorer',
      name: 'Yard Dispatcher',
      description: 'Completed first yard drill',
      icon: '🚂'
    },
    operations: [
      {
        id: 'op-1',
        type: 'commit',
        description: 'Initial commit - Service begins',
        gitCommand: 'git commit -m "Initial commit"',
        beforeState: {
          commits: [],
          branches: [{ name: 'main', commitId: '', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: generateCommitId(1), message: 'Initial commit', author: 'Dispatcher', timestamp: Date.now() - 5000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: generateCommitId(1), color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'op-2',
        type: 'commit',
        description: 'Add navigation system',
        gitCommand: 'git commit -m "Add navigation system"',
        beforeState: {
          commits: [
            { id: generateCommitId(1), message: 'Initial commit', author: 'Dispatcher', timestamp: Date.now() - 5000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: generateCommitId(1), color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: generateCommitId(1), message: 'Initial commit', author: 'Dispatcher', timestamp: Date.now() - 5000, branch: 'main', parents: [], type: 'local' },
            { id: generateCommitId(2), message: 'Add navigation system', author: 'Dispatcher', timestamp: Date.now() - 4000, branch: 'main', parents: [generateCommitId(1)], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: generateCommitId(2), color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'op-3',
        type: 'branch',
        description: 'Create siding for signal upgrade',
        gitCommand: 'git checkout -b feature/signals',
        beforeState: {
          commits: [
            { id: generateCommitId(1), message: 'Initial commit', author: 'Dispatcher', timestamp: Date.now() - 5000, branch: 'main', parents: [], type: 'local' },
            { id: generateCommitId(2), message: 'Add navigation system', author: 'Dispatcher', timestamp: Date.now() - 4000, branch: 'main', parents: [generateCommitId(1)], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: generateCommitId(2), color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: generateCommitId(1), message: 'Initial commit', author: 'Dispatcher', timestamp: Date.now() - 5000, branch: 'main', parents: [], type: 'local' },
            { id: generateCommitId(2), message: 'Add navigation system', author: 'Dispatcher', timestamp: Date.now() - 4000, branch: 'main', parents: [generateCommitId(1)], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: generateCommitId(2), color: '#65a3d5', isRemote: false },
            { name: 'feature/signals', commitId: generateCommitId(2), color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/signals'
        }
      },
      {
        id: 'op-4',
        type: 'commit',
        description: 'Install signal relays',
        gitCommand: 'git commit -m "Install signal relays"',
        beforeState: {
          commits: [
            { id: generateCommitId(1), message: 'Initial commit', author: 'Dispatcher', timestamp: Date.now() - 5000, branch: 'main', parents: [], type: 'local' },
            { id: generateCommitId(2), message: 'Add navigation system', author: 'Dispatcher', timestamp: Date.now() - 4000, branch: 'main', parents: [generateCommitId(1)], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: generateCommitId(2), color: '#65a3d5', isRemote: false },
            { name: 'feature/signals', commitId: generateCommitId(2), color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/signals'
        },
        afterState: {
          commits: [
            { id: generateCommitId(1), message: 'Initial commit', author: 'Dispatcher', timestamp: Date.now() - 5000, branch: 'main', parents: [], type: 'local' },
            { id: generateCommitId(2), message: 'Add navigation system', author: 'Dispatcher', timestamp: Date.now() - 4000, branch: 'main', parents: [generateCommitId(1)], type: 'local' },
            { id: generateCommitId(3), message: 'Install signal relays', author: 'Dispatcher', timestamp: Date.now() - 3000, branch: 'feature/signals', parents: [generateCommitId(2)], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: generateCommitId(2), color: '#65a3d5', isRemote: false },
            { name: 'feature/signals', commitId: generateCommitId(3), color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/signals'
        }
      },
      {
        id: 'op-5',
        type: 'merge',
        description: 'Merge signal upgrade into main',
        gitCommand: 'git checkout main && git merge feature/signals',
        beforeState: {
          commits: [
            { id: generateCommitId(1), message: 'Initial commit', author: 'Dispatcher', timestamp: Date.now() - 5000, branch: 'main', parents: [], type: 'local' },
            { id: generateCommitId(2), message: 'Add navigation system', author: 'Dispatcher', timestamp: Date.now() - 4000, branch: 'main', parents: [generateCommitId(1)], type: 'local' },
            { id: generateCommitId(3), message: 'Install signal relays', author: 'Dispatcher', timestamp: Date.now() - 3000, branch: 'feature/signals', parents: [generateCommitId(2)], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: generateCommitId(2), color: '#65a3d5', isRemote: false },
            { name: 'feature/signals', commitId: generateCommitId(3), color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/signals'
        },
        afterState: {
          commits: [
            { id: generateCommitId(1), message: 'Initial commit', author: 'Dispatcher', timestamp: Date.now() - 5000, branch: 'main', parents: [], type: 'local' },
            { id: generateCommitId(2), message: 'Add navigation system', author: 'Dispatcher', timestamp: Date.now() - 4000, branch: 'main', parents: [generateCommitId(1)], type: 'local' },
            { id: generateCommitId(3), message: 'Install signal relays', author: 'Dispatcher', timestamp: Date.now() - 3000, branch: 'feature/signals', parents: [generateCommitId(2)], type: 'local' },
            { id: generateCommitId(4), message: 'Merge feature/signals into main', author: 'Dispatcher', timestamp: Date.now() - 2000, branch: 'main', parents: [generateCommitId(2), generateCommitId(3)], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: generateCommitId(4), color: '#65a3d5', isRemote: false },
            { name: 'feature/signals', commitId: generateCommitId(3), color: '#8b5cf6', isRemote: false }
          ],
          head: 'main'
        }
      }
    ]
  },
  {
    id: 'free-explore-remote',
    name: 'Depot Collaboration',
    description: 'Sync with the central depot — push, pull, and coordinate with other crews',
    difficulty: 'beginner',
    icon: 'handshake',
    xpReward: 150,
    badge: {
      id: 'remote-collaborator',
      name: 'Network Operator',
      description: 'Mastered depot handoffs',
      icon: '🤝'
    },
    operations: [
      {
        id: 'remote-1',
        type: 'commit',
        description: 'Initial setup - Create local and remote repositories',
        gitCommand: 'git init && git commit -m "Initialize repository" && git push -u origin main',
        beforeState: {
          commits: [],
          branches: [
            { name: 'main', commitId: '', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: '', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rem1', message: 'Initialize repository', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'rem1', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'rem1', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'remote-2',
        type: 'commit',
        description: 'Local work - Add movement system',
        gitCommand: 'git commit -m "Add movement system"',
        beforeState: {
          commits: [
            { id: 'rem1', message: 'Initialize repository', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'rem1', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'rem1', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rem1', message: 'Initialize repository', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'both' },
            { id: 'rem2', message: 'Add movement system', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['rem1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rem2', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'rem1', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'remote-3',
        type: 'push',
        description: 'Push to origin - Share your work with the depot',
        gitCommand: 'git push origin main',
        beforeState: {
          commits: [
            { id: 'rem1', message: 'Initialize repository', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'both' },
            { id: 'rem2', message: 'Add movement system', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['rem1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rem2', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'rem1', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rem1', message: 'Initialize repository', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'both' },
            { id: 'rem2', message: 'Add movement system', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['rem1'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'rem2', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'rem2', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'remote-4',
        type: 'commit',
        description: 'Remote change - Partner crew adds brake test',
        gitCommand: '# Remote: git commit -m "Add brake test" && git push',
        beforeState: {
          commits: [
            { id: 'rem1', message: 'Initialize yard systems', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'both' },
            { id: 'rem2', message: 'Add locomotive controls', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['rem1'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'rem2', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'rem2', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rem1', message: 'Initialize yard systems', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'both' },
            { id: 'rem2', message: 'Add locomotive controls', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['rem1'], type: 'both' },
            { id: 'rem3', message: 'Add brake test', author: 'Remote Crew', timestamp: Date.now() - 9000, branch: 'origin/main', parents: ['rem2'], type: 'remote' }
          ],
          branches: [
            { name: 'main', commitId: 'rem2', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'rem3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'remote-5',
        type: 'pull',
        description: 'Pull from origin - Download crew changes',
        gitCommand: 'git pull origin main',
        beforeState: {
          commits: [
            { id: 'rem1', message: 'Initialize yard systems', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'both' },
            { id: 'rem2', message: 'Add locomotive controls', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['rem1'], type: 'both' },
            { id: 'rem3', message: 'Add brake test', author: 'Remote Crew', timestamp: Date.now() - 9000, branch: 'origin/main', parents: ['rem2'], type: 'remote' }
          ],
          branches: [
            { name: 'main', commitId: 'rem2', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'rem3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rem1', message: 'Initialize yard systems', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'both' },
            { id: 'rem2', message: 'Add locomotive controls', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['rem1'], type: 'both' },
            { id: 'rem3', message: 'Add brake test', author: 'Remote Crew', timestamp: Date.now() - 9000, branch: 'main', parents: ['rem2'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'rem3', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'rem3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'remote-6',
        type: 'commit',
        description: 'Add cargo manager locally',
        gitCommand: 'git commit -m "Add cargo manager"',
        beforeState: {
          commits: [
            { id: 'rem1', message: 'Initialize yard systems', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'both' },
            { id: 'rem2', message: 'Add locomotive controls', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['rem1'], type: 'both' },
            { id: 'rem3', message: 'Add brake diagnostics', author: 'Crew Member', timestamp: Date.now() - 9000, branch: 'main', parents: ['rem2'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'rem3', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'rem3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rem1', message: 'Initialize yard systems', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'both' },
            { id: 'rem2', message: 'Add locomotive controls', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['rem1'], type: 'both' },
            { id: 'rem3', message: 'Add brake diagnostics', author: 'Crew Member', timestamp: Date.now() - 9000, branch: 'main', parents: ['rem2'], type: 'both' },
            { id: 'rem4', message: 'Add cargo manager', author: 'You', timestamp: Date.now() - 6000, branch: 'main', parents: ['rem3'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rem4', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'rem3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'remote-7',
        type: 'push',
        description: 'Final push - Complete dispatcher sync',
        gitCommand: 'git push origin main',
        beforeState: {
          commits: [
            { id: 'rem1', message: 'Initialize yard systems', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'both' },
            { id: 'rem2', message: 'Add locomotive controls', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['rem1'], type: 'both' },
            { id: 'rem3', message: 'Add brake diagnostics', author: 'Crew Member', timestamp: Date.now() - 9000, branch: 'main', parents: ['rem2'], type: 'both' },
            { id: 'rem4', message: 'Add cargo manager', author: 'You', timestamp: Date.now() - 6000, branch: 'main', parents: ['rem3'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rem4', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'rem3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rem1', message: 'Initialize yard systems', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'both' },
            { id: 'rem2', message: 'Add locomotive controls', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['rem1'], type: 'both' },
            { id: 'rem3', message: 'Add brake diagnostics', author: 'Crew Member', timestamp: Date.now() - 9000, branch: 'main', parents: ['rem2'], type: 'both' },
            { id: 'rem4', message: 'Add cargo manager', author: 'You', timestamp: Date.now() - 6000, branch: 'main', parents: ['rem3'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'rem4', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'rem4', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      }
    ]
  },
  {
    id: 'upstream-changes',
    name: 'Upstream Sync',
    description: 'Handle incoming changes from other crews',
    difficulty: 'intermediate',
    icon: 'download',
    xpReward: 200,
    badge: {
      id: 'sync-master',
      name: 'Sync Master',
      description: 'Successfully synced upstream changes',
      icon: '🔄'
    },
    operations: [
      {
        id: 'upstream-1',
        type: 'commit',
        description: 'Your local work - Add equipment system',
        gitCommand: 'git commit -m "Add equipment system"',
        beforeState: {
          commits: [
            { id: 'c1', message: 'Initial route setup', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: [], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'c1', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'c1', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'c1', message: 'Initial route setup', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: [], type: 'both' },
            { id: 'c2', message: 'Add equipment system', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['c1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'c2', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'c1', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'upstream-2',
        type: 'pull',
        description: 'Fetch changes - Remote crew added brake checks',
        gitCommand: 'git fetch origin',
        beforeState: {
          commits: [
            { id: 'c1', message: 'Initial route setup', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: [], type: 'both' },
            { id: 'c2', message: 'Add equipment system', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['c1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'c2', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'c1', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'c1', message: 'Initial route setup', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: [], type: 'both' },
            { id: 'c2', message: 'Add equipment system', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['c1'], type: 'local' },
            { id: 'c3', message: 'Add brake checks', author: 'Remote Crew', timestamp: Date.now() - 7000, branch: 'origin/main', parents: ['c1'], type: 'remote' }
          ],
          branches: [
            { name: 'main', commitId: 'c2', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'c3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'upstream-3',
        type: 'merge',
        description: 'Merge upstream changes - Combine both updates',
        gitCommand: 'git merge origin/main',
        beforeState: {
          commits: [
            { id: 'c1', message: 'Initial route setup', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: [], type: 'both' },
            { id: 'c2', message: 'Add equipment system', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['c1'], type: 'local' },
            { id: 'c3', message: 'Add brake checks', author: 'Remote Crew', timestamp: Date.now() - 7000, branch: 'origin/main', parents: ['c1'], type: 'remote' }
          ],
          branches: [
            { name: 'main', commitId: 'c2', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'c3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'c1', message: 'Initial route setup', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: [], type: 'both' },
            { id: 'c2', message: 'Add equipment system', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['c1'], type: 'local' },
            { id: 'c3', message: 'Add brake checks', author: 'Remote Crew', timestamp: Date.now() - 7000, branch: 'main', parents: ['c1'], type: 'remote' },
            { id: 'c4', message: 'Merge origin/main', author: 'You', timestamp: Date.now() - 5000, branch: 'main', parents: ['c2', 'c3'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'c4', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'c3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'upstream-4',
        type: 'push',
        description: 'Push merged changes - Route sync complete',
        gitCommand: 'git push origin main',
        beforeState: {
          commits: [
            { id: 'c1', message: 'Initial route setup', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: [], type: 'both' },
            { id: 'c2', message: 'Add equipment system', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['c1'], type: 'local' },
            { id: 'c3', message: 'Add brake checks', author: 'Remote Crew', timestamp: Date.now() - 7000, branch: 'main', parents: ['c1'], type: 'remote' },
            { id: 'c4', message: 'Merge origin/main', author: 'You', timestamp: Date.now() - 5000, branch: 'main', parents: ['c2', 'c3'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'c4', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'c3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'c1', message: 'Initial route setup', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: [], type: 'both' },
            { id: 'c2', message: 'Add equipment system', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['c1'], type: 'both' },
            { id: 'c3', message: 'Add brake checks', author: 'Remote Crew', timestamp: Date.now() - 7000, branch: 'main', parents: ['c1'], type: 'both' },
            { id: 'c4', message: 'Merge origin/main', author: 'You', timestamp: Date.now() - 5000, branch: 'main', parents: ['c2', 'c3'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'c4', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'c4', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      }
    ]
  },
  {
    id: 'force-push',
    name: 'Emergency Override',
    description: 'Force push - rewrite history when mission parameters change',
    difficulty: 'advanced',
    icon: 'warning',
    xpReward: 250,
    badge: {
      id: 'history-rewriter',
      name: 'History Rewriter',
      description: 'Mastered force push operations',
      icon: '⚠️'
    },
    operations: [
      {
        id: 'force-1',
        type: 'commit',
        description: 'Initial commits pushed to remote',
        gitCommand: 'git commit -m "Add weapon system" && git push',
        beforeState: {
          commits: [],
          branches: [
            { name: 'main', commitId: '', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: '', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'f1', message: 'Add weapon system v1', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: [], type: 'both' },
            { id: 'f2', message: 'Add shield config v1', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: ['f1'], type: 'both' },
            { id: 'f3', message: 'Add sensitive data (OOPS!)', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['f2'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'f3', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'f3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'force-2',
        type: 'revert',
        description: 'Reset to before sensitive data - local cleanup',
        gitCommand: 'git commit -m "Add sensitive data (OOPS!)" && git push',
        beforeState: {
          commits: [
            { id: 'f1', message: 'Add weapon system v1', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: [], type: 'both' },
            { id: 'f2', message: 'Add shield config v1', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: ['f1'], type: 'both' },
            { id: 'f3', message: 'Add sensitive data (OOPS!)', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['f2'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'f3', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'f3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'f1', message: 'Add weapon system v1', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: [], type: 'both' },
            { id: 'f2', message: 'Add shield config v1', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: ['f1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'f2', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'f3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'force-3',
        type: 'commit',
        description: 'Add correct commit without sensitive data',
        gitCommand: 'git reset --hard HEAD~1',
        beforeState: {
          commits: [
            { id: 'f1', message: 'Add weapon system v1', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: [], type: 'both' },
            { id: 'f2', message: 'Add shield config v1', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: ['f1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'f2', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'f3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'f1', message: 'Add weapon system v1', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: [], type: 'both' },
            { id: 'f2', message: 'Add shield config v1', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: ['f1'], type: 'local' },
            { id: 'f4', message: 'Add safe config only', author: 'You', timestamp: Date.now() - 6000, branch: 'main', parents: ['f2'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'f4', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'f3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'force-4',
        type: 'force-push',
        description: '⚠️ Force push - Override remote history!',
        gitCommand: 'git push --force origin main',
        beforeState: {
          commits: [
            { id: 'f1', message: 'Add weapon system v1', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: [], type: 'both' },
            { id: 'f2', message: 'Add shield config v1', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: ['f1'], type: 'local' },
            { id: 'f4', message: 'Add safe config only', author: 'You', timestamp: Date.now() - 6000, branch: 'main', parents: ['f2'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'f4', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'f3', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'f1', message: 'Add weapon system v1', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: [], type: 'both' },
            { id: 'f2', message: 'Add shield config v1', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: ['f1'], type: 'both' },
            { id: 'f4', message: 'Add safe config only', author: 'You', timestamp: Date.now() - 6000, branch: 'main', parents: ['f2'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'f4', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'f4', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      }
    ]
  },
  {
    id: 'revert',
    name: 'Time Reversal',
    description: 'Undo mistakes safely with git revert',
    difficulty: 'intermediate',
    icon: 'undo',
    xpReward: 175,
    badge: {
      id: 'time-traveler',
      name: 'Time Traveler',
      description: 'Successfully reverted commits',
      icon: '⏮️'
    },
    operations: [
      {
        id: 'revert-1',
        type: 'commit',
        description: 'Build route timeline - 3 successful commits',
        gitCommand: 'git commit -m "Add navigation module"',
        beforeState: {
          commits: [],
          branches: [{ name: 'main', commitId: '', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'r1', message: 'Add navigation module', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'local' },
            { id: 'r2', message: 'Add communication array', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['r1'], type: 'local' },
            { id: 'r3', message: 'Add radar system', author: 'You', timestamp: Date.now() - 9000, branch: 'main', parents: ['r2'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'r3', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'revert-2',
        type: 'commit',
        description: 'Oops! Added faulty control code',
        gitCommand: 'git commit -m "Add autopilot (BUGGY!)"',
        beforeState: {
          commits: [
            { id: 'r1', message: 'Add navigation module', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'local' },
            { id: 'r2', message: 'Add communication array', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['r1'], type: 'local' },
            { id: 'r3', message: 'Add radar system', author: 'You', timestamp: Date.now() - 9000, branch: 'main', parents: ['r2'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'r3', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'r1', message: 'Add navigation module', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'local' },
            { id: 'r2', message: 'Add communication array', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['r1'], type: 'local' },
            { id: 'r3', message: 'Add radar system', author: 'You', timestamp: Date.now() - 9000, branch: 'main', parents: ['r2'], type: 'local' },
            { id: 'r4', message: 'Add autopilot (BUGGY!)', author: 'You', timestamp: Date.now() - 6000, branch: 'main', parents: ['r3'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'r4', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'revert-3',
        type: 'commit',
        description: 'Continued working - added more features',
        gitCommand: 'git commit -m "Add emergency protocols"',
        beforeState: {
          commits: [
            { id: 'r1', message: 'Add navigation module', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'local' },
            { id: 'r2', message: 'Add communication array', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['r1'], type: 'local' },
            { id: 'r3', message: 'Add radar system', author: 'You', timestamp: Date.now() - 9000, branch: 'main', parents: ['r2'], type: 'local' },
            { id: 'r4', message: 'Add autopilot (BUGGY!)', author: 'You', timestamp: Date.now() - 6000, branch: 'main', parents: ['r3'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'r4', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'r1', message: 'Add navigation module', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'local' },
            { id: 'r2', message: 'Add communication array', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['r1'], type: 'local' },
            { id: 'r3', message: 'Add radar system', author: 'You', timestamp: Date.now() - 9000, branch: 'main', parents: ['r2'], type: 'local' },
            { id: 'r4', message: 'Add autopilot (BUGGY!)', author: 'You', timestamp: Date.now() - 6000, branch: 'main', parents: ['r3'], type: 'local' },
            { id: 'r5', message: 'Add emergency protocols', author: 'You', timestamp: Date.now() - 4000, branch: 'main', parents: ['r4'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'r5', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'revert-4',
        type: 'revert',
        description: 'Revert the faulty auto-heal logic - creates inverse commit!',
        gitCommand: 'git revert HEAD~1',
        beforeState: {
          commits: [
            { id: 'r1', message: 'Add navigation module', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'local' },
            { id: 'r2', message: 'Add communication array', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['r1'], type: 'local' },
            { id: 'r3', message: 'Add radar system', author: 'You', timestamp: Date.now() - 9000, branch: 'main', parents: ['r2'], type: 'local' },
            { id: 'r4', message: 'Add autopilot (BUGGY!)', author: 'You', timestamp: Date.now() - 6000, branch: 'main', parents: ['r3'], type: 'local' },
            { id: 'r5', message: 'Add emergency protocols', author: 'You', timestamp: Date.now() - 4000, branch: 'main', parents: ['r4'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'r5', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'r1', message: 'Add map navigation', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'local' },
            { id: 'r2', message: 'Add crew comms system', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['r1'], type: 'local' },
            { id: 'r3', message: 'Add route tracker', author: 'You', timestamp: Date.now() - 9000, branch: 'main', parents: ['r2'], type: 'local' },
            { id: 'r4', message: 'Add auto-heal logic (BUGGY!)', author: 'You', timestamp: Date.now() - 6000, branch: 'main', parents: ['r3'], type: 'local' },
            { id: 'r5', message: 'Add emergency failover', author: 'You', timestamp: Date.now() - 4000, branch: 'main', parents: ['r4'], type: 'local' },
            { id: 'r6', message: 'Revert "Add auto-heal logic (BUGGY!)"', author: 'You', timestamp: Date.now() - 2000, branch: 'main', parents: ['r5'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'r6', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      }
    ]
  },
  {
    id: 'cherry-pick',
    name: 'Precision Extract',
    description: 'Cherry-pick specific commits across branches',
    difficulty: 'advanced',
    icon: 'target',
    xpReward: 225,
    badge: {
      id: 'precision-pilot',
      name: 'Precision Pilot',
      description: 'Mastered cherry-pick operations',
      icon: '🎯'
    },
    operations: [
      {
        id: 'cherry-1',
        type: 'commit',
        description: 'Main line - stable service path',
        gitCommand: 'git commit -m "Initialize mission base"',
        beforeState: {
          commits: [],
          branches: [{ name: 'main', commitId: '', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'cp1', message: 'Initialize mission base', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'cp2', message: 'Add core systems', author: 'You', timestamp: Date.now() - 18000, branch: 'main', parents: ['cp1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'cp2', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'cherry-2',
        type: 'branch',
        description: 'Create experimental branch for testing',
        gitCommand: 'git checkout -b experimental',
        beforeState: {
          commits: [
            { id: 'cp1', message: 'Initialize mission base', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'cp2', message: 'Add core systems', author: 'You', timestamp: Date.now() - 18000, branch: 'main', parents: ['cp1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'cp2', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'cp1', message: 'Initialize mission base', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'cp2', message: 'Add core systems', author: 'You', timestamp: Date.now() - 18000, branch: 'main', parents: ['cp1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cp2', color: '#65a3d5', isRemote: false },
            { name: 'experimental', commitId: 'cp2', color: '#8b5cf6', isRemote: false }
          ],
          head: 'experimental'
        }
      },
      {
        id: 'cherry-3',
        type: 'commit',
        description: 'Experimental work - mix of good and bad commits',
        gitCommand: 'git commit -m "Experiment: new signal layout"',
        beforeState: {
          commits: [
            { id: 'cp1', message: 'Initialize mission base', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'cp2', message: 'Add core systems', author: 'You', timestamp: Date.now() - 18000, branch: 'main', parents: ['cp1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cp2', color: '#65a3d5', isRemote: false },
            { name: 'experimental', commitId: 'cp2', color: '#8b5cf6', isRemote: false }
          ],
          head: 'experimental'
        },
        afterState: {
          commits: [
            { id: 'cp1', message: 'Initialize mission base', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'cp2', message: 'Add core systems', author: 'You', timestamp: Date.now() - 18000, branch: 'main', parents: ['cp1'], type: 'local' },
            { id: 'cp3', message: 'Experiment: new panel UI (bad)', author: 'You', timestamp: Date.now() - 15000, branch: 'experimental', parents: ['cp2'], type: 'local' },
            { id: 'cp4', message: 'Fix critical security bug ⭐', author: 'You', timestamp: Date.now() - 12000, branch: 'experimental', parents: ['cp3'], type: 'local' },
            { id: 'cp5', message: 'Random debugging (messy)', author: 'You', timestamp: Date.now() - 9000, branch: 'experimental', parents: ['cp4'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cp2', color: '#65a3d5', isRemote: false },
            { name: 'experimental', commitId: 'cp5', color: '#8b5cf6', isRemote: false }
          ],
          head: 'experimental'
        }
      },
      {
        id: 'cherry-4',
        type: 'branch',
        description: 'Switch back to main branch',
        gitCommand: 'git checkout main',
        beforeState: {
          commits: [
            { id: 'cp1', message: 'Initialize mission base', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'cp2', message: 'Add core systems', author: 'You', timestamp: Date.now() - 18000, branch: 'main', parents: ['cp1'], type: 'local' },
            { id: 'cp3', message: 'Experiment: new UI (bad)', author: 'You', timestamp: Date.now() - 15000, branch: 'experimental', parents: ['cp2'], type: 'local' },
            { id: 'cp4', message: 'Fix critical security bug ⭐', author: 'You', timestamp: Date.now() - 12000, branch: 'experimental', parents: ['cp3'], type: 'local' },
            { id: 'cp5', message: 'Random debugging (messy)', author: 'You', timestamp: Date.now() - 9000, branch: 'experimental', parents: ['cp4'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cp2', color: '#65a3d5', isRemote: false },
            { name: 'experimental', commitId: 'cp5', color: '#8b5cf6', isRemote: false }
          ],
          head: 'experimental'
        },
        afterState: {
          commits: [
            { id: 'cp1', message: 'Initialize mission base', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'cp2', message: 'Add core systems', author: 'You', timestamp: Date.now() - 18000, branch: 'main', parents: ['cp1'], type: 'local' },
            { id: 'cp3', message: 'Experiment: new UI (bad)', author: 'You', timestamp: Date.now() - 15000, branch: 'experimental', parents: ['cp2'], type: 'local' },
            { id: 'cp4', message: 'Fix critical security bug ⭐', author: 'You', timestamp: Date.now() - 12000, branch: 'experimental', parents: ['cp3'], type: 'local' },
            { id: 'cp5', message: 'Random debugging (messy)', author: 'You', timestamp: Date.now() - 9000, branch: 'experimental', parents: ['cp4'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cp2', color: '#65a3d5', isRemote: false },
            { name: 'experimental', commitId: 'cp5', color: '#8b5cf6', isRemote: false }
          ],
          head: 'main'
        }
      },
      {
        id: 'cherry-5',
        type: 'cherry-pick',
        description: '🎯 Cherry-pick ONLY the defense fix to main!',
        gitCommand: 'git cherry-pick <commit-hash>',
        beforeState: {
          commits: [
            { id: 'cp1', message: 'Initialize mission base', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'cp2', message: 'Add core systems', author: 'You', timestamp: Date.now() - 18000, branch: 'main', parents: ['cp1'], type: 'local' },
            { id: 'cp3', message: 'Experiment: new UI (bad)', author: 'You', timestamp: Date.now() - 15000, branch: 'experimental', parents: ['cp2'], type: 'local' },
            { id: 'cp4', message: 'Fix critical security bug ⭐', author: 'You', timestamp: Date.now() - 12000, branch: 'experimental', parents: ['cp3'], type: 'local' },
            { id: 'cp5', message: 'Random debugging (messy)', author: 'You', timestamp: Date.now() - 9000, branch: 'experimental', parents: ['cp4'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cp2', color: '#65a3d5', isRemote: false },
            { name: 'experimental', commitId: 'cp5', color: '#8b5cf6', isRemote: false }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'cp1', message: 'Initialize hero camp', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'cp2', message: 'Add core abilities', author: 'You', timestamp: Date.now() - 18000, branch: 'main', parents: ['cp1'], type: 'local' },
            { id: 'cp3', message: 'Experiment: new skill tree (bad)', author: 'You', timestamp: Date.now() - 15000, branch: 'experimental', parents: ['cp2'], type: 'local' },
            { id: 'cp4', message: 'Fix critical defense bug ⭐', author: 'You', timestamp: Date.now() - 12000, branch: 'experimental', parents: ['cp3'], type: 'local' },
            { id: 'cp5', message: 'Random testing (messy)', author: 'You', timestamp: Date.now() - 9000, branch: 'experimental', parents: ['cp4'], type: 'local' },
            { id: 'cp6', message: 'Fix critical defense bug ⭐', author: 'You', timestamp: Date.now() - 5000, branch: 'main', parents: ['cp2'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cp6', color: '#65a3d5', isRemote: false },
            { name: 'experimental', commitId: 'cp5', color: '#8b5cf6', isRemote: false }
          ],
          head: 'main'
        }
      }
    ]
  },
  {
    id: 'rebase-simple',
    name: 'Timeline Rewrite',
    description: 'Rebase your feature branch to create a clean, linear history',
    difficulty: 'intermediate',
    icon: 'rebase',
    xpReward: 200,
    badge: {
      id: 'timeline-weaver',
      name: 'Timeline Weaver',
      description: 'Mastered the art of rebasing',
      icon: '🔀'
    },
    operations: [
      {
        id: 'rebase-1',
        type: 'commit',
        description: 'Main line - initial baseline',
        gitCommand: 'git commit -m "Lay base track configuration"',
        beforeState: {
          commits: [],
          branches: [{ name: 'main', commitId: '', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rb1', message: 'Lay base rail infrastructure', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rb1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'rebase-2',
        type: 'branch',
        description: 'Create feature branch for new signal package',
        gitCommand: 'git checkout -b feature/ui-update',
        beforeState: {
          commits: [
            { id: 'rb1', message: 'Lay base rail infrastructure', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rb1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rb1', message: 'Setup mission infrastructure', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rb1', color: '#65a3d5', isRemote: false },
            { name: 'feature/engine', commitId: 'rb1', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/engine'
        }
      },
      {
        id: 'rebase-3',
        type: 'commit',
        description: 'Work on signal upgrade feature',
        gitCommand: 'git commit -m "Update signal palette"',
        beforeState: {
          commits: [
            { id: 'rb1', message: 'Lay base rail infrastructure', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rb1', color: '#65a3d5', isRemote: false },
            { name: 'feature/engine', commitId: 'rb1', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/engine'
        },
        afterState: {
          commits: [
            { id: 'rb1', message: 'Lay base rail infrastructure', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'rb2', message: 'Add signal routing prototype', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/engine', parents: ['rb1'], type: 'local' },
            { id: 'rb3', message: 'Optimize dispatch latency', author: 'You', timestamp: Date.now() - 18000, branch: 'feature/engine', parents: ['rb2'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rb1', color: '#65a3d5', isRemote: false },
            { name: 'feature/engine', commitId: 'rb3', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/engine'
        }
      },
      {
        id: 'rebase-4',
        type: 'commit',
        description: 'Meanwhile, main branch advances with new track updates',
        gitCommand: 'git checkout main && git commit -m "Fix signal fault"',
        beforeState: {
          commits: [
            { id: 'rb1', message: 'Lay base rail infrastructure', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'rb2', message: 'Add signal routing prototype', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/engine', parents: ['rb1'], type: 'local' },
            { id: 'rb3', message: 'Optimize dispatch latency', author: 'You', timestamp: Date.now() - 18000, branch: 'feature/engine', parents: ['rb2'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rb1', color: '#65a3d5', isRemote: false },
            { name: 'feature/engine', commitId: 'rb3', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/engine'
        },
        afterState: {
          commits: [
            { id: 'rb1', message: 'Lay base rail infrastructure', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'rb2', message: 'Add signal routing prototype', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/engine', parents: ['rb1'], type: 'local' },
            { id: 'rb3', message: 'Optimize dispatch latency', author: 'You', timestamp: Date.now() - 18000, branch: 'feature/engine', parents: ['rb2'], type: 'local' },
            { id: 'rb4', message: 'Upgrade safety barriers', author: 'Teammate', timestamp: Date.now() - 15000, branch: 'main', parents: ['rb1'], type: 'local' },
            { id: 'rb5', message: 'Add crew lounge', author: 'Teammate', timestamp: Date.now() - 12000, branch: 'main', parents: ['rb4'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rb5', color: '#65a3d5', isRemote: false },
            { name: 'feature/engine', commitId: 'rb3', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/engine'
        }
      },
      {
        id: 'rebase-5',
        type: 'commit',
        description: '🔀 Rebase feature/engine onto latest main for a clean line',
        gitCommand: 'git checkout feature/ui-update && git rebase main',
        beforeState: {
          commits: [
            { id: 'rb1', message: 'Lay base rail infrastructure', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'rb2', message: 'Add signal routing prototype', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/engine', parents: ['rb1'], type: 'local' },
            { id: 'rb3', message: 'Optimize dispatch latency', author: 'You', timestamp: Date.now() - 18000, branch: 'feature/engine', parents: ['rb2'], type: 'local' },
            { id: 'rb4', message: 'Upgrade safety barriers', author: 'Teammate', timestamp: Date.now() - 15000, branch: 'main', parents: ['rb1'], type: 'local' },
            { id: 'rb5', message: 'Add crew lounge', author: 'Teammate', timestamp: Date.now() - 12000, branch: 'main', parents: ['rb4'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rb5', color: '#65a3d5', isRemote: false },
            { name: 'feature/engine', commitId: 'rb3', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/engine'
        },
        afterState: {
          commits: [
            { id: 'rb1', message: 'Lay base rail infrastructure', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'rb4', message: 'Upgrade safety barriers', author: 'Teammate', timestamp: Date.now() - 15000, branch: 'main', parents: ['rb1'], type: 'local' },
            { id: 'rb5', message: 'Add crew lounge', author: 'Teammate', timestamp: Date.now() - 12000, branch: 'main', parents: ['rb4'], type: 'local' },
            { id: 'rb6', message: 'Add signal reroute controls', author: 'You', timestamp: Date.now() - 10000, branch: 'feature/engine', parents: ['rb5'], type: 'local' },
            { id: 'rb7', message: 'Optimize switch timing', author: 'You', timestamp: Date.now() - 8000, branch: 'feature/engine', parents: ['rb6'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rb5', color: '#65a3d5', isRemote: false },
            { name: 'feature/engine', commitId: 'rb7', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/engine'
        }
      }
    ]
  },
  {
    id: 'stash',
    name: 'Yard Storage Track',
    description: 'Use git stash to temporarily save work without committing',
    difficulty: 'intermediate',
    icon: 'storage',
    xpReward: 150,
    badge: {
      id: 'item-stasher',
      name: 'Item Master',
      description: 'Master of temporary storage',
      icon: '📦'
    },
    operations: [
      {
        id: 'stash-1',
        type: 'commit',
        description: 'Working on main line - stable state',
        gitCommand: 'git commit -m "Implement yard authentication"',
        beforeState: {
          commits: [],
          branches: [{ name: 'main', commitId: '', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'st1', message: 'Core systems active', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'st1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'stash-2',
        type: 'commit',
        description: 'Working on incomplete feature (not ready to commit)',
        gitCommand: '# Working on inventory system...',
        beforeState: {
          commits: [
            { id: 'st1', message: 'Core systems active', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'st1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'st1', message: 'Core systems active', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'stash-wip', message: '🚧 WIP: New signal calibration (uncommitted)', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['st1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'stash-wip', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'stash-3',
        type: 'commit',
        description: '📦 Git stash - shunt WIP onto a siding',
        gitCommand: 'git stash',
        beforeState: {
          commits: [
            { id: 'st1', message: 'Core systems active', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'stash-wip', message: '🚧 WIP: New signal calibration (uncommitted)', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['st1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'stash-wip', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'st1', message: 'Core systems active', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'stash-stored', message: '📦 Stashed: Signal calibration WIP', author: 'stash', timestamp: Date.now() - 13000, branch: 'stash', parents: ['st1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'st1', color: '#65a3d5', isRemote: false },
            { name: 'stash', commitId: 'stash-stored', color: '#f59e0b', isRemote: false }
          ],
          head: 'main'
        }
      },
      {
        id: 'stash-4',
        type: 'commit',
        description: 'Work on urgent hotfix with a clear track',
        gitCommand: 'git checkout -b hotfix/critical-bug',
        beforeState: {
          commits: [
            { id: 'st1', message: 'Core systems active', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'stash-stored', message: '📦 Stashed: Signal calibration WIP', author: 'stash', timestamp: Date.now() - 13000, branch: 'stash', parents: ['st1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'st1', color: '#65a3d5', isRemote: false },
            { name: 'stash', commitId: 'stash-stored', color: '#f59e0b', isRemote: false }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'st1', message: 'Core systems active', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'stash-stored', message: '📦 Stashed: Signal calibration WIP', author: 'stash', timestamp: Date.now() - 13000, branch: 'stash', parents: ['st1'], type: 'local' },
            { id: 'st2', message: '🚨 HOTFIX: Emergency brake repair', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: ['st1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'st2', color: '#65a3d5', isRemote: false },
            { name: 'stash', commitId: 'stash-stored', color: '#f59e0b', isRemote: false }
          ],
          head: 'main'
        }
      },
      {
        id: 'stash-5',
        type: 'commit',
        description: '📦 Git stash pop - restore your WIP work!',
        gitCommand: 'git commit -m "Fix critical security issue"',
        beforeState: {
          commits: [
            { id: 'st1', message: 'Core systems active', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'stash-stored', message: '📦 Stashed: Signal calibration WIP', author: 'stash', timestamp: Date.now() - 13000, branch: 'stash', parents: ['st1'], type: 'local' },
            { id: 'st2', message: '🚨 HOTFIX: Emergency brake repair', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: ['st1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'st2', color: '#65a3d5', isRemote: false },
            { name: 'stash', commitId: 'stash-stored', color: '#f59e0b', isRemote: false }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'st1', message: 'Core systems active', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'st2', message: '🚨 HOTFIX: Emergency brake repair', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: ['st1'], type: 'local' },
            { id: 'st3', message: '🚧 WIP: Signal calibration (restored)', author: 'You', timestamp: Date.now() - 5000, branch: 'main', parents: ['st2'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'st3', color: '#65a3d5', isRemote: false }
          ],
          head: 'main'
        }
      }
    ]
  },
  {
    id: 'pull-request-workflow',
    name: 'Rail Request Protocol',
    description: 'Complete pull request workflow - feature branch to main integration',
    difficulty: 'intermediate',
    icon: 'pr',
    xpReward: 180,
    badge: {
      id: 'rail-diplomat',
      name: 'Rail Diplomat',
      description: 'Mastered the pull request workflow',
      icon: '🤝'
    },
    operations: [
      {
        id: 'pr-1',
        type: 'commit',
        description: 'Synced repositories - main branch baseline',
        gitCommand: 'git commit -m "Initial setup"',
        beforeState: {
          commits: [],
          branches: [
            { name: 'main', commitId: '', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: '', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'pr1', message: 'Production baseline v1.0', author: 'Team', timestamp: Date.now() - 30000, branch: 'main', parents: [], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'pr1', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'pr1', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'pr-2',
        type: 'branch',
        description: 'Create feature branch for new dispatch module',
        gitCommand: 'git checkout -b feature/route-planner',
        beforeState: {
          commits: [
            { id: 'pr1', message: 'Production baseline v1.0', author: 'Team', timestamp: Date.now() - 30000, branch: 'main', parents: [], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'pr1', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'pr1', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'pr1', message: 'Production baseline v1.0', author: 'Team', timestamp: Date.now() - 30000, branch: 'main', parents: [], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'pr1', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'pr1', color: '#65a3d5', isRemote: true },
            { name: 'feature/route-planner', commitId: 'pr1', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/route-planner'
        }
      },
      {
        id: 'pr-3',
        type: 'commit',
        description: 'Build feature - multiple commits on feature branch',
        gitCommand: 'git commit -m "Add dashboard components"',
        beforeState: {
          commits: [
            { id: 'pr1', message: 'Production baseline v1.0', author: 'Team', timestamp: Date.now() - 30000, branch: 'main', parents: [], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'pr1', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'pr1', color: '#65a3d5', isRemote: true },
            { name: 'feature/route-planner', commitId: 'pr1', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/route-planner'
        },
        afterState: {
          commits: [
            { id: 'pr1', message: 'Production baseline v1.0', author: 'Team', timestamp: Date.now() - 30000, branch: 'main', parents: [], type: 'both' },
            { id: 'pr2', message: 'Add route planner UI', author: 'You', timestamp: Date.now() - 25000, branch: 'feature/route-planner', parents: ['pr1'], type: 'local' },
            { id: 'pr3', message: 'Implement route calculation', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/route-planner', parents: ['pr2'], type: 'local' },
            { id: 'pr4', message: 'Add tests for planner', author: 'You', timestamp: Date.now() - 15000, branch: 'feature/route-planner', parents: ['pr3'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'pr1', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'pr1', color: '#65a3d5', isRemote: true },
            { name: 'feature/route-planner', commitId: 'pr4', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/route-planner'
        }
      },
      {
        id: 'pr-4',
        type: 'push',
        description: 'Push feature branch to origin for PR',
        gitCommand: 'git push -u origin feature/route-planner',
        beforeState: {
          commits: [
            { id: 'pr1', message: 'Production baseline v1.0', author: 'Team', timestamp: Date.now() - 30000, branch: 'main', parents: [], type: 'both' },
            { id: 'pr2', message: 'Add route planner UI', author: 'You', timestamp: Date.now() - 25000, branch: 'feature/route-planner', parents: ['pr1'], type: 'local' },
            { id: 'pr3', message: 'Implement route calculation', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/route-planner', parents: ['pr2'], type: 'local' },
            { id: 'pr4', message: 'Add tests for planner', author: 'You', timestamp: Date.now() - 15000, branch: 'feature/route-planner', parents: ['pr3'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'pr1', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'pr1', color: '#65a3d5', isRemote: true },
            { name: 'feature/route-planner', commitId: 'pr4', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/route-planner'
        },
        afterState: {
          commits: [
            { id: 'pr1', message: 'Production baseline v1.0', author: 'Team', timestamp: Date.now() - 30000, branch: 'main', parents: [], type: 'both' },
            { id: 'pr2', message: 'Add route planner UI', author: 'You', timestamp: Date.now() - 25000, branch: 'feature/route-planner', parents: ['pr1'], type: 'both' },
            { id: 'pr3', message: 'Implement route calculation', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/route-planner', parents: ['pr2'], type: 'both' },
            { id: 'pr4', message: 'Add tests for planner', author: 'You', timestamp: Date.now() - 15000, branch: 'feature/route-planner', parents: ['pr3'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'pr1', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'pr1', color: '#65a3d5', isRemote: true },
            { name: 'feature/route-planner', commitId: 'pr4', color: '#8b5cf6', isRemote: false },
            { name: 'origin/feature/route-planner', commitId: 'pr4', color: '#8b5cf6', isRemote: true }
          ],
          head: 'feature/route-planner'
        }
      },
      {
        id: 'pr-5',
        type: 'commit',
        description: '🤝 PR approved! Merge feature into main',
        gitCommand: '# Create Pull Request on GitHub',
        beforeState: {
          commits: [
            { id: 'pr1', message: 'Production baseline v1.0', author: 'Team', timestamp: Date.now() - 30000, branch: 'main', parents: [], type: 'both' },
            { id: 'pr2', message: 'Add route planner UI', author: 'You', timestamp: Date.now() - 25000, branch: 'feature/route-planner', parents: ['pr1'], type: 'both' },
            { id: 'pr3', message: 'Implement route calculation', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/route-planner', parents: ['pr2'], type: 'both' },
            { id: 'pr4', message: 'Add tests for planner', author: 'You', timestamp: Date.now() - 15000, branch: 'feature/route-planner', parents: ['pr3'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'pr1', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'pr1', color: '#65a3d5', isRemote: true },
            { name: 'feature/route-planner', commitId: 'pr4', color: '#8b5cf6', isRemote: false },
            { name: 'origin/feature/route-planner', commitId: 'pr4', color: '#8b5cf6', isRemote: true }
          ],
          head: 'feature/route-planner'
        },
        afterState: {
          commits: [
            { id: 'pr1', message: 'Production baseline v1.0', author: 'Team', timestamp: Date.now() - 30000, branch: 'main', parents: [], type: 'both' },
            { id: 'pr2', message: 'Add route planner UI', author: 'You', timestamp: Date.now() - 25000, branch: 'feature/route-planner', parents: ['pr1'], type: 'both' },
            { id: 'pr3', message: 'Implement route calculation', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/route-planner', parents: ['pr2'], type: 'both' },
            { id: 'pr4', message: 'Add tests for planner', author: 'You', timestamp: Date.now() - 15000, branch: 'feature/route-planner', parents: ['pr3'], type: 'both' },
            { id: 'pr5', message: 'Merge PR #42: Route Planner', author: 'GitHub', timestamp: Date.now() - 8000, branch: 'main', parents: ['pr1', 'pr4'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'pr5', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'pr5', color: '#65a3d5', isRemote: true },
            { name: 'feature/route-planner', commitId: 'pr4', color: '#8b5cf6', isRemote: false },
            { name: 'origin/feature/route-planner', commitId: 'pr4', color: '#8b5cf6', isRemote: true }
          ],
          head: 'main'
        }
      }
    ]
  },
  {
    id: 'hotfix-workflow',
    name: 'Emergency Patch',
    description: 'Critical hotfix workflow - branch from production, fix, and fast-track merge',
    difficulty: 'advanced',
    icon: 'emergency',
    xpReward: 200,
    badge: {
      id: 'crisis-manager',
      name: 'Crisis Manager',
      description: 'Successfully deployed emergency hotfixes',
      icon: '🚨'
    },
    operations: [
      {
        id: 'hotfix-1',
        type: 'commit',
        description: 'Production system with ongoing development',
        gitCommand: 'git commit -m "Release v1.0.0" && git tag v1.0.0',
        beforeState: {
          commits: [],
          branches: [
            { name: 'main', commitId: '', color: '#65a3d5', isRemote: false },
            { name: 'develop', commitId: '', color: '#10b981', isRemote: false }
          ],
          head: 'develop'
        },
        afterState: {
          commits: [
            { id: 'hf1', message: 'v2.0 - Stable production', author: 'Team', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'hf2', message: 'New feature A in progress', author: 'Dev1', timestamp: Date.now() - 35000, branch: 'develop', parents: ['hf1'], type: 'local' },
            { id: 'hf3', message: 'New feature B in progress', author: 'Dev2', timestamp: Date.now() - 30000, branch: 'develop', parents: ['hf2'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'hf1', color: '#65a3d5', isRemote: false },
            { name: 'develop', commitId: 'hf3', color: '#10b981', isRemote: false }
          ],
          head: 'develop'
        }
      },
      {
        id: 'hotfix-2',
        type: 'branch',
        description: '🚨 Critical bug detected! Create hotfix branch from main',
        gitCommand: '# Bug discovered in production!',
        beforeState: {
          commits: [
            { id: 'hf1', message: 'v2.0 - Stable production', author: 'Team', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'hf2', message: 'New feature A in progress', author: 'Dev1', timestamp: Date.now() - 35000, branch: 'develop', parents: ['hf1'], type: 'local' },
            { id: 'hf3', message: 'New feature B in progress', author: 'Dev2', timestamp: Date.now() - 30000, branch: 'develop', parents: ['hf2'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'hf1', color: '#65a3d5', isRemote: false },
            { name: 'develop', commitId: 'hf3', color: '#10b981', isRemote: false }
          ],
          head: 'develop'
        },
        afterState: {
          commits: [
            { id: 'hf1', message: 'v2.0 - Stable production', author: 'Team', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'hf2', message: 'New feature A in progress', author: 'Dev1', timestamp: Date.now() - 35000, branch: 'develop', parents: ['hf1'], type: 'local' },
            { id: 'hf3', message: 'New feature B in progress', author: 'Dev2', timestamp: Date.now() - 30000, branch: 'develop', parents: ['hf2'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'hf1', color: '#65a3d5', isRemote: false },
            { name: 'develop', commitId: 'hf3', color: '#10b981', isRemote: false },
            { name: 'hotfix/critical-security', commitId: 'hf1', color: '#ef4444', isRemote: false }
          ],
          head: 'hotfix/critical-security'
        }
      },
      {
        id: 'hotfix-3',
        type: 'commit',
        description: 'Implement and test the critical fix',
        gitCommand: 'git checkout -b hotfix/security-patch',
        beforeState: {
          commits: [
            { id: 'hf1', message: 'v2.0 - Stable production', author: 'Team', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'hf2', message: 'New feature A in progress', author: 'Dev1', timestamp: Date.now() - 35000, branch: 'develop', parents: ['hf1'], type: 'local' },
            { id: 'hf3', message: 'New feature B in progress', author: 'Dev2', timestamp: Date.now() - 30000, branch: 'develop', parents: ['hf2'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'hf1', color: '#65a3d5', isRemote: false },
            { name: 'develop', commitId: 'hf3', color: '#10b981', isRemote: false },
            { name: 'hotfix/critical-security', commitId: 'hf1', color: '#ef4444', isRemote: false }
          ],
          head: 'hotfix/critical-security'
        },
        afterState: {
          commits: [
            { id: 'hf1', message: 'v2.0 - Stable production', author: 'Team', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'hf2', message: 'New feature A in progress', author: 'Dev1', timestamp: Date.now() - 35000, branch: 'develop', parents: ['hf1'], type: 'local' },
            { id: 'hf3', message: 'New feature B in progress', author: 'Dev2', timestamp: Date.now() - 30000, branch: 'develop', parents: ['hf2'], type: 'local' },
            { id: 'hf4', message: 'Fix authentication bypass vulnerability', author: 'You', timestamp: Date.now() - 20000, branch: 'hotfix/critical-security', parents: ['hf1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'hf1', color: '#65a3d5', isRemote: false },
            { name: 'develop', commitId: 'hf3', color: '#10b981', isRemote: false },
            { name: 'hotfix/critical-security', commitId: 'hf4', color: '#ef4444', isRemote: false }
          ],
          head: 'hotfix/critical-security'
        }
      },
      {
        id: 'hotfix-4',
        type: 'merge',
        description: 'Merge hotfix to main - deploy to production!',
        gitCommand: 'git commit -m "Fix security vulnerability"',
        beforeState: {
          commits: [
            { id: 'hf1', message: 'v2.0 - Stable production', author: 'Team', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'hf2', message: 'New feature A in progress', author: 'Dev1', timestamp: Date.now() - 35000, branch: 'develop', parents: ['hf1'], type: 'local' },
            { id: 'hf3', message: 'New feature B in progress', author: 'Dev2', timestamp: Date.now() - 30000, branch: 'develop', parents: ['hf2'], type: 'local' },
            { id: 'hf4', message: 'Fix authentication bypass vulnerability', author: 'You', timestamp: Date.now() - 20000, branch: 'hotfix/critical-security', parents: ['hf1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'hf1', color: '#65a3d5', isRemote: false },
            { name: 'develop', commitId: 'hf3', color: '#10b981', isRemote: false },
            { name: 'hotfix/critical-security', commitId: 'hf4', color: '#ef4444', isRemote: false }
          ],
          head: 'hotfix/critical-security'
        },
        afterState: {
          commits: [
            { id: 'hf1', message: 'v2.0 - Stable production', author: 'Team', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'hf2', message: 'New feature A in progress', author: 'Dev1', timestamp: Date.now() - 35000, branch: 'develop', parents: ['hf1'], type: 'local' },
            { id: 'hf3', message: 'New feature B in progress', author: 'Dev2', timestamp: Date.now() - 30000, branch: 'develop', parents: ['hf2'], type: 'local' },
            { id: 'hf4', message: 'Fix authentication bypass vulnerability', author: 'You', timestamp: Date.now() - 20000, branch: 'hotfix/critical-security', parents: ['hf1'], type: 'local' },
            { id: 'hf5', message: 'Merge hotfix - v2.0.1', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['hf1', 'hf4'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'hf5', color: '#65a3d5', isRemote: false },
            { name: 'develop', commitId: 'hf3', color: '#10b981', isRemote: false },
            { name: 'hotfix/critical-security', commitId: 'hf4', color: '#ef4444', isRemote: false }
          ],
          head: 'main'
        }
      },
      {
        id: 'hotfix-5',
        type: 'merge',
        description: 'Merge hotfix back to develop - keep branches in sync!',
        gitCommand: 'git checkout main && git merge hotfix/security-patch',
        beforeState: {
          commits: [
            { id: 'hf1', message: 'v2.0 - Stable production', author: 'Team', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'hf2', message: 'New feature A in progress', author: 'Dev1', timestamp: Date.now() - 35000, branch: 'develop', parents: ['hf1'], type: 'local' },
            { id: 'hf3', message: 'New feature B in progress', author: 'Dev2', timestamp: Date.now() - 30000, branch: 'develop', parents: ['hf2'], type: 'local' },
            { id: 'hf4', message: 'Fix authentication bypass vulnerability', author: 'You', timestamp: Date.now() - 20000, branch: 'hotfix/critical-security', parents: ['hf1'], type: 'local' },
            { id: 'hf5', message: 'Merge hotfix - v2.0.1', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['hf1', 'hf4'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'hf5', color: '#65a3d5', isRemote: false },
            { name: 'develop', commitId: 'hf3', color: '#10b981', isRemote: false },
            { name: 'hotfix/critical-security', commitId: 'hf4', color: '#ef4444', isRemote: false }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'hf1', message: 'v2.0 - Stable production', author: 'Team', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'hf2', message: 'New feature A in progress', author: 'Dev1', timestamp: Date.now() - 35000, branch: 'develop', parents: ['hf1'], type: 'local' },
            { id: 'hf3', message: 'New feature B in progress', author: 'Dev2', timestamp: Date.now() - 30000, branch: 'develop', parents: ['hf2'], type: 'local' },
            { id: 'hf4', message: 'Fix authentication bypass vulnerability', author: 'You', timestamp: Date.now() - 20000, branch: 'hotfix/critical-security', parents: ['hf1'], type: 'local' },
            { id: 'hf5', message: 'Merge hotfix - v2.0.1', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['hf1', 'hf4'], type: 'local' },
            { id: 'hf6', message: 'Merge hotfix into develop', author: 'You', timestamp: Date.now() - 10000, branch: 'develop', parents: ['hf3', 'hf4'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'hf5', color: '#65a3d5', isRemote: false },
            { name: 'develop', commitId: 'hf6', color: '#10b981', isRemote: false },
            { name: 'hotfix/critical-security', commitId: 'hf4', color: '#ef4444', isRemote: false }
          ],
          head: 'develop'
        }
      }
    ]
  },
  {
    id: 'interactive-rebase',
    name: 'History Sculptor',
    description: 'Interactive rebase - squash, reword, and clean up commit history',
    difficulty: 'advanced',
    icon: 'sculpt',
    xpReward: 250,
    badge: {
      id: 'history-sculptor',
      name: 'History Sculptor',
      description: 'Master of interactive rebase',
      icon: '🎨'
    },
    operations: [
      {
        id: 'irebase-1',
        type: 'commit',
        description: 'Feature branch with messy commit history',
        gitCommand: '# Multiple commits made',
        beforeState: {
          commits: [],
          branches: [{ name: 'feature/ui-update', commitId: '', color: '#8b5cf6', isRemote: false }],
          head: 'feature/ui-update'
        },
        afterState: {
          commits: [
            { id: 'ir1', message: 'Start UI redesign', author: 'You', timestamp: Date.now() - 30000, branch: 'feature/ui-update', parents: [], type: 'local' },
            { id: 'ir2', message: 'WIP commit', author: 'You', timestamp: Date.now() - 25000, branch: 'feature/ui-update', parents: ['ir1'], type: 'local' },
            { id: 'ir3', message: 'Fix typo', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/ui-update', parents: ['ir2'], type: 'local' },
            { id: 'ir4', message: 'Add button styles', author: 'You', timestamp: Date.now() - 15000, branch: 'feature/ui-update', parents: ['ir3'], type: 'local' },
            { id: 'ir5', message: 'Oops forgot file', author: 'You', timestamp: Date.now() - 10000, branch: 'feature/ui-update', parents: ['ir4'], type: 'local' },
            { id: 'ir6', message: 'Fix linting', author: 'You', timestamp: Date.now() - 5000, branch: 'feature/ui-update', parents: ['ir5'], type: 'local' }
          ],
          branches: [{ name: 'feature/ui-update', commitId: 'ir6', color: '#8b5cf6', isRemote: false }],
          head: 'feature/ui-update'
        }
      },
      {
        id: 'irebase-2',
        type: 'commit',
        description: '🎨 Interactive rebase - squash and clean up commits!',
        gitCommand: 'git rebase -i HEAD~5',
        beforeState: {
          commits: [
            { id: 'ir1', message: 'Start UI redesign', author: 'You', timestamp: Date.now() - 30000, branch: 'feature/ui-update', parents: [], type: 'local' },
            { id: 'ir2', message: 'WIP commit', author: 'You', timestamp: Date.now() - 25000, branch: 'feature/ui-update', parents: ['ir1'], type: 'local' },
            { id: 'ir3', message: 'Fix typo', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/ui-update', parents: ['ir2'], type: 'local' },
            { id: 'ir4', message: 'Add button styles', author: 'You', timestamp: Date.now() - 15000, branch: 'feature/ui-update', parents: ['ir3'], type: 'local' },
            { id: 'ir5', message: 'Oops forgot file', author: 'You', timestamp: Date.now() - 10000, branch: 'feature/ui-update', parents: ['ir4'], type: 'local' },
            { id: 'ir6', message: 'Fix linting', author: 'You', timestamp: Date.now() - 5000, branch: 'feature/ui-update', parents: ['ir5'], type: 'local' }
          ],
          branches: [{ name: 'feature/ui-update', commitId: 'ir6', color: '#8b5cf6', isRemote: false }],
          head: 'feature/ui-update'
        },
        afterState: {
          commits: [
            { id: 'ir7', message: 'Redesign UI with modern button styles', author: 'You', timestamp: Date.now() - 3000, branch: 'feature/ui-update', parents: [], type: 'local' }
          ],
          branches: [{ name: 'feature/ui-update', commitId: 'ir7', color: '#8b5cf6', isRemote: false }],
          head: 'feature/ui-update'
        }
      }
    ]
  },
  {
    id: 'bisect-debugging',
    name: 'Temporal Detective',
    description: 'Use git bisect to find the commit that introduced a bug',
    difficulty: 'advanced',
    icon: 'detective',
    xpReward: 275,
    badge: {
      id: 'bug-hunter',
      name: 'Bug Hunter',
      description: 'Found bugs using binary search',
      icon: '🔍'
    },
    operations: [
      {
        id: 'bisect-1',
        type: 'commit',
        description: 'Timeline of commits - one contains a bug!',
        gitCommand: 'git log --oneline',
        beforeState: {
          commits: [],
          branches: [{ name: 'main', commitId: '', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'bs1', message: '✅ Add user login', author: 'Dev', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'bs2', message: '✅ Add dashboard', author: 'Dev', timestamp: Date.now() - 35000, branch: 'main', parents: ['bs1'], type: 'local' },
            { id: 'bs3', message: '✅ Add profile page', author: 'Dev', timestamp: Date.now() - 30000, branch: 'main', parents: ['bs2'], type: 'local' },
            { id: 'bs4', message: '❌ Add settings (contains bug!)', author: 'Dev', timestamp: Date.now() - 25000, branch: 'main', parents: ['bs3'], type: 'local' },
            { id: 'bs5', message: '✅ Add notifications', author: 'Dev', timestamp: Date.now() - 20000, branch: 'main', parents: ['bs4'], type: 'local' },
            { id: 'bs6', message: '✅ Add search feature', author: 'Dev', timestamp: Date.now() - 15000, branch: 'main', parents: ['bs5'], type: 'local' },
            { id: 'bs7', message: '✅ Add export function', author: 'Dev', timestamp: Date.now() - 10000, branch: 'main', parents: ['bs6'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'bs7', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'bisect-2',
        type: 'commit',
        description: '🔍 Start bisect - mark current as bad',
        gitCommand: 'git bisect start && git bisect bad',
        beforeState: {
          commits: [
            { id: 'bs1', message: '✅ Add user login', author: 'Dev', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'bs2', message: '✅ Add dashboard', author: 'Dev', timestamp: Date.now() - 35000, branch: 'main', parents: ['bs1'], type: 'local' },
            { id: 'bs3', message: '✅ Add profile page', author: 'Dev', timestamp: Date.now() - 30000, branch: 'main', parents: ['bs2'], type: 'local' },
            { id: 'bs4', message: '❌ Add settings (contains bug!)', author: 'Dev', timestamp: Date.now() - 25000, branch: 'main', parents: ['bs3'], type: 'local' },
            { id: 'bs5', message: '✅ Add notifications', author: 'Dev', timestamp: Date.now() - 20000, branch: 'main', parents: ['bs4'], type: 'local' },
            { id: 'bs6', message: '✅ Add search feature', author: 'Dev', timestamp: Date.now() - 15000, branch: 'main', parents: ['bs5'], type: 'local' },
            { id: 'bs7', message: '✅ Add export function', author: 'Dev', timestamp: Date.now() - 10000, branch: 'main', parents: ['bs6'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'bs7', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'bs1', message: '✅ Add user login', author: 'Dev', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'bs2', message: '✅ Add dashboard', author: 'Dev', timestamp: Date.now() - 35000, branch: 'main', parents: ['bs1'], type: 'local' },
            { id: 'bs3', message: '✅ Add profile page', author: 'Dev', timestamp: Date.now() - 30000, branch: 'main', parents: ['bs2'], type: 'local' },
            { id: 'bs4', message: '❌ Add settings (contains bug!)', author: 'Dev', timestamp: Date.now() - 25000, branch: 'main', parents: ['bs3'], type: 'local' },
            { id: 'bs5', message: '✅ Add notifications', author: 'Dev', timestamp: Date.now() - 20000, branch: 'main', parents: ['bs4'], type: 'local' },
            { id: 'bs6', message: '✅ Add search feature', author: 'Dev', timestamp: Date.now() - 15000, branch: 'main', parents: ['bs5'], type: 'local' },
            { id: 'bs7', message: '✅ Add export function', author: 'Dev', timestamp: Date.now() - 10000, branch: 'main', parents: ['bs6'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'bs7', color: '#65a3d5', isRemote: false },
            { name: 'bisect-bad', commitId: 'bs7', color: '#ef4444', isRemote: false }
          ],
          head: 'bs4'
        }
      },
      {
        id: 'bisect-3',
        type: 'commit',
        description: 'Test middle commit - still has bug, mark as bad',
        gitCommand: 'git bisect good <commit-hash>',
        beforeState: {
          commits: [
            { id: 'bs1', message: '✅ Add user login', author: 'Dev', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'bs2', message: '✅ Add dashboard', author: 'Dev', timestamp: Date.now() - 35000, branch: 'main', parents: ['bs1'], type: 'local' },
            { id: 'bs3', message: '✅ Add profile page', author: 'Dev', timestamp: Date.now() - 30000, branch: 'main', parents: ['bs2'], type: 'local' },
            { id: 'bs4', message: '❌ Add settings (contains bug!)', author: 'Dev', timestamp: Date.now() - 25000, branch: 'main', parents: ['bs3'], type: 'local' },
            { id: 'bs5', message: '✅ Add notifications', author: 'Dev', timestamp: Date.now() - 20000, branch: 'main', parents: ['bs4'], type: 'local' },
            { id: 'bs6', message: '✅ Add search feature', author: 'Dev', timestamp: Date.now() - 15000, branch: 'main', parents: ['bs5'], type: 'local' },
            { id: 'bs7', message: '✅ Add export function', author: 'Dev', timestamp: Date.now() - 10000, branch: 'main', parents: ['bs6'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'bs7', color: '#65a3d5', isRemote: false },
            { name: 'bisect-bad', commitId: 'bs7', color: '#ef4444', isRemote: false }
          ],
          head: 'bs4'
        },
        afterState: {
          commits: [
            { id: 'bs1', message: '✅ Add user login', author: 'Dev', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'bs2', message: '✅ Add dashboard', author: 'Dev', timestamp: Date.now() - 35000, branch: 'main', parents: ['bs1'], type: 'local' },
            { id: 'bs3', message: '✅ Add profile page', author: 'Dev', timestamp: Date.now() - 30000, branch: 'main', parents: ['bs2'], type: 'local' },
            { id: 'bs4', message: '❌ Add settings (contains bug!)', author: 'Dev', timestamp: Date.now() - 25000, branch: 'main', parents: ['bs3'], type: 'local' },
            { id: 'bs5', message: '✅ Add notifications', author: 'Dev', timestamp: Date.now() - 20000, branch: 'main', parents: ['bs4'], type: 'local' },
            { id: 'bs6', message: '✅ Add search feature', author: 'Dev', timestamp: Date.now() - 15000, branch: 'main', parents: ['bs5'], type: 'local' },
            { id: 'bs7', message: '✅ Add export function', author: 'Dev', timestamp: Date.now() - 10000, branch: 'main', parents: ['bs6'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'bs7', color: '#65a3d5', isRemote: false },
            { name: 'bisect-bad', commitId: 'bs4', color: '#ef4444', isRemote: false },
            { name: 'bisect-good', commitId: 'bs1', color: '#10b981', isRemote: false }
          ],
          head: 'bs3'
        }
      },
      {
        id: 'bisect-4',
        type: 'commit',
        description: '🎯 Found it! bs4 introduced the bug',
        gitCommand: 'git bisect reset',
        beforeState: {
          commits: [
            { id: 'bs1', message: '✅ Add user login', author: 'Dev', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'bs2', message: '✅ Add dashboard', author: 'Dev', timestamp: Date.now() - 35000, branch: 'main', parents: ['bs1'], type: 'local' },
            { id: 'bs3', message: '✅ Add profile page', author: 'Dev', timestamp: Date.now() - 30000, branch: 'main', parents: ['bs2'], type: 'local' },
            { id: 'bs4', message: '❌ Add settings (contains bug!)', author: 'Dev', timestamp: Date.now() - 25000, branch: 'main', parents: ['bs3'], type: 'local' },
            { id: 'bs5', message: '✅ Add notifications', author: 'Dev', timestamp: Date.now() - 20000, branch: 'main', parents: ['bs4'], type: 'local' },
            { id: 'bs6', message: '✅ Add search feature', author: 'Dev', timestamp: Date.now() - 15000, branch: 'main', parents: ['bs5'], type: 'local' },
            { id: 'bs7', message: '✅ Add export function', author: 'Dev', timestamp: Date.now() - 10000, branch: 'main', parents: ['bs6'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'bs7', color: '#65a3d5', isRemote: false },
            { name: 'bisect-bad', commitId: 'bs4', color: '#ef4444', isRemote: false },
            { name: 'bisect-good', commitId: 'bs1', color: '#10b981', isRemote: false }
          ],
          head: 'bs3'
        },
        afterState: {
          commits: [
            { id: 'bs1', message: '✅ Add user login', author: 'Dev', timestamp: Date.now() - 40000, branch: 'main', parents: [], type: 'local' },
            { id: 'bs2', message: '✅ Add dashboard', author: 'Dev', timestamp: Date.now() - 35000, branch: 'main', parents: ['bs1'], type: 'local' },
            { id: 'bs3', message: '✅ Add profile page', author: 'Dev', timestamp: Date.now() - 30000, branch: 'main', parents: ['bs2'], type: 'local' },
            { id: 'bs4', message: '❌ Add settings (contains bug!)', author: 'Dev', timestamp: Date.now() - 25000, branch: 'main', parents: ['bs3'], type: 'local' },
            { id: 'bs5', message: '✅ Add notifications', author: 'Dev', timestamp: Date.now() - 20000, branch: 'main', parents: ['bs4'], type: 'local' },
            { id: 'bs6', message: '✅ Add search feature', author: 'Dev', timestamp: Date.now() - 15000, branch: 'main', parents: ['bs5'], type: 'local' },
            { id: 'bs7', message: '✅ Add export function', author: 'Dev', timestamp: Date.now() - 10000, branch: 'main', parents: ['bs6'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'bs7', color: '#65a3d5', isRemote: false },
            { name: 'culprit', commitId: 'bs4', color: '#f59e0b', isRemote: false }
          ],
          head: 'bs4'
        }
      }
    ]
  },
  {
    id: 'tag-release',
    name: 'Version Milestone',
    description: 'Tag releases and manage version history',
    difficulty: 'intermediate',
    icon: 'tag',
    xpReward: 150,
    badge: {
      id: 'release-captain',
      name: 'Release Captain',
      description: 'Mastered version tagging',
      icon: '🏷️'
    },
    operations: [
      {
        id: 'tag-1',
        type: 'commit',
        description: 'Development progress leading to release',
        gitCommand: 'git commit -m "Initial release preparation"',
        beforeState: {
          commits: [],
          branches: [{ name: 'main', commitId: '', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'tg1', message: 'Initial release preparation', author: 'Team', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'tg2', message: 'Add core features', author: 'Team', timestamp: Date.now() - 15000, branch: 'main', parents: ['tg1'], type: 'local' },
            { id: 'tg3', message: 'Fix bugs and polish', author: 'Team', timestamp: Date.now() - 10000, branch: 'main', parents: ['tg2'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'tg3', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'tag-2',
        type: 'commit',
        description: '🏷️ Tag v1.0.0 - First production release!',
        gitCommand: 'git tag -a v1.0.0 -m "First production release"',
        beforeState: {
          commits: [
            { id: 'tg1', message: 'Initial release preparation', author: 'Team', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'tg2', message: 'Add core features', author: 'Team', timestamp: Date.now() - 15000, branch: 'main', parents: ['tg1'], type: 'local' },
            { id: 'tg3', message: 'Fix bugs and polish', author: 'Team', timestamp: Date.now() - 10000, branch: 'main', parents: ['tg2'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'tg3', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'tg1', message: 'Initial release preparation', author: 'Team', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'tg2', message: 'Add core features', author: 'Team', timestamp: Date.now() - 15000, branch: 'main', parents: ['tg1'], type: 'local' },
            { id: 'tg3', message: 'Fix bugs and polish', author: 'Team', timestamp: Date.now() - 10000, branch: 'main', parents: ['tg2'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'tg3', color: '#65a3d5', isRemote: false },
            { name: 'v1.0.0', commitId: 'tg3', color: '#f59e0b', isRemote: false }
          ],
          head: 'main'
        }
      },
      {
        id: 'tag-3',
        type: 'commit',
        description: 'Continue development after release',
        gitCommand: 'git commit -m "Add new features"',
        beforeState: {
          commits: [
            { id: 'tg1', message: 'Initial release preparation', author: 'Team', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'tg2', message: 'Add core features', author: 'Team', timestamp: Date.now() - 15000, branch: 'main', parents: ['tg1'], type: 'local' },
            { id: 'tg3', message: 'Fix bugs and polish', author: 'Team', timestamp: Date.now() - 10000, branch: 'main', parents: ['tg2'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'tg3', color: '#65a3d5', isRemote: false },
            { name: 'v1.0.0', commitId: 'tg3', color: '#f59e0b', isRemote: false }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'tg1', message: 'Initial release preparation', author: 'Team', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'tg2', message: 'Add core features', author: 'Team', timestamp: Date.now() - 15000, branch: 'main', parents: ['tg1'], type: 'local' },
            { id: 'tg3', message: 'Fix bugs and polish', author: 'Team', timestamp: Date.now() - 10000, branch: 'main', parents: ['tg2'], type: 'local' },
            { id: 'tg4', message: 'Add new experimental feature', author: 'Team', timestamp: Date.now() - 7000, branch: 'main', parents: ['tg3'], type: 'local' },
            { id: 'tg5', message: 'Improve performance', author: 'Team', timestamp: Date.now() - 4000, branch: 'main', parents: ['tg4'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'tg5', color: '#65a3d5', isRemote: false },
            { name: 'v1.0.0', commitId: 'tg3', color: '#f59e0b', isRemote: false }
          ],
          head: 'main'
        }
      },
      {
        id: 'tag-4',
        type: 'commit',
        description: '🏷️ Tag v1.1.0 - Feature update release!',
        gitCommand: 'git tag -a v1.1.0 -m "Feature update release"',
        beforeState: {
          commits: [
            { id: 'tg1', message: 'Initial release preparation', author: 'Team', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'tg2', message: 'Add core features', author: 'Team', timestamp: Date.now() - 15000, branch: 'main', parents: ['tg1'], type: 'local' },
            { id: 'tg3', message: 'Fix bugs and polish', author: 'Team', timestamp: Date.now() - 10000, branch: 'main', parents: ['tg2'], type: 'local' },
            { id: 'tg4', message: 'Add new experimental feature', author: 'Team', timestamp: Date.now() - 7000, branch: 'main', parents: ['tg3'], type: 'local' },
            { id: 'tg5', message: 'Improve performance', author: 'Team', timestamp: Date.now() - 4000, branch: 'main', parents: ['tg4'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'tg5', color: '#65a3d5', isRemote: false },
            { name: 'v1.0.0', commitId: 'tg3', color: '#f59e0b', isRemote: false }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'tg1', message: 'Initial release preparation', author: 'Team', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'tg2', message: 'Add core features', author: 'Team', timestamp: Date.now() - 15000, branch: 'main', parents: ['tg1'], type: 'local' },
            { id: 'tg3', message: 'Fix bugs and polish', author: 'Team', timestamp: Date.now() - 10000, branch: 'main', parents: ['tg2'], type: 'local' },
            { id: 'tg4', message: 'Add new experimental feature', author: 'Team', timestamp: Date.now() - 7000, branch: 'main', parents: ['tg3'], type: 'local' },
            { id: 'tg5', message: 'Improve performance', author: 'Team', timestamp: Date.now() - 4000, branch: 'main', parents: ['tg4'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'tg5', color: '#65a3d5', isRemote: false },
            { name: 'v1.0.0', commitId: 'tg3', color: '#f59e0b', isRemote: false },
            { name: 'v1.1.0', commitId: 'tg5', color: '#f59e0b', isRemote: false }
          ],
          head: 'main'
        }
      }
    ]
  },
  {
    id: 'conflict-resolution',
    name: 'Merge Conflict Battle',
    description: 'Handle and resolve merge conflicts like a pro',
    difficulty: 'advanced',
    icon: 'conflict',
    xpReward: 300,
    badge: {
      id: 'conflict-resolver',
      name: 'Conflict Resolver',
      description: 'Master of merge conflict resolution',
      icon: '⚔️'
    },
    operations: [
      {
        id: 'conflict-1',
        type: 'commit',
        description: 'Two branches modify the same file',
        gitCommand: 'git commit -m "Add config file"',
        beforeState: {
          commits: [],
          branches: [{ name: 'main', commitId: '', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'cf1', message: 'Add config file', author: 'Team', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'cf1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'conflict-2',
        type: 'branch',
        description: 'Create feature branch',
        gitCommand: 'git checkout -b feature/api-update',
        beforeState: {
          commits: [
            { id: 'cf1', message: 'Add config file', author: 'Team', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'cf1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'cf1', message: 'Add config file', author: 'Team', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cf1', color: '#65a3d5', isRemote: false },
            { name: 'feature/api-update', commitId: 'cf1', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/api-update'
        }
      },
      {
        id: 'conflict-3',
        type: 'commit',
        description: 'Modify config on feature branch',
        gitCommand: 'git commit -m "Update API endpoint"',
        beforeState: {
          commits: [
            { id: 'cf1', message: 'Add config file', author: 'Team', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cf1', color: '#65a3d5', isRemote: false },
            { name: 'feature/api-update', commitId: 'cf1', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/api-update'
        },
        afterState: {
          commits: [
            { id: 'cf1', message: 'Add config file', author: 'Team', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'cf2', message: 'Update API endpoint to v2', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/api-update', parents: ['cf1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cf1', color: '#65a3d5', isRemote: false },
            { name: 'feature/api-update', commitId: 'cf2', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/api-update'
        }
      },
      {
        id: 'conflict-4',
        type: 'commit',
        description: 'Meanwhile, main also modifies config differently',
        gitCommand: 'git checkout main && git commit -m "Change timeout"',
        beforeState: {
          commits: [
            { id: 'cf1', message: 'Add config file', author: 'Team', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'cf2', message: 'Update API endpoint to v2', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/api-update', parents: ['cf1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cf1', color: '#65a3d5', isRemote: false },
            { name: 'feature/api-update', commitId: 'cf2', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/api-update'
        },
        afterState: {
          commits: [
            { id: 'cf1', message: 'Add config file', author: 'Team', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'cf2', message: 'Update API endpoint to v2', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/api-update', parents: ['cf1'], type: 'local' },
            { id: 'cf3', message: 'Change timeout to 5000ms', author: 'Teammate', timestamp: Date.now() - 18000, branch: 'main', parents: ['cf1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cf3', color: '#65a3d5', isRemote: false },
            { name: 'feature/api-update', commitId: 'cf2', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/api-update'
        }
      },
      {
        id: 'conflict-5',
        type: 'merge',
        description: '⚔️ Merge conflict! Both changed config.js',
        gitCommand: 'git checkout feature/api-update && git merge main # CONFLICT!',
        beforeState: {
          commits: [
            { id: 'cf1', message: 'Add config file', author: 'Team', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'cf2', message: 'Update API endpoint to v2', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/api-update', parents: ['cf1'], type: 'local' },
            { id: 'cf3', message: 'Change timeout to 5000ms', author: 'Teammate', timestamp: Date.now() - 18000, branch: 'main', parents: ['cf1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cf3', color: '#65a3d5', isRemote: false },
            { name: 'feature/api-update', commitId: 'cf2', color: '#8b5cf6', isRemote: false }
          ],
          head: 'feature/api-update'
        },
        afterState: {
          commits: [
            { id: 'cf1', message: 'Add config file', author: 'Team', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'cf2', message: 'Update API endpoint to v2', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/api-update', parents: ['cf1'], type: 'local' },
            { id: 'cf3', message: 'Change timeout to 5000ms', author: 'Teammate', timestamp: Date.now() - 18000, branch: 'main', parents: ['cf1'], type: 'local' },
            { id: 'cf4', message: '⚔️ CONFLICT in config.js', author: 'Git', timestamp: Date.now() - 15000, branch: 'feature/api-update', parents: ['cf2', 'cf3'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cf3', color: '#65a3d5', isRemote: false },
            { name: 'feature/api-update', commitId: 'cf4', color: '#ef4444', isRemote: false }
          ],
          head: 'feature/api-update'
        }
      },
      {
        id: 'conflict-6',
        type: 'commit',
        description: '✅ Resolve conflict - keep both changes!',
        gitCommand: 'git add . && git commit -m "Resolve conflict"',
        beforeState: {
          commits: [
            { id: 'cf1', message: 'Add config file', author: 'Team', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'cf2', message: 'Update API endpoint to v2', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/api-update', parents: ['cf1'], type: 'local' },
            { id: 'cf3', message: 'Change timeout to 5000ms', author: 'Teammate', timestamp: Date.now() - 18000, branch: 'main', parents: ['cf1'], type: 'local' },
            { id: 'cf4', message: '⚔️ CONFLICT in config.js', author: 'Git', timestamp: Date.now() - 15000, branch: 'feature/api-update', parents: ['cf2', 'cf3'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cf3', color: '#65a3d5', isRemote: false },
            { name: 'feature/api-update', commitId: 'cf4', color: '#ef4444', isRemote: false }
          ],
          head: 'feature/api-update'
        },
        afterState: {
          commits: [
            { id: 'cf1', message: 'Add config file', author: 'Team', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'cf2', message: 'Update API endpoint to v2', author: 'You', timestamp: Date.now() - 20000, branch: 'feature/api-update', parents: ['cf1'], type: 'local' },
            { id: 'cf3', message: 'Change timeout to 5000ms', author: 'Teammate', timestamp: Date.now() - 18000, branch: 'main', parents: ['cf1'], type: 'local' },
            { id: 'cf5', message: '✅ Merge with conflict resolution', author: 'You', timestamp: Date.now() - 10000, branch: 'feature/api-update', parents: ['cf2', 'cf3'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'cf3', color: '#65a3d5', isRemote: false },
            { name: 'feature/api-update', commitId: 'cf5', color: '#10b981', isRemote: false }
          ],
          head: 'feature/api-update'
        }
      }
    ]
  },
  {
    id: 'gitignore-guardian',
    name: '.gitignore Guardian',
    description: 'Create and manage .gitignore files to protect secrets from being committed',
    difficulty: 'beginner',
    icon: 'shield',
    xpReward: 125,
    badge: {
      id: 'secret-keeper',
      name: 'Secret Keeper',
      description: 'Mastered .gitignore protection',
      icon: '🛡️'
    },
    operations: [
      {
        id: 'gitignore-1',
        type: 'commit',
        description: 'Initial project setup',
        gitCommand: 'git init && git commit -m "Initialize project"',
        beforeState: {
          commits: [],
          branches: [{ name: 'main', commitId: '', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'gi1', message: 'Initialize project', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'gi1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'gitignore-2',
        type: 'commit',
        description: 'Add source files',
        gitCommand: 'git commit -m "Add source code"',
        beforeState: {
          commits: [
            { id: 'gi1', message: 'Initialize project', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'gi1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'gi1', message: 'Initialize project', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'local' },
            { id: 'gi2', message: 'Add source code', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['gi1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'gi2', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'gitignore-3',
        type: 'commit',
        description: '🛡️ Add .gitignore - protect build files and secrets!',
        gitCommand: 'echo "node_modules/" > .gitignore && git add .gitignore && git commit -m "Add .gitignore"',
        beforeState: {
          commits: [
            { id: 'gi1', message: 'Initialize project', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'local' },
            { id: 'gi2', message: 'Add source code', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['gi1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'gi2', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'gi1', message: 'Initialize project', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'local' },
            { id: 'gi2', message: 'Add source code', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['gi1'], type: 'local' },
            { id: 'gi3', message: 'Add .gitignore (node_modules, .env, dist)', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['gi2'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'gi3', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'gitignore-4',
        type: 'commit',
        description: 'Build artifacts now ignored - repository stays clean!',
        gitCommand: 'npm run build # Build artifacts ignored',
        beforeState: {
          commits: [
            { id: 'gi1', message: 'Initialize project', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'local' },
            { id: 'gi2', message: 'Add source code', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['gi1'], type: 'local' },
            { id: 'gi3', message: 'Add .gitignore (node_modules, .env, dist)', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['gi2'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'gi3', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'gi1', message: 'Initialize project', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: [], type: 'local' },
            { id: 'gi2', message: 'Add source code', author: 'You', timestamp: Date.now() - 12000, branch: 'main', parents: ['gi1'], type: 'local' },
            { id: 'gi3', message: 'Add .gitignore (node_modules, .env, dist)', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['gi2'], type: 'local' },
            { id: 'gi4', message: 'Build project - artifacts auto-ignored ✓', author: 'You', timestamp: Date.now() - 4000, branch: 'main', parents: ['gi3'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'gi4', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      }
    ]
  },
  {
    id: 'amend-scroll',
    name: 'The Amend Scroll',
    description: 'Use git commit --amend to fix the last commit message or add forgotten files',
    difficulty: 'intermediate',
    icon: 'scroll',
    xpReward: 160,
    badge: {
      id: 'perfectionist',
      name: 'Perfectionist',
      description: 'Mastered commit amendments',
      icon: '📜'
    },
    operations: [
      {
        id: 'amend-1',
        type: 'commit',
        description: 'Make initial commits',
        gitCommand: 'git commit -m "Add login feature"',
        beforeState: {
          commits: [],
          branches: [{ name: 'main', commitId: '', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'am1', message: 'Add login feature', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'am2', message: 'Add dashboard', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['am1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'am2', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'amend-2',
        type: 'commit',
        description: 'Oops! Typo in commit message',
        gitCommand: 'git commit -m "Add proflie page (TYPO!)"',
        beforeState: {
          commits: [
            { id: 'am1', message: 'Add login feature', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'am2', message: 'Add dashboard', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['am1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'am2', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'am1', message: 'Add login feature', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'am2', message: 'Add dashboard', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['am1'], type: 'local' },
            { id: 'am3', message: 'Add proflie page (TYPO!)', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: ['am2'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'am3', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'amend-3',
        type: 'commit',
        description: '📜 Amend commit - fix typo in message!',
        gitCommand: 'git commit --amend -m "Add profile page"',
        beforeState: {
          commits: [
            { id: 'am1', message: 'Add login feature', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'am2', message: 'Add dashboard', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['am1'], type: 'local' },
            { id: 'am3', message: 'Add proflie page (TYPO!)', author: 'You', timestamp: Date.now() - 10000, branch: 'main', parents: ['am2'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'am3', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'am1', message: 'Add login feature', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'am2', message: 'Add dashboard', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['am1'], type: 'local' },
            { id: 'am4', message: 'Add profile page ✓', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['am2'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'am4', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'amend-4',
        type: 'commit',
        description: 'Forgot to add a file!',
        gitCommand: 'git commit -m "Add settings (missing file!)"',
        beforeState: {
          commits: [
            { id: 'am1', message: 'Add login feature', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'am2', message: 'Add dashboard', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['am1'], type: 'local' },
            { id: 'am4', message: 'Add profile page ✓', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['am2'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'am4', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'am1', message: 'Add login feature', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'am2', message: 'Add dashboard', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['am1'], type: 'local' },
            { id: 'am4', message: 'Add profile page ✓', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['am2'], type: 'local' },
            { id: 'am5', message: 'Add settings (missing file!)', author: 'You', timestamp: Date.now() - 5000, branch: 'main', parents: ['am4'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'am5', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'amend-5',
        type: 'commit',
        description: '📜 Amend again - add forgotten file to last commit!',
        gitCommand: 'git add forgotten-file.js && git commit --amend',
        beforeState: {
          commits: [
            { id: 'am1', message: 'Add login feature', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'am2', message: 'Add dashboard', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['am1'], type: 'local' },
            { id: 'am4', message: 'Add profile page ✓', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['am2'], type: 'local' },
            { id: 'am5', message: 'Add settings (missing file!)', author: 'You', timestamp: Date.now() - 5000, branch: 'main', parents: ['am4'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'am5', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'am1', message: 'Add login feature', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'am2', message: 'Add dashboard', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['am1'], type: 'local' },
            { id: 'am4', message: 'Add profile page ✓', author: 'You', timestamp: Date.now() - 8000, branch: 'main', parents: ['am2'], type: 'local' },
            { id: 'am6', message: 'Add settings with config ✓', author: 'You', timestamp: Date.now() - 3000, branch: 'main', parents: ['am4'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'am6', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      }
    ]
  },
  {
    id: 'reflog-recovery',
    name: 'Reflog Recovery',
    description: 'Rescue lost commits with reflog, detach checkout, and targeted resets',
    difficulty: 'advanced',
    icon: 'history',
    xpReward: 220,
    badge: {
      id: 'reflog-rescuer',
      name: 'Reflog Rescuer',
      description: 'Recovered history using reflog and resets',
      icon: '🛰️'
    },
    operations: [
      {
        id: 'reflog-1',
        type: 'commit',
        description: 'Baseline commit - control center online',
        gitCommand: 'git commit -m "Baseline control center"',
        beforeState: {
          commits: [],
          branches: [{ name: 'main', commitId: '', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rr1', message: 'Baseline control center', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rr1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'reflog-2',
        type: 'commit',
        description: 'Add safety monitor commit',
        gitCommand: 'git commit -m "Add safety monitor"',
        beforeState: {
          commits: [
            { id: 'rr1', message: 'Baseline control center', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rr1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rr1', message: 'Baseline control center', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'rr2', message: 'Add safety monitor', author: 'You', timestamp: Date.now() - 17000, branch: 'main', parents: ['rr1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rr2', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'reflog-3',
        type: 'revert',
        description: 'Accidental hard reset drops the latest commit',
        gitCommand: 'git reset --hard HEAD~1',
        beforeState: {
          commits: [
            { id: 'rr1', message: 'Baseline control center', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'rr2', message: 'Add safety monitor', author: 'You', timestamp: Date.now() - 17000, branch: 'main', parents: ['rr1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rr2', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rr1', message: 'Baseline control center', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'rr2', message: 'Add safety monitor', author: 'You', timestamp: Date.now() - 17000, branch: 'main', parents: ['rr1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rr1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'reflog-4',
        type: 'revert',
        description: 'Inspect reflog to locate the lost commit',
        gitCommand: 'git reflog',
        beforeState: {
          commits: [
            { id: 'rr1', message: 'Baseline control center', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'rr2', message: 'Add safety monitor', author: 'You', timestamp: Date.now() - 17000, branch: 'main', parents: ['rr1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rr1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rr1', message: 'Baseline control center', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'rr2', message: 'Add safety monitor', author: 'You', timestamp: Date.now() - 17000, branch: 'main', parents: ['rr1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rr1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'reflog-5',
        type: 'revert',
        description: 'Checkout lost commit in detached HEAD from reflog',
        gitCommand: 'git checkout --detach rr2',
        beforeState: {
          commits: [
            { id: 'rr1', message: 'Baseline control center', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'rr2', message: 'Add safety monitor', author: 'You', timestamp: Date.now() - 17000, branch: 'main', parents: ['rr1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rr1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rr1', message: 'Baseline control center', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'rr2', message: 'Add safety monitor', author: 'You', timestamp: Date.now() - 17000, branch: 'main', parents: ['rr1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rr1', color: '#65a3d5', isRemote: false }],
          head: 'detached'
        }
      },
      {
        id: 'reflog-6',
        type: 'branch',
        description: 'Create a recovery branch from the detached state',
        gitCommand: 'git switch -c recovery/rescued',
        beforeState: {
          commits: [
            { id: 'rr1', message: 'Baseline control center', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'rr2', message: 'Add safety monitor', author: 'You', timestamp: Date.now() - 17000, branch: 'main', parents: ['rr1'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rr1', color: '#65a3d5', isRemote: false }],
          head: 'detached'
        },
        afterState: {
          commits: [
            { id: 'rr1', message: 'Baseline control center', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'rr2', message: 'Add safety monitor', author: 'You', timestamp: Date.now() - 17000, branch: 'main', parents: ['rr1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rr1', color: '#65a3d5', isRemote: false },
            { name: 'recovery/rescued', commitId: 'rr2', color: '#22c55e', isRemote: false }
          ],
          head: 'recovery/rescued'
        }
      },
      {
        id: 'reflog-7',
        type: 'revert',
        description: 'Reset main to the recovered commit safely',
        gitCommand: 'git checkout main && git reset --hard recovery/rescued',
        beforeState: {
          commits: [
            { id: 'rr1', message: 'Baseline control center', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'rr2', message: 'Add safety monitor', author: 'You', timestamp: Date.now() - 17000, branch: 'main', parents: ['rr1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rr1', color: '#65a3d5', isRemote: false },
            { name: 'recovery/rescued', commitId: 'rr2', color: '#22c55e', isRemote: false }
          ],
          head: 'recovery/rescued'
        },
        afterState: {
          commits: [
            { id: 'rr1', message: 'Baseline control center', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: [], type: 'local' },
            { id: 'rr2', message: 'Add safety monitor', author: 'You', timestamp: Date.now() - 17000, branch: 'main', parents: ['rr1'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rr2', color: '#65a3d5', isRemote: false },
            { name: 'recovery/rescued', commitId: 'rr2', color: '#22c55e', isRemote: false }
          ],
          head: 'main'
        }
      }
    ]
  },
  {
    id: 'branch-cleanup',
    name: 'Branch Cleanup Ritual',
    description: 'Delete merged branches (local and remote) to keep the repository tidy',
    difficulty: 'intermediate',
    icon: 'broom',
    xpReward: 140,
    badge: {
      id: 'tidiness-master',
      name: 'Tidiness Master',
      description: 'Cleaned up merged branches',
      icon: '🧹'
    },
    operations: [
      {
        id: 'cleanup-1',
        type: 'commit',
        description: 'Multiple feature branches merged',
        gitCommand: 'git checkout main && git merge feature/a',
        beforeState: {
          commits: [],
          branches: [{ name: 'main', commitId: '', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'cl1', message: 'Initial codebase', author: 'Team', timestamp: Date.now() - 30000, branch: 'main', parents: [], type: 'both' },
            { id: 'cl2', message: 'Feature A complete', author: 'Dev1', timestamp: Date.now() - 25000, branch: 'feature/a', parents: ['cl1'], type: 'both' },
            { id: 'cl3', message: 'Feature B complete', author: 'Dev2', timestamp: Date.now() - 20000, branch: 'feature/b', parents: ['cl1'], type: 'both' },
            { id: 'cl4', message: 'Merge feature/a', author: 'Team', timestamp: Date.now() - 18000, branch: 'main', parents: ['cl1', 'cl2'], type: 'both' },
            { id: 'cl5', message: 'Merge feature/b', author: 'Team', timestamp: Date.now() - 15000, branch: 'main', parents: ['cl4', 'cl3'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'cl5', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'cl5', color: '#65a3d5', isRemote: true },
            { name: 'feature/a', commitId: 'cl2', color: '#8b5cf6', isRemote: false },
            { name: 'origin/feature/a', commitId: 'cl2', color: '#8b5cf6', isRemote: true },
            { name: 'feature/b', commitId: 'cl3', color: '#10b981', isRemote: false },
            { name: 'origin/feature/b', commitId: 'cl3', color: '#10b981', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'cleanup-2',
        type: 'branch',
        description: '🧹 Delete local merged branches',
        gitCommand: 'git branch -d feature/a feature/b',
        beforeState: {
          commits: [
            { id: 'cl1', message: 'Initial codebase', author: 'Team', timestamp: Date.now() - 30000, branch: 'main', parents: [], type: 'both' },
            { id: 'cl2', message: 'Feature A complete', author: 'Dev1', timestamp: Date.now() - 25000, branch: 'feature/a', parents: ['cl1'], type: 'both' },
            { id: 'cl3', message: 'Feature B complete', author: 'Dev2', timestamp: Date.now() - 20000, branch: 'feature/b', parents: ['cl1'], type: 'both' },
            { id: 'cl4', message: 'Merge feature/a', author: 'Team', timestamp: Date.now() - 18000, branch: 'main', parents: ['cl1', 'cl2'], type: 'both' },
            { id: 'cl5', message: 'Merge feature/b', author: 'Team', timestamp: Date.now() - 15000, branch: 'main', parents: ['cl4', 'cl3'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'cl5', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'cl5', color: '#65a3d5', isRemote: true },
            { name: 'feature/a', commitId: 'cl2', color: '#8b5cf6', isRemote: false },
            { name: 'origin/feature/a', commitId: 'cl2', color: '#8b5cf6', isRemote: true },
            { name: 'feature/b', commitId: 'cl3', color: '#10b981', isRemote: false },
            { name: 'origin/feature/b', commitId: 'cl3', color: '#10b981', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'cl1', message: 'Initial codebase', author: 'Team', timestamp: Date.now() - 30000, branch: 'main', parents: [], type: 'both' },
            { id: 'cl2', message: 'Feature A complete', author: 'Dev1', timestamp: Date.now() - 25000, branch: 'main', parents: ['cl1'], type: 'both' },
            { id: 'cl3', message: 'Feature B complete', author: 'Dev2', timestamp: Date.now() - 20000, branch: 'main', parents: ['cl1'], type: 'both' },
            { id: 'cl4', message: 'Merge feature/a', author: 'Team', timestamp: Date.now() - 18000, branch: 'main', parents: ['cl1', 'cl2'], type: 'both' },
            { id: 'cl5', message: 'Merge feature/b', author: 'Team', timestamp: Date.now() - 15000, branch: 'main', parents: ['cl4', 'cl3'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'cl5', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'cl5', color: '#65a3d5', isRemote: true },
            { name: 'origin/feature/a', commitId: 'cl2', color: '#8b5cf6', isRemote: true },
            { name: 'origin/feature/b', commitId: 'cl3', color: '#10b981', isRemote: true }
          ],
          head: 'main'
        }
      },
      {
        id: 'cleanup-3',
        type: 'branch',
        description: '🧹 Delete remote branches - repository fully cleaned!',
        gitCommand: 'git push origin --delete feature/a',
        beforeState: {
          commits: [
            { id: 'cl1', message: 'Initial codebase', author: 'Team', timestamp: Date.now() - 30000, branch: 'main', parents: [], type: 'both' },
            { id: 'cl2', message: 'Feature A complete', author: 'Dev1', timestamp: Date.now() - 25000, branch: 'main', parents: ['cl1'], type: 'both' },
            { id: 'cl3', message: 'Feature B complete', author: 'Dev2', timestamp: Date.now() - 20000, branch: 'main', parents: ['cl1'], type: 'both' },
            { id: 'cl4', message: 'Merge feature/a', author: 'Team', timestamp: Date.now() - 18000, branch: 'main', parents: ['cl1', 'cl2'], type: 'both' },
            { id: 'cl5', message: 'Merge feature/b', author: 'Team', timestamp: Date.now() - 15000, branch: 'main', parents: ['cl4', 'cl3'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'cl5', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'cl5', color: '#65a3d5', isRemote: true },
            { name: 'origin/feature/a', commitId: 'cl2', color: '#8b5cf6', isRemote: true },
            { name: 'origin/feature/b', commitId: 'cl3', color: '#10b981', isRemote: true }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'cl1', message: 'Initial codebase', author: 'Team', timestamp: Date.now() - 30000, branch: 'main', parents: [], type: 'both' },
            { id: 'cl2', message: 'Feature A complete', author: 'Dev1', timestamp: Date.now() - 25000, branch: 'main', parents: ['cl1'], type: 'both' },
            { id: 'cl3', message: 'Feature B complete', author: 'Dev2', timestamp: Date.now() - 20000, branch: 'main', parents: ['cl1'], type: 'both' },
            { id: 'cl4', message: 'Merge feature/a', author: 'Team', timestamp: Date.now() - 18000, branch: 'main', parents: ['cl1', 'cl2'], type: 'both' },
            { id: 'cl5', message: 'Merge feature/b', author: 'Team', timestamp: Date.now() - 15000, branch: 'main', parents: ['cl4', 'cl3'], type: 'both' }
          ],
          branches: [
            { name: 'main', commitId: 'cl5', color: '#65a3d5', isRemote: false },
            { name: 'origin/main', commitId: 'cl5', color: '#65a3d5', isRemote: true }
          ],
          head: 'main'
        }
      }
    ]
  },
  {
    id: 'reflog-recovery',
    name: 'Reflog Time Travel',
    description: 'Use git reflog to recover lost commits and undo mistakes',
    difficulty: 'advanced',
    icon: 'time-machine',
    xpReward: 280,
    badge: {
      id: 'time-master',
      name: 'Time Master',
      description: 'Recovered lost work with reflog',
      icon: '⏰'
    },
    operations: [
      {
        id: 'reflog-1',
        type: 'commit',
        description: 'Working on important feature',
        gitCommand: 'git commit -m "Initial work"',
        beforeState: {
          commits: [],
          branches: [{ name: 'main', commitId: '', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rf1', message: 'Initial work', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'rf2', message: 'Add critical feature', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: ['rf1'], type: 'local' },
            { id: 'rf3', message: 'Important improvements', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['rf2'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rf3', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'reflog-2',
        type: 'commit',
        description: '💥 Oops! Accidentally reset --hard',
        gitCommand: 'git reset --hard HEAD~2 # Oops!',
        beforeState: {
          commits: [
            { id: 'rf1', message: 'Initial work', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'rf2', message: 'Add critical feature', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: ['rf1'], type: 'local' },
            { id: 'rf3', message: 'Important improvements', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['rf2'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rf3', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rf1', message: 'Initial work', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rf1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      },
      {
        id: 'reflog-3',
        type: 'commit',
        description: '⏰ Use git reflog to find lost commits',
        gitCommand: 'git reflog',
        beforeState: {
          commits: [
            { id: 'rf1', message: 'Initial work', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rf1', color: '#65a3d5', isRemote: false }],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rf1', message: 'Initial work', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'rf2', message: 'Add critical feature', author: 'You', timestamp: Date.now() - 20000, branch: 'reflog-found', parents: ['rf1'], type: 'local' },
            { id: 'rf3', message: 'Important improvements', author: 'You', timestamp: Date.now() - 15000, branch: 'reflog-found', parents: ['rf2'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rf1', color: '#65a3d5', isRemote: false },
            { name: 'reflog-found', commitId: 'rf3', color: '#10b981', isRemote: false }
          ],
          head: 'main'
        }
      },
      {
        id: 'reflog-4',
        type: 'commit',
        description: '✅ Restore work - crisis averted!',
        gitCommand: 'git reset --hard HEAD@{1} # Recovered!',
        beforeState: {
          commits: [
            { id: 'rf1', message: 'Initial work', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'rf2', message: 'Add critical feature', author: 'You', timestamp: Date.now() - 20000, branch: 'reflog-found', parents: ['rf1'], type: 'local' },
            { id: 'rf3', message: 'Important improvements', author: 'You', timestamp: Date.now() - 15000, branch: 'reflog-found', parents: ['rf2'], type: 'local' }
          ],
          branches: [
            { name: 'main', commitId: 'rf1', color: '#65a3d5', isRemote: false },
            { name: 'reflog-found', commitId: 'rf3', color: '#10b981', isRemote: false }
          ],
          head: 'main'
        },
        afterState: {
          commits: [
            { id: 'rf1', message: 'Initial work', author: 'You', timestamp: Date.now() - 25000, branch: 'main', parents: [], type: 'local' },
            { id: 'rf2', message: 'Add critical feature', author: 'You', timestamp: Date.now() - 20000, branch: 'main', parents: ['rf1'], type: 'local' },
            { id: 'rf3', message: 'Important improvements', author: 'You', timestamp: Date.now() - 15000, branch: 'main', parents: ['rf2'], type: 'local' }
          ],
          branches: [{ name: 'main', commitId: 'rf3', color: '#65a3d5', isRemote: false }],
          head: 'main'
        }
      }
    ]
  }
]

export const getScenarioById = (id: string) => scenarios.find(s => s.id === id)

export const calculateLevel = (totalXp: number): number => {
  return Math.floor(Math.sqrt(totalXp / 100)) + 1
}

export const getXpForNextLevel = (currentLevel: number): number => {
  return (currentLevel * currentLevel) * 100
}