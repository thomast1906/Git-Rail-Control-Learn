import { useState, useEffect, useRef } from 'react'
import { useHybridStorage } from '@/hooks/use-browser-storage'
import { Toaster, toast } from 'sonner'
import { GitGraph } from '@/components/GitGraph'
import { ProgressPanel } from '@/components/ProgressPanel'
import { Celebration } from '@/components/Celebration'
import { ScenarioSelector } from '@/components/ScenarioSelector'
import { PlaybackControls } from '@/components/PlaybackControls'
import { MissionLog } from '@/components/MissionLog'
import { WelcomeModal } from '@/components/WelcomeModal'
import { CheatSheet } from '@/components/CheatSheet'
import { UserProgress, Scenario, GitState, MissionLog as MissionLogType, CommitNode, Badge as BadgeType } from '@/lib/types'
import { scenarios, calculateLevel, getXpForNextLevel } from '@/lib/scenarios'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { TrainSimple, ChartLine, BookOpen, TrashSimple, CopySimple, Question, GitBranch, GithubLogo, Book } from '@phosphor-icons/react'

const SCROLL_DELAY_MS = 150 // Delay to ensure route view is rendered before scrolling

function App() {
  const routeViewRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useHybridStorage<UserProgress>('user-progress', {
    level: 1,
    xp: 0,
    totalXp: 0,
    completedScenarios: [],
    badges: []
  })

  const [missionLogs, setMissionLogs] = useHybridStorage<MissionLogType[]>('mission-logs', [])
  
  const [selectedScenario, setSelectedScenario] = useState<Scenario | undefined>()
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gitState, setGitState] = useState<GitState>({
    commits: [],
    branches: [],
    head: 'main'
  })

  const activeBranch = gitState.branches.find(b => b.name === gitState.head)
  const activeCommitId = activeBranch?.commitId || gitState.commits[gitState.commits.length - 1]?.id

  const [celebration, setCelebration] = useState<{
    isOpen: boolean
    badge?: BadgeType
    xpEarned?: number
    levelUp?: boolean
    newLevel?: number
  }>({
    isOpen: false
  })

  const [welcomeOpen, setWelcomeOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false)

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('git-rail-welcome-seen')
    if (!hasSeenWelcome) {
      setWelcomeOpen(true)
    }
  }, [])

  const handleWelcomeClose = () => {
    setWelcomeOpen(false)
    localStorage.setItem('git-rail-welcome-seen', 'true')
  }

  useEffect(() => {
    if (isPlaying && selectedScenario) {
      const timer = setInterval(() => {
        if (currentStep < selectedScenario.operations.length - 1) {
          handleStepChange(currentStep + 1)
        } else {
          setIsPlaying(false)
        }
      }, 2000)
      return () => clearInterval(timer)
    }
  }, [isPlaying, currentStep, selectedScenario])

  useEffect(() => {
    if (selectedScenario && selectedScenario.operations.length > 0) {
      const operation = selectedScenario.operations[currentStep]
      if (operation) {
        setGitState(operation.afterState)
      }
    }
  }, [selectedScenario, currentStep])

  const handleSelectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario)
    setCurrentStep(0)
    setIsPlaying(false)
    
    if (scenario.operations.length > 0) {
      setGitState(scenario.operations[0].beforeState)
    } else {
      setGitState({
        commits: [],
        branches: [{ name: 'main', commitId: '', color: '#65a3d5', isRemote: false }],
        head: 'main'
      })
    }

    // Scroll to route view after selection
    setTimeout(() => {
      routeViewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, SCROLL_DELAY_MS)
  }

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  const currentCommand = selectedScenario?.operations[currentStep]?.gitCommand
  const activeStepInfo = selectedScenario
    ? {
        description: selectedScenario.operations[currentStep]?.description,
        step: currentStep + 1,
        total: selectedScenario.operations.length
      }
    : undefined

  const handleCompleteScenario = () => {
    if (!selectedScenario || selectedScenario.xpReward === 0) return
    
    setProgress((current) => {
      const alreadyCompleted = (current?.completedScenarios || []).includes(selectedScenario.id)
      if (alreadyCompleted) {
        toast.info('Route already completed!', {
          description: 'Try a new route to earn more TP'
        })
        return current || {
          level: 1,
          xp: 0,
          totalXp: 0,
          completedScenarios: [],
          badges: []
        }
      }

      const oldLevel = current?.level || 1
      const newTotalXp = (current?.totalXp || 0) + selectedScenario.xpReward
      const newLevel = calculateLevel(newTotalXp)
      const xpForNext = getXpForNextLevel(newLevel)
      const newXp = newTotalXp % xpForNext
      const leveledUp = newLevel > oldLevel

      const newBadges = [...(current?.badges || [])]
      if (selectedScenario.badge && !newBadges.find(b => b.id === selectedScenario.badge?.id)) {
        newBadges.push({
          ...selectedScenario.badge,
          earnedAt: Date.now()
        })
      }

      setMissionLogs((currentLogs) => [
        ...(currentLogs || []),
        {
          timestamp: Date.now(),
          scenarioId: selectedScenario.id,
          action: `Completed ${selectedScenario.name}`,
          xpEarned: selectedScenario.xpReward
        }
      ])

      setCelebration({
        isOpen: true,
        badge: selectedScenario.badge,
        xpEarned: selectedScenario.xpReward,
        levelUp: leveledUp,
        newLevel: leveledUp ? newLevel : undefined
      })

      toast.success('Route logged! 🎉', {
        description: `Recorded ${selectedScenario.xpReward} TP`
      })

      return {
        level: newLevel,
        xp: newXp,
        totalXp: newTotalXp,
        completedScenarios: [...(current?.completedScenarios || []), selectedScenario.id],
        badges: newBadges
      }
    })
  }

  const handleExportLog = () => {
    const exportData = {
      progress,
      missionLogs,
      exportedAt: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rail-dispatch-log-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)

    toast.success('Dispatch log exported!')
  }

  const handleCommitClick = (commit: CommitNode) => {
    toast.info(`Commit: ${commit.message}`, {
      description: `Author: ${commit.author} | Branch: ${commit.branch}`
    })
  }

  const handleCopyCommand = async () => {
    if (!currentCommand) return
    try {
      await navigator.clipboard?.writeText(currentCommand)
      toast.success('Command copied')
    } catch {
      toast.error('Unable to copy command')
    }
  }

  const handleResetProgress = () => {
    setProgress(() => ({
      level: 1,
      xp: 0,
      totalXp: 0,
      completedScenarios: [],
      badges: []
    }))
    setMissionLogs(() => [])
    toast.success('Progress reset successfully', {
      description: 'Your logs and certifications have been cleared'
    })
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[oklch(0.98_0.015_250)] via-[oklch(0.96_0.01_240)] to-[oklch(0.94_0.008_240)]">
      <div className="rail-grid" aria-hidden />

      <div className="relative z-10 container mx-auto px-4 py-8 space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary/20">
              <TrainSimple size={32} weight="fill" className="text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Git Rail Control</h1>
              <p className="text-muted-foreground">Branch Operations Center</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => setCheatSheetOpen(true)}
            >
              <Book size={18} weight="fill" />
              <span className="hidden sm:inline">Cheat Sheet</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => setHelpOpen(true)}
            >
              <Question size={18} weight="fill" />
              <span className="hidden sm:inline">Help</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              asChild
            >
              <a href="https://github.com/thomast1906/git-galaxy-explorer/issues" target="_blank" rel="noopener noreferrer">
                <GithubLogo size={18} weight="fill" />
                <span className="hidden sm:inline">Feedback</span>
              </a>
            </Button>
            <div className="hidden md:block">
              <ProgressPanel progress={progress || {
                level: 1,
                xp: 0,
                totalXp: 0,
                completedScenarios: [],
                badges: []
              }} />
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-destructive hover:text-destructive"
                >
                  <TrashSimple size={16} />
                  Reset
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rail-panel">
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset All Progress?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your certifications, TP, completed routes, and dispatch logs. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleResetProgress}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Reset Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </header>

        <Tabs defaultValue="missions" className="space-y-6">
          <TabsList className="rail-panel">
            <TabsTrigger value="missions" className="gap-2">
              <TrainSimple size={18} />
              Routes
            </TabsTrigger>
            <TabsTrigger value="progress" className="gap-2">
              <ChartLine size={18} />
              Operator Stats
            </TabsTrigger>
            <TabsTrigger value="log" className="gap-2">
              <BookOpen size={18} />
              Dispatch Log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="missions" className="space-y-6">
            <ScenarioSelector
              scenarios={scenarios}
              selectedScenario={selectedScenario}
              onSelectScenario={handleSelectScenario}
              completedScenarios={progress?.completedScenarios || []}
            />

            {selectedScenario && selectedScenario.operations.length > 0 && (
              <div ref={routeViewRef}>
                <Card className="glass-panel sticky top-4 z-20 p-4 md:p-5 mb-4 flex flex-col gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                  <div className="flex flex-wrap items-center gap-3 text-sm leading-relaxed">
                    <span className="font-semibold text-secondary">Step {currentStep + 1} of {selectedScenario.operations.length}</span>
                    <span className="text-muted-foreground">{selectedScenario.operations[currentStep]?.description}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground uppercase tracking-[0.08em]">Command</span>
                    <span className="flex items-center gap-2 font-mono text-[13px] bg-white/60 backdrop-blur border border-border/70 shadow-sm text-foreground px-2.5 py-1.5 rounded-lg">
                      {selectedScenario.operations[currentStep]?.gitCommand || 'N/A'}
                      {currentCommand && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-1 h-8 px-2 text-xs border border-border/70 bg-white/70 hover:bg-white"
                          onClick={handleCopyCommand}
                          aria-label="Copy command"
                        >
                          <CopySimple size={12} />
                          <span className="hidden sm:inline">Copy</span>
                        </Button>
                      )}
                    </span>
                  </div>
                </Card>
                <PlaybackControls
                  currentStep={currentStep}
                  totalSteps={selectedScenario.operations.length}
                  isPlaying={isPlaying}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onStepChange={handleStepChange}
                  onPrevious={() => handleStepChange(Math.max(0, currentStep - 1))}
                  onNext={() => handleStepChange(Math.min(selectedScenario.operations.length - 1, currentStep + 1))}
                  operationDescription={selectedScenario.operations[currentStep]?.description}
                  gitCommand={selectedScenario.operations[currentStep]?.gitCommand}
                />

                <Card className="rail-panel p-5 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl">{selectedScenario.name}</h3>
                    <Button
                      onClick={handleCompleteScenario}
                      className="bg-accent hover:bg-accent/90"
                      disabled={(progress?.completedScenarios || []).includes(selectedScenario.id) || currentStep !== selectedScenario.operations.length - 1}
                      title={currentStep !== selectedScenario.operations.length - 1 ? 'Finish the final step to log this route' : undefined}
                    >
                      {(progress?.completedScenarios || []).includes(selectedScenario.id) ? '✓ Logged' : 'Mark Route Complete'}
                    </Button>
                  </div>
                  <div className="h-[600px]">
                    <GitGraph
                      gitState={gitState}
                      activeCommitId={activeCommitId}
                      activeStepInfo={activeStepInfo}
                      onCommitClick={handleCommitClick}
                    />
                  </div>
                </Card>

              </div>
            )}

            {selectedScenario && selectedScenario.operations.length === 0 && (
                <Card className="rail-panel p-12 text-center space-y-4">
                <div className="text-6xl">🚧</div>
                <h3 className="text-2xl font-bold">Coming Soon!</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This route is under construction. More routes will be available soon.
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProgressPanel progress={progress || {
                level: 1,
                xp: 0,
                totalXp: 0,
                completedScenarios: [],
                badges: []
              }} />
              
              <Card className="rail-panel p-6 space-y-4">
                    <h3 className="font-bold text-xl">Operator Certifications</h3>
                {(progress?.badges || []).length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground bg-muted/40 border border-border/70 rounded-xl">
                    <div className="text-6xl mb-3">🏆</div>
                    <p>No certifications yet</p>
                    <p className="text-sm">Complete routes to earn badges.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {(progress?.badges || []).map((badge) => (
                      <Card key={badge.id} className="p-4 text-center space-y-2 bg-muted/30">
                        <div className="text-5xl">{badge.icon}</div>
                        <h4 className="font-semibold text-sm">{badge.name}</h4>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="log">
            <MissionLog 
              logs={missionLogs || []} 
              onExport={handleExportLog}
            />
          </TabsContent>
        </Tabs>
      </div>

      <Celebration
        isOpen={celebration.isOpen}
        onClose={() => setCelebration({ isOpen: false })}
        badge={celebration.badge}
        xpEarned={celebration.xpEarned}
        levelUp={celebration.levelUp}
        newLevel={celebration.newLevel}
      />

      <WelcomeModal open={welcomeOpen} onClose={handleWelcomeClose} />

      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="glass-panel glow-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Question size={28} weight="fill" className="text-accent" />
              How to Use Git Rail Control
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <GitBranch size={20} className="text-secondary" />
                What is Git Rail Control?
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                An interactive Git learning platform where you visualize and understand Git workflows through hands-on scenarios. Think of it as a dispatch control center for managing code branches.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <TrainSimple size={20} className="text-secondary" />
                Routes (Scenarios)
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Each route teaches a specific Git workflow. Click any route card to see it visualized step-by-step. Use playback controls to navigate through commands and watch the Git graph update in real-time.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <ChartLine size={20} className="text-accent" />
                Training Points (TP)
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                TP measure your progress. Complete routes to earn TP and level up. Track your completed routes, earned badges, and overall progress in the "Operator Stats" tab.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <BookOpen size={20} className="text-primary" />
                Dispatch Log
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Your activity history. View all completed routes, timestamps, and TP earned. Export your log anytime to keep a backup of your progress.
              </p>
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-4">
              <p className="text-sm font-medium text-accent mb-2">💡 Pro Tips:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Start with beginner routes (blue border on cards)</li>
                <li>Click "Explain Simply" for kid-friendly explanations</li>
                <li>Copy commands from the sticky status card to practice</li>
                <li>Your progress saves automatically in your browser</li>
                <li>Completed routes show with a green background and checkmark</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => setHelpOpen(false)}>Got it!</Button>
          </div>
        </DialogContent>
      </Dialog>
      <CheatSheet open={cheatSheetOpen} onOpenChange={setCheatSheetOpen} />
      <Toaster position="top-right" theme="dark" />
    </div>
  )
}

export default App