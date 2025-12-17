import { motion, AnimatePresence } from 'framer-motion'
import { Badge as BadgeType } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkle } from '@phosphor-icons/react'

type CelebrationProps = {
  isOpen: boolean
  onClose: () => void
  badge?: BadgeType
  xpEarned?: number
  levelUp?: boolean
  newLevel?: number
}

export function Celebration({ isOpen, onClose, badge, xpEarned, levelUp, newLevel }: CelebrationProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, rotate: 180, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="relative"
        >
          <Card className="glass-panel glow-border p-8 max-w-md text-center space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: '50%',
                    y: '50%',
                    scale: 0,
                    opacity: 1
                  }}
                  animate={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    ease: 'easeOut'
                  }}
                >
                  <Sparkle size={16} className="text-accent" weight="fill" />
                </motion.div>
              ))}
            </div>

            {levelUp && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <h2 className="text-4xl font-bold text-accent">LEVEL UP!</h2>
                <p className="text-6xl font-bold text-secondary">Level {newLevel}</p>
                <p className="text-muted-foreground">You're becoming a Git master! ⚔️</p>
              </motion.div>
            )}

            {badge && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: levelUp ? 0.5 : 0.3 }}
                className="space-y-3"
              >
                <motion.div
                  className="text-8xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: 2,
                    delay: 0.5
                  }}
                >
                  {badge.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground">{badge.name}</h3>
                <p className="text-muted-foreground">{badge.description}</p>
              </motion.div>
            )}

            {xpEarned && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border-2 border-accent"
              >
                <Sparkle size={20} weight="fill" className="text-accent" />
                <span className="font-bold text-accent">+{xpEarned} TP</span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={onClose}
                size="lg"
                className="bg-secondary hover:bg-secondary/90"
              >
                Back to Control Deck
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
