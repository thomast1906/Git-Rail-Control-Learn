import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Terminal, Sparkle, CheckCircle, XCircle, Play } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { GitState } from '@/lib/types'
import { GitGraph } from '@/components/GitGraph'
import { validateGitCommandFallback, getFallbackCommandExplanation } from '@/lib/ai-fallback'

interface TrainingSimulatorProps {
  onCommandExecuted?: (command: string, newState: GitState) => void
}

export function TrainingSimulator({ onCommandExecuted }: TrainingSimulatorProps) {
  const [command, setCommand] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [commandHistory, setCommandHistory] = useState<Array<{
    command: string
    isValid: boolean
    explanation: string
    timestamp: number
  }>>([])
  const [gitState, setGitState] = useState<GitState>({
    commits: [
      { id: 'init', message: 'Initial commit', author: 'You', timestamp: Date.now() - 5000, branch: 'main', parents: [], type: 'local' }
    ],
    branches: [{ name: 'main', commitId: 'init', color: '#65a3d5', isRemote: false }],
    head: 'main'
  })

  // Simple fallback Git state simulator for common commands
  const simulateGitCommandFallback = (cmd: string, commandType: string, currentState: GitState): GitState => {
    const parts = cmd.trim().split(/\s+/)
    
    // Helper to generate unique commit ID
    const generateCommitId = () => `c${currentState.commits.length + 1}`
    
    switch (commandType) {
      case 'commit': {
        const messageMatch = cmd.match(/-m\s+["'](.+?)["']/)
        const message = messageMatch ? messageMatch[1] : 'Commit changes'
        const newCommit = {
          id: generateCommitId(),
          message,
          author: 'You',
          timestamp: Date.now(),
          branch: currentState.head,
          parents: [currentState.commits[currentState.commits.length - 1]?.id || ''],
          type: 'local' as const
        }
        return {
          ...currentState,
          commits: [...currentState.commits, newCommit]
        }
      }
      
      case 'branch': {
        const branchName = parts[2]
        if (branchName && !currentState.branches.find(b => b.name === branchName)) {
          const lastCommit = currentState.commits[currentState.commits.length - 1]
          return {
            ...currentState,
            branches: [...currentState.branches, {
              name: branchName,
              commitId: lastCommit?.id || 'init',
              color: '#8b5cf6',
              isRemote: false
            }]
          }
        }
        return currentState
      }
      
      case 'checkout': {
        const branchName = parts[2] === '-b' ? parts[3] : parts[2]
        if (branchName) {
          const baseState = { ...currentState, head: branchName }
          
          // If -b flag, create the branch first
          if (parts[2] === '-b' && !currentState.branches.find(b => b.name === branchName)) {
            const lastCommit = currentState.commits[currentState.commits.length - 1]
            return {
              ...baseState,
              branches: [...currentState.branches, {
                name: branchName,
                commitId: lastCommit?.id || 'init',
                color: '#8b5cf6',
                isRemote: false
              }]
            }
          }
          
          return baseState
        }
        return currentState
      }
      
      default:
        return currentState
    }
  }

  const handleExecuteCommand = async () => {
    if (!command.trim()) {
      toast.error('Please enter a git command')
      return
    }

    setIsProcessing(true)

    try {
      // Validate command using pattern matching
      const validation = validateGitCommandFallback(command)

      if (!validation.isValid) {
        setCommandHistory(prev => [...prev, {
          command,
          isValid: false,
          explanation: validation.error || 'Invalid command',
          timestamp: Date.now()
        }])
        toast.error('Invalid command', {
          description: validation.error
        })
        setCommand('')
        setIsProcessing(false)
        return
      }

      // Simulate Git state changes
      const newState = simulateGitCommandFallback(command, validation.commandType, gitState)

      setGitState(newState)
      
      setCommandHistory(prev => [...prev, {
        command,
        isValid: true,
        explanation: validation.explanation,
        timestamp: Date.now()
      }])

      toast.success('Command executed!', {
        description: validation.explanation
      })

      onCommandExecuted?.(command, newState)
      setCommand('')
    } catch (error) {
      console.error('Error processing command:', error)
      toast.error('Error processing command', {
        description: 'Please try again or check your command syntax'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleExecuteCommand()
    }
  }

  const handleGetHelp = async () => {
    if (!command.trim()) {
      toast.error('Please enter a command first')
      return
    }

    setIsProcessing(true)

    try {
      // Get command explanation
      const helpText = getFallbackCommandExplanation(command)

      toast.info('Command Help', {
        description: helpText,
        duration: 10000
      })
    } catch (error) {
      console.error('Error getting help:', error)
      toast.error('Error getting help')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="glass-panel p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/20">
            <Terminal size={24} weight="fill" className="text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-xl">Training Simulator</h3>
            <p className="text-sm text-muted-foreground">
              Practice any git command with AI-powered validation and visualization
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="git commit -m 'your message'"
                className="font-mono"
                disabled={isProcessing}
              />
            </div>
            <Button
              onClick={handleExecuteCommand}
              disabled={isProcessing || !command.trim()}
              className="bg-accent hover:bg-accent/90"
            >
              {isProcessing ? (
                <>
                  <Sparkle className="animate-spin" size={18} />
                  Processing
                </>
              ) : (
                <>
                  <Play size={18} weight="fill" />
                  Execute
                </>
              )}
            </Button>
            <Button
              onClick={handleGetHelp}
              disabled={isProcessing || !command.trim()}
              variant="outline"
            >
              <Sparkle size={18} />
              AI Help
            </Button>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">Examples:</Badge>
            <button
              onClick={() => setCommand('git commit -m "Add new feature"')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              git commit
            </button>
            <button
              onClick={() => setCommand('git branch feature/new-module')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              git branch
            </button>
            <button
              onClick={() => setCommand('git merge feature/new-module')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              git merge
            </button>
            <button
              onClick={() => setCommand('git checkout -b hotfix/bug-fix')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              git checkout
            </button>
          </div>
        </div>
      </Card>

      <Card className="glass-panel p-6">
        <h4 className="font-bold text-lg mb-4">Visual Git Graph</h4>
        <div className="h-[500px]">
          <GitGraph gitState={gitState} />
        </div>
      </Card>

      {commandHistory.length > 0 && (
        <Card className="glass-panel p-6 space-y-3">
          <h4 className="font-bold text-lg">Command History</h4>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {commandHistory.slice().reverse().map((entry) => (
              <div
                key={entry.timestamp}
                className={`p-3 rounded-lg border ${
                  entry.isValid
                    ? 'bg-secondary/10 border-secondary/30'
                    : 'bg-destructive/10 border-destructive/30'
                }`}
              >
                <div className="flex items-start gap-2">
                  {entry.isValid ? (
                    <CheckCircle size={20} weight="fill" className="text-secondary flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle size={20} weight="fill" className="text-destructive flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <code className="text-sm font-mono block break-all">
                      {entry.command}
                    </code>
                    <p className="text-xs text-muted-foreground mt-1">
                      {entry.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
