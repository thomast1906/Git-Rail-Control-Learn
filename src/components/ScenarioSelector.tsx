import { Scenario } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getScenarioExplanation } from '@/lib/scenario-explanations'
import {
  TrainSimple,
  Broadcast,
  Download,
  Warning,
  ArrowCounterClockwise,
  Signpost,
  TrafficCone,
  Handshake,
  GitMerge,
  Package,
  Siren,
  Ruler,
  MagnifyingGlass,
  TagSimple,
  ShieldCheck,
  Scroll,
  Broom,
  ClockCounterClockwise,
  Lightbulb,
  Funnel
} from '@phosphor-icons/react'

type ScenarioSelectorProps = {
  scenarios: Scenario[]
  selectedScenario?: Scenario
  onSelectScenario: (scenario: Scenario) => void
  completedScenarios: string[]
}

const iconMap: Record<string, React.ReactNode> = {
  train: <TrainSimple size={24} weight="fill" />, // primary rail marker
  rocket: <TrainSimple size={24} weight="fill" />, // alias for legacy data
  satellite: <Broadcast size={24} weight="fill" />, // signals/comms
  download: <Download size={24} weight="fill" />, // fetch updates
  warning: <Warning size={24} weight="fill" />, // hazards
  undo: <ArrowCounterClockwise size={24} weight="fill" />, // rollback
  target: <Signpost size={24} weight="fill" />, // routing
  sandbox: <TrafficCone size={24} weight="fill" />, // work zone
  handshake: <Handshake size={24} weight="fill" />, // collaboration
  rebase: <GitMerge size={24} weight="fill" />, // linearization
  storage: <Package size={24} weight="fill" />, // stash storage
  pr: <GitMerge size={24} weight="fill" />, // pull request merge
  emergency: <Siren size={24} weight="fill" />, // hotfix
  sculpt: <Ruler size={24} weight="fill" />, // history shaping
  detective: <MagnifyingGlass size={24} weight="fill" />, // debugging
  tag: <TagSimple size={24} weight="fill" />, // releases
  conflict: <Warning size={24} weight="fill" />, // conflicts
  shield: <ShieldCheck size={24} weight="fill" />, // safety
  scroll: <Scroll size={24} weight="fill" />, // policy/config
  broom: <Broom size={24} weight="fill" />, // cleanup
  'time-machine': <ClockCounterClockwise size={24} weight="fill" />,
  history: <ClockCounterClockwise size={24} weight="fill" /> // reflog recovery
}

const difficultyColors = {
  beginner: 'oklch(0.65 0.15 200)',
  intermediate: 'oklch(0.72 0.18 50)',
  advanced: 'oklch(0.55 0.18 290)'
}

export function ScenarioSelector({
  scenarios,
  selectedScenario,
  onSelectScenario,
  completedScenarios
}: ScenarioSelectorProps) {
  const [eli5Open, setEli5Open] = useState(false)
  const [eli5Scenario, setEli5Scenario] = useState<Scenario | null>(null)
  const [eli5Explanation, setEli5Explanation] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null)

  const handleEli5 = (scenario: Scenario, e: React.MouseEvent) => {
    e.stopPropagation()
    setEli5Scenario(scenario)
    setEli5Explanation(getScenarioExplanation(scenario.id))
    setEli5Open(true)
  }
  
  const filteredAndOrderedScenarios = useMemo(() => {
    const difficultyOrder = ['beginner', 'intermediate', 'advanced'] as const
    let filtered = [...scenarios]
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(scenario =>
        scenario.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scenario.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Apply difficulty filter
    if (difficultyFilter) {
      filtered = filtered.filter(scenario => scenario.difficulty === difficultyFilter)
    }
    
    // Sort by difficulty
    return filtered.sort((a, b) => {
      return difficultyOrder.indexOf(a.difficulty as (typeof difficultyOrder)[number]) -
        difficultyOrder.indexOf(b.difficulty as (typeof difficultyOrder)[number])
    })
  }, [scenarios, searchQuery, difficultyFilter])

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search routes by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={difficultyFilter === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDifficultyFilter(null)}
              className="gap-1"
            >
              <Funnel size={16} />
              All
            </Button>
            <Button
              variant={difficultyFilter === 'beginner' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDifficultyFilter('beginner')}
              style={{
                borderColor: difficultyFilter === 'beginner' ? difficultyColors.beginner : undefined,
                color: difficultyFilter === 'beginner' ? difficultyColors.beginner : undefined
              }}
            >
              Beginner
            </Button>
            <Button
              variant={difficultyFilter === 'intermediate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDifficultyFilter('intermediate')}
              style={{
                borderColor: difficultyFilter === 'intermediate' ? difficultyColors.intermediate : undefined,
                color: difficultyFilter === 'intermediate' ? difficultyColors.intermediate : undefined
              }}
            >
              Intermediate
            </Button>
            <Button
              variant={difficultyFilter === 'advanced' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDifficultyFilter('advanced')}
              style={{
                borderColor: difficultyFilter === 'advanced' ? difficultyColors.advanced : undefined,
                color: difficultyFilter === 'advanced' ? difficultyColors.advanced : undefined
              }}
            >
              Advanced
            </Button>
          </div>
        </div>

        {filteredAndOrderedScenarios.length === 0 ? (
          <Card className="glass-panel p-12 text-center">
            <MagnifyingGlass size={48} className="mx-auto mb-3 opacity-50 text-muted-foreground" />
            <p className="text-muted-foreground">No routes match your search</p>
            <Button variant="ghost" size="sm" onClick={() => { setSearchQuery(''); setDifficultyFilter(null); }} className="mt-3">
              Clear filters
            </Button>
          </Card>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {filteredAndOrderedScenarios.map((scenario, index) => {
          const isCompleted = completedScenarios.includes(scenario.id)
          const isSelected = selectedScenario?.id === scenario.id

          return (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35, ease: 'easeOut' }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Card
                className={`glass-panel p-4 md:p-5 cursor-pointer transition-all duration-150 ease-out border ${
                  isSelected ? 'glow-border ring-2 ring-secondary' : 
                  isCompleted ? 'border-green-500/70 bg-green-100/70' : 'border-border/60'
                }`}
                onClick={() => onSelectScenario(scenario)}
                style={{
                  borderTop: `3px solid ${isCompleted ? 'oklch(0.72 0.14 145)' : difficultyColors[scenario.difficulty]}`,
                  backgroundColor: isCompleted ? 'oklch(0.94 0.08 145 / 0.7)' : undefined
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: difficultyColors[scenario.difficulty] + '22' }}
                  >
                    <div style={{ color: difficultyColors[scenario.difficulty] }}>
                      {iconMap[scenario.icon]}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-lg leading-tight">{scenario.name}</h3>
                      {isCompleted && <span className="text-2xl" aria-label="Completed">✓</span>}
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {scenario.description}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                          borderColor: difficultyColors[scenario.difficulty],
                          color: difficultyColors[scenario.difficulty]
                        }}
                      >
                        {scenario.difficulty}
                      </Badge>

                      {scenario.xpReward > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          +{scenario.xpReward} TP
                        </Badge>
                      )}

                      {scenario.badge && (
                        <Badge variant="outline" className="text-xs">
                          {scenario.badge.icon} {scenario.badge.name}
                        </Badge>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="mt-2 -ml-2 text-xs gap-1"
                      onClick={(e) => handleEli5(scenario, e)}
                    >
                      <Lightbulb size={14} weight="fill" />
                      Explain Simply
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Dialog open={eli5Open} onOpenChange={setEli5Open}>
        <DialogContent className="glass-panel glow-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Lightbulb size={24} weight="fill" className="text-accent" />
              {eli5Scenario?.name} - Explained Simply
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-foreground leading-relaxed text-base whitespace-pre-wrap">
                {eli5Explanation}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEli5Open(false)}>
              Got it! 🚀
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
