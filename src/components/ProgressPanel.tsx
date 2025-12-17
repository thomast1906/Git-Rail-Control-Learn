import { motion } from 'framer-motion'
import { UserProgress } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Star, Shield, Trophy } from '@phosphor-icons/react'
import { getXpForNextLevel } from '@/lib/scenarios'

type ProgressPanelProps = {
  progress: UserProgress
}

export function ProgressPanel({ progress }: ProgressPanelProps) {
  const currentLevel = progress.level
  const xpForNext = getXpForNextLevel(currentLevel)
  const xpProgress = (progress.xp / xpForNext) * 100

  return (
    <Card className="glass-panel p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-secondary/20">
            <Shield size={24} weight="fill" className="text-secondary" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Dispatcher</h3>
            <p className="text-sm text-muted-foreground">Grade {currentLevel}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-accent">{progress.totalXp}</p>
          <p className="text-xs text-muted-foreground">Total TP (Throughput Points)</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress to Grade {currentLevel + 1}</span>
          <span className="font-medium text-secondary">
            {progress.xp} / {xpForNext} TP
          </span>
        </div>
        <Progress value={xpProgress} className="h-3" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <Trophy size={24} className="mx-auto mb-1 text-accent" weight="fill" />
          <p className="text-xl font-bold">{progress.badges.length}</p>
          <p className="text-xs text-muted-foreground">Certifications</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <Star size={24} className="mx-auto mb-1 text-secondary" weight="fill" />
          <p className="text-xl font-bold">{progress.completedScenarios.length}</p>
          <p className="text-xs text-muted-foreground">Routes</p>
        </div>
      </div>

      {progress.badges.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground">Recent Certifications</h4>
          <div className="flex flex-wrap gap-2">
            {progress.badges.slice(-4).map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <Badge
                  variant="secondary"
                  className="px-3 py-2 text-sm gap-2"
                  title={badge.description}
                >
                  <span className="text-lg">{badge.icon}</span>
                  {badge.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
