import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CommitNode, GitState } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GitBranch, GitCommit, GitMerge } from '@phosphor-icons/react'

type GitGraphProps = {
  gitState: GitState
  onCommitClick?: (commit: CommitNode) => void
  activeCommitId?: string
  activeStepInfo?: {
    description?: string
    step: number
    total: number
  }
}

// Constants for commit message positioning and sizing
const COMMIT_MESSAGE_WIDTH = 300
const COMMIT_MESSAGE_MAX_WIDTH = 280
const COMMIT_MESSAGE_HEIGHT = 40
const COMMIT_MESSAGE_OFFSET_X = 150 // Half of width for centering
const COMMIT_MESSAGE_OFFSET_Y = 50

export function GitGraph({ gitState, onCommitClick, activeCommitId, activeStepInfo }: GitGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedCommit, setSelectedCommit] = useState<CommitNode | null>(null)
  const [positions, setPositions] = useState<Map<string, { x: number; y: number }>>(new Map())

  const branchColorMap: Record<string, string> = {
    main: '#2563eb',
    develop: '#0ea5e9',
    'origin/main': '#1d4ed8',
    'origin/develop': '#0284c7',
    hotfix: '#ef4444',
    'hotfix/critical-security': '#ef4444',
    'hotfix/security-patch': '#ef4444',
    release: '#22c55e',
    feature: '#eab308',
    'origin/feature': '#eab308',
    stash: '#f59e0b',
    'bisect-bad': '#ef4444',
    'bisect-good': '#22c55e',
    culprit: '#f59e0b',
    'v1.0.0': '#f59e0b',
    'v1.1.0': '#f59e0b'
  }

  const normalizeBranchKey = (branchName: string) => {
    if (branchColorMap[branchName]) return branchName
    if (branchName.startsWith('origin/feature')) return 'feature'
    if (branchName.startsWith('feature/')) return 'feature'
    if (branchName.startsWith('release')) return 'release'
    if (branchName.startsWith('hotfix')) return 'hotfix'
    if (branchName.startsWith('develop')) return 'develop'
    if (branchName.startsWith('origin/main')) return 'origin/main'
    if (branchName.startsWith('origin/develop')) return 'origin/develop'
    if (branchName.startsWith('stash')) return 'stash'
    if (branchName.startsWith('bisect-bad')) return 'bisect-bad'
    if (branchName.startsWith('bisect-good')) return 'bisect-good'
    if (branchName.startsWith('main')) return 'main'
    return branchName
  }

  useEffect(() => {
    const newPositions = new Map<string, { x: number; y: number }>()
    const branchLanes = new Map<string, number>()
    let laneCounter = 0

    gitState.commits.forEach((commit, index) => {
      if (!branchLanes.has(commit.branch)) {
        branchLanes.set(commit.branch, laneCounter++)
      }

      const lane = branchLanes.get(commit.branch) || 0
      newPositions.set(commit.id, {
        x: 100 + lane * 150,
        y: 100 + index * 100
      })
    })

    setPositions(newPositions)
  }, [gitState])

  const handleCommitClick = (commit: CommitNode) => {
    setSelectedCommit(commit)
    onCommitClick?.(commit)
  }

  const renderConnections = () => {
    const lines: React.ReactElement[] = []

    gitState.commits.forEach((commit) => {
      const commitPos = positions.get(commit.id)
      if (!commitPos) return

      commit.parents.forEach((parentId) => {
        const parentPos = positions.get(parentId)
        if (!parentPos) return

        const isMerge = commit.parents.length > 1

        lines.push(
          <motion.line
            key={`${commit.id}-${parentId}`}
            x1={commitPos.x}
            y1={commitPos.y}
            x2={parentPos.x}
            y2={parentPos.y}
            className="orbit-line"
            stroke={isMerge ? 'url(#mergeGradient)' : 'url(#gradient)'}
            strokeWidth={isMerge ? 3 : 2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        )
      })
    })

    return lines
  }

  const getCommitIcon = (commit: CommitNode) => {
    if (commit.parents.length > 1) {
      return <GitMerge size={20} weight="bold" />
    }
    if (commit.parents.length === 0) {
      return <GitBranch size={20} weight="bold" />
    }
    return <GitCommit size={20} weight="bold" />
  }

  const getCommitColor = (commit: CommitNode) => {
    const branch = gitState.branches.find(b => b.name === commit.branch)
    return getBranchColor(commit.branch, branch?.color)
  }

  const getBranchColor = (branchName: string, fallback?: string) => {
    const key = normalizeBranchKey(branchName)
    return branchColorMap[key] || fallback || '#65a3d5'
  }

  return (
    <div className="relative w-full h-full overflow-auto">
      <svg
        ref={svgRef}
        className="w-full h-full min-h-[600px]"
        style={{ minWidth: `${Math.max(600, gitState.branches.length * 200)}px` }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.65 0.15 200)" stopOpacity={0.6} />
            <stop offset="100%" stopColor="oklch(0.55 0.18 290)" stopOpacity={0.3} />
          </linearGradient>
          <linearGradient id="mergeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.72 0.18 50)" stopOpacity={0.8} />
            <stop offset="100%" stopColor="oklch(0.65 0.15 200)" stopOpacity={0.6} />
          </linearGradient>
        </defs>

        {renderConnections()}

        {gitState.commits.map((commit) => {
          const pos = positions.get(commit.id)
          if (!pos) return null

          const isHead = gitState.branches.some(b => b.commitId === commit.id && b.name === gitState.head)
          const isActive = activeCommitId === commit.id
          const commitColor = getCommitColor(commit)
          const titleText = isActive && activeStepInfo
            ? `Step ${activeStepInfo.step}/${activeStepInfo.total} – ${activeStepInfo.description || commit.message}`
            : commit.message

          return (
            <g key={commit.id}>
              {isActive && (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isHead ? 34 : 30}
                  fill="none"
                  stroke="oklch(0.72 0.18 50)"
                  strokeWidth={2.5}
                  animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={isHead ? 28 : 24}
                fill={commitColor}
                stroke={isHead ? 'oklch(0.72 0.18 50)' : 'oklch(0.98 0 0)'}
                strokeWidth={isHead ? 3 : 2}
                className={`cursor-pointer ${isHead ? 'pulse-glow' : ''}`}
                onClick={() => handleCommitClick(commit)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              />
              
              <foreignObject
                x={pos.x - 10}
                y={pos.y - 10}
                width={20}
                height={20}
                className="pointer-events-none"
              >
                <div className="flex items-center justify-center text-white">
                  {getCommitIcon(commit)}
                </div>
              </foreignObject>

              {/* Commit message */}
              <foreignObject
                x={pos.x - COMMIT_MESSAGE_OFFSET_X}
                y={pos.y - COMMIT_MESSAGE_OFFSET_Y}
                width={COMMIT_MESSAGE_WIDTH}
                height={COMMIT_MESSAGE_HEIGHT}
                className="pointer-events-none"
              >
                <div className="flex items-center justify-center">
                  <div 
                    className="text-xs font-medium text-center px-2 py-1 rounded bg-background/80 backdrop-blur-sm border border-border/50 max-w-[280px] truncate"
                    style={{
                      maxWidth: `${COMMIT_MESSAGE_MAX_WIDTH}px`,
                      boxShadow: isActive ? '0 0 0 2px oklch(0.70 0.20 255 / 0.35)' : undefined,
                      fontWeight: isActive ? 700 : undefined
                    }}
                    title={titleText}
                  >
                    {commit.message}
                  </div>
                </div>
              </foreignObject>

              {gitState.branches
                .filter(b => b.commitId === commit.id)
                .map((branch, idx) => (
                  <foreignObject
                    key={branch.name}
                    x={pos.x + 35}
                    y={pos.y - 12 + idx * 28}
                    width={220}
                    height={28}
                  >
                    <Badge
                      variant={branch.name === gitState.head ? 'default' : 'secondary'}
                      className="text-xs font-semibold shadow-sm whitespace-nowrap"
                      style={{ 
                        backgroundColor: getBranchColor(branch.name, branch.color),
                        color: 'white',
                        borderColor: getBranchColor(branch.name, branch.color)
                      }}
                    >
                      {branch.isRemote ? '🛰️ ' : ''}{branch.name}
                    </Badge>
                  </foreignObject>
                ))}
            </g>
          )
        })}
      </svg>

      <div className="absolute top-4 left-4 flex flex-wrap gap-2 bg-card/90 backdrop-blur-sm border border-border px-3 py-2 rounded-md shadow-lg">
        {(() => {
          const activeHead = gitState.head
          const activeColor = getBranchColor(activeHead)
          const baseEntries: Array<{ key: string; label: string; color: string; isActive?: boolean }> = [
            { key: `head:${activeHead}`, label: `Active: ${activeHead}`, color: activeColor, isActive: true },
            { key: 'main', label: 'Main', color: getBranchColor('main') },
            { key: 'develop', label: 'Develop', color: getBranchColor('develop') },
            { key: 'hotfix/critical-security', label: 'Hotfix', color: getBranchColor('hotfix/critical-security') },
            { key: 'release', label: 'Release', color: getBranchColor('release') },
            { key: 'feature', label: 'Feature', color: getBranchColor('feature') }
          ]

          const deduped = baseEntries.filter((entry, idx, arr) =>
            arr.findIndex(e => e.key === entry.key) === idx && entry.key !== activeHead
          )

          return deduped.map(({ key, label, color, isActive }) => (
            <div
              key={key}
              className={`flex items-center gap-2 text-xs font-semibold ${isActive ? 'text-secondary' : 'text-foreground/80'}`}
            >
              <span
                className={`inline-block w-3 h-3 rounded-full ${isActive ? 'ring-2 ring-offset-2 ring-secondary' : ''}`}
                style={{ backgroundColor: color }}
              />
              <span>{label}</span>
            </div>
          ))
        })()}
      </div>

      <AnimatePresence>
        {selectedCommit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 right-4 w-80"
          >
            <Card className="glass-panel p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-secondary">{selectedCommit.message}</h4>
                <button
                  onClick={() => setSelectedCommit(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              <div className="text-sm space-y-1">
                <p className="text-muted-foreground">
                  <span className="font-medium">Author:</span> {selectedCommit.author}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Branch:</span> {selectedCommit.branch}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Type:</span>{' '}
                  <Badge variant="secondary" className="text-xs">
                    {selectedCommit.type}
                  </Badge>
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Commit ID:</span>{' '}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">{selectedCommit.id}</code>
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
