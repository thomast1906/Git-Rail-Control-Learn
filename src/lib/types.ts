export type CommitNode = {
  id: string
  message: string
  author: string
  timestamp: number
  branch: string
  parents: string[]
  x?: number
  y?: number
  type: 'local' | 'remote' | 'both'
}

export type Branch = {
  name: string
  commitId: string
  color: string
  isRemote: boolean
}

export type GitOperation = {
  id: string
  type: 'commit' | 'branch' | 'merge' | 'cherry-pick' | 'revert' | 'push' | 'pull' | 'force-push'
  description: string
  gitCommand?: string
  beforeState: GitState
  afterState: GitState
}

export type GitState = {
  commits: CommitNode[]
  branches: Branch[]
  head: string
}

export type Scenario = {
  id: string
  name: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  icon: string
  operations: GitOperation[]
  xpReward: number
  badge?: Badge
}

export type Badge = {
  id: string
  name: string
  description: string
  icon: string
  earnedAt?: number
}

export type UserProgress = {
  level: number
  xp: number
  totalXp: number
  completedScenarios: string[]
  badges: Badge[]
}

export type MissionLog = {
  timestamp: number
  scenarioId: string
  action: string
  xpEarned: number
}
