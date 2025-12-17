import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  FastForward,
  Rewind
} from '@phosphor-icons/react'

type PlaybackControlsProps = {
  currentStep: number
  totalSteps: number
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onStepChange: (step: number) => void
  onPrevious: () => void
  onNext: () => void
  operationDescription?: string
  gitCommand?: string
}

export function PlaybackControls({
  currentStep,
  totalSteps,
  isPlaying,
  onPlay,
  onPause,
  onStepChange,
  onPrevious,
  onNext,
  operationDescription,
  gitCommand
}: PlaybackControlsProps) {
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0

  return (
    <Card className="glass-panel p-4 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onPrevious}
            disabled={currentStep === 0}
          >
            <SkipBack size={18} weight="fill" />
          </Button>

          <Button
            variant="default"
            size="icon"
            onClick={isPlaying ? onPause : onPlay}
            className="bg-secondary hover:bg-secondary/90 w-12 h-12"
          >
            {isPlaying ? (
              <Pause size={24} weight="fill" />
            ) : (
              <Play size={24} weight="fill" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={onNext}
            disabled={currentStep >= totalSteps - 1}
          >
            <SkipForward size={18} weight="fill" />
          </Button>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <Badge variant="secondary" className="text-xs">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          
          <Slider
            value={[currentStep]}
            max={totalSteps - 1}
            step={1}
            onValueChange={(values) => onStepChange(values[0])}
            className="cursor-pointer"
          />
        </div>

        <div className="hidden md:flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onStepChange(0)}
            disabled={currentStep === 0}
            title="Rewind to start"
          >
            <Rewind size={18} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onStepChange(totalSteps - 1)}
            disabled={currentStep >= totalSteps - 1}
            title="Fast forward to end"
          >
            <FastForward size={18} />
          </Button>
        </div>
      </div>

      {operationDescription && (
        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm font-medium text-foreground">{operationDescription}</p>
          </div>
          {gitCommand && (
            <div className="p-3 rounded-lg bg-secondary/20 border border-secondary/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-secondary uppercase tracking-wide">Git Command</span>
              </div>
              <code className="text-sm font-mono text-foreground">{gitCommand}</code>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
