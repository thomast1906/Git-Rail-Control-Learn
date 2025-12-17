import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TrainSimple, ChartLine, BookOpen, Lightbulb } from '@phosphor-icons/react'

type WelcomeModalProps = {
  open: boolean
  onClose: () => void
}

export function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      icon: <TrainSimple size={48} weight="fill" className="text-secondary" />,
      title: 'Welcome to Git Rail Control! 🚂',
      description: 'Learn Git through interactive visual scenarios. Think of it as a dispatch control center where you manage code branches like train routes.'
    },
    {
      icon: <ChartLine size={48} weight="fill" className="text-accent" />,
      title: 'What are Training Points (TP)?',
      description: 'TP are earned by completing routes (scenarios). They track your progress and unlock certifications. The more routes you complete, the more you level up!'
    },
    {
      icon: <BookOpen size={48} weight="fill" className="text-primary" />,
      title: 'How to Navigate',
      description: 'Browse Routes to see all scenarios. Click any route to visualize the Git operations step-by-step. Use playback controls to move through each command and watch the graph update in real-time.'
    },
    {
      icon: <Lightbulb size={48} weight="fill" className="text-accent" />,
      title: 'Learning Tips',
      description: 'Start with beginner routes (blue border). Click "Explain Simply" on any route for a kid-friendly explanation. Commands are copyable for practice. Your progress is saved automatically!'
    }
  ]

  const currentStep = steps[step]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-panel glow-border max-w-lg">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            {currentStep.icon}
          </div>
          <DialogTitle className="text-2xl text-center">
            {currentStep.title}
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-center pt-4">
            {currentStep.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between pt-6">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === step ? 'w-8 bg-secondary' : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            <Button onClick={handleNext}>
              {step < steps.length - 1 ? 'Next' : "Let's Go! 🚀"}
            </Button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors text-center mt-2"
        >
          Skip tour
        </button>
      </DialogContent>
    </Dialog>
  )
}
