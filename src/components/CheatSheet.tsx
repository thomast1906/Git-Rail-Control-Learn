import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GitBranch, ArrowCounterClockwise, Package, CloudArrowUp } from '@phosphor-icons/react'

type CheatSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type CommandItem = {
  command: string
  description: string
  example: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export function CheatSheet({ open, onOpenChange }: CheatSheetProps) {
  const basicCommands: CommandItem[] = [
    {
      command: 'git status',
      description: '🚦 Shows your current yard status - what files have changed',
      example: 'git status',
      difficulty: 'beginner'
    },
    {
      command: 'git add',
      description: '📦 Stage files for the next dispatch (commit)',
      example: 'git add filename.txt',
      difficulty: 'beginner'
    },
    {
      command: 'git commit',
      description: '📝 Creates a snapshot - like locking in today\'s switch list',
      example: 'git commit -m "Add navigation module"',
      difficulty: 'beginner'
    },
    {
      command: 'git log',
      description: '📋 Shows the history of commits - your dispatch log',
      example: 'git log --oneline',
      difficulty: 'beginner'
    },
    {
      command: 'git diff',
      description: '🔍 Shows changes between commits or branches',
      example: 'git diff main feature',
      difficulty: 'beginner'
    }
  ]

  const branchingCommands: CommandItem[] = [
    {
      command: 'git branch',
      description: '🌳 Creates a new parallel track for safe experimentation',
      example: 'git branch feature-login',
      difficulty: 'beginner'
    },
    {
      command: 'git checkout',
      description: '🚂 Moves to a different branch - shifting to another track',
      example: 'git checkout feature-login',
      difficulty: 'beginner'
    },
    {
      command: 'git checkout -b',
      description: '✨ Creates and switches to a new branch in one move',
      example: 'git checkout -b hotfix-bug',
      difficulty: 'beginner'
    },
    {
      command: 'git merge',
      description: '🤝 Couples changes from another branch into yours',
      example: 'git merge feature-login',
      difficulty: 'intermediate'
    },
    {
      command: 'git branch -d',
      description: '🗑️ Deletes a branch after it\'s been merged',
      example: 'git branch -d feature-login',
      difficulty: 'beginner'
    }
  ]

  const remoteCommands: CommandItem[] = [
    {
      command: 'git clone',
      description: '📥 Downloads a complete copy of a repository',
      example: 'git clone https://github.com/user/repo.git',
      difficulty: 'beginner'
    },
    {
      command: 'git push',
      description: '⬆️ Uploads your changes to the central depot',
      example: 'git push origin main',
      difficulty: 'beginner'
    },
    {
      command: 'git pull',
      description: '⬇️ Brings down new changes from the depot',
      example: 'git pull origin main',
      difficulty: 'beginner'
    },
    {
      command: 'git fetch',
      description: '🔄 Downloads remote changes without merging',
      example: 'git fetch origin',
      difficulty: 'intermediate'
    },
    {
      command: 'git remote',
      description: '🌐 Manages connections to remote depots',
      example: 'git remote add origin <url>',
      difficulty: 'beginner'
    }
  ]

  const advancedCommands: CommandItem[] = [
    {
      command: 'git rebase',
      description: '⏰ Replays commits on top of another branch for linear history',
      example: 'git rebase main',
      difficulty: 'advanced'
    },
    {
      command: 'git cherry-pick',
      description: '🍒 Applies one specific commit to your current branch',
      example: 'git cherry-pick abc123',
      difficulty: 'intermediate'
    },
    {
      command: 'git stash',
      description: '🎒 Parks uncommitted work on a side track temporarily',
      example: 'git stash save "WIP feature"',
      difficulty: 'intermediate'
    },
    {
      command: 'git revert',
      description: '↩️ Undoes a commit by creating a correcting commit',
      example: 'git revert HEAD',
      difficulty: 'intermediate'
    },
    {
      command: 'git reset',
      description: '⚠️ Moves to a different commit (use with caution)',
      example: 'git reset --soft HEAD~1',
      difficulty: 'advanced'
    },
    {
      command: 'git tag',
      description: '🏷️ Creates a permanent marker - great for releases',
      example: 'git tag v1.0.0',
      difficulty: 'intermediate'
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-blue-500/20 text-blue-700 border-blue-500/40'
      case 'intermediate':
        return 'bg-amber-500/20 text-amber-700 border-amber-500/40'
      case 'advanced':
        return 'bg-red-500/20 text-red-700 border-red-500/40'
      default:
        return 'bg-gray-500/20 text-gray-700 border-gray-500/40'
    }
  }

  const renderCommandList = (commands: CommandItem[]) => (
    <div className="space-y-3">
      {commands.map((cmd, index) => (
        <Card key={index} className="p-4 hover:bg-accent/5 transition-colors">
          <div className="flex items-start justify-between gap-3 mb-2">
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded flex-1">
              {cmd.command}
            </code>
            <Badge variant="outline" className={getDifficultyColor(cmd.difficulty)}>
              {cmd.difficulty}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{cmd.description}</p>
          <div className="bg-muted/50 px-3 py-2 rounded text-xs font-mono text-foreground/80">
            {cmd.example}
          </div>
        </Card>
      ))}
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-panel glow-border max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <GitBranch size={28} weight="fill" className="text-secondary" />
            Git Command Cheat Sheet
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4 rail-panel">
            <TabsTrigger value="basic" className="gap-1.5">
              <Package size={16} />
              <span className="hidden sm:inline">Basics</span>
            </TabsTrigger>
            <TabsTrigger value="branching" className="gap-1.5">
              <GitBranch size={16} />
              <span className="hidden sm:inline">Branching</span>
            </TabsTrigger>
            <TabsTrigger value="remote" className="gap-1.5">
              <CloudArrowUp size={16} />
              <span className="hidden sm:inline">Remote</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="gap-1.5">
              <ArrowCounterClockwise size={16} />
              <span className="hidden sm:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(85vh-180px)] mt-4">
            <TabsContent value="basic" className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-blue-700 mb-1">🚂 Everyday Commands</p>
                <p className="text-sm text-muted-foreground">
                  These are your daily operations - checking status, staging files, and recording commits.
                </p>
              </div>
              {renderCommandList(basicCommands)}
            </TabsContent>

            <TabsContent value="branching" className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-green-700 mb-1">🌳 Parallel Tracks</p>
                <p className="text-sm text-muted-foreground">
                  Work safely on new features by creating side tracks (branches) that don't affect the main line.
                </p>
              </div>
              {renderCommandList(branchingCommands)}
            </TabsContent>

            <TabsContent value="remote" className="space-y-4">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-purple-700 mb-1">☁️ Central Depot</p>
                <p className="text-sm text-muted-foreground">
                  Collaborate with your team by syncing changes with remote repositories.
                </p>
              </div>
              {renderCommandList(remoteCommands)}
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-orange-700 mb-1">⚡ Power Moves</p>
                <p className="text-sm text-muted-foreground">
                  Advanced techniques for rewriting history, cherry-picking commits, and time travel.
                </p>
              </div>
              {renderCommandList(advancedCommands)}
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            💡 Tip: Try these commands in the Training Simulator tab!
          </p>
          <Badge variant="secondary" className="gap-1">
            <span>{basicCommands.length + branchingCommands.length + remoteCommands.length + advancedCommands.length}</span>
            <span className="text-xs">commands</span>
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  )
}
