import { MissionLog as MissionLogType } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Download, Clock } from '@phosphor-icons/react'

type MissionLogProps = {
  logs: MissionLogType[]
  onExport: () => void
}

export function MissionLog({ logs, onExport }: MissionLogProps) {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className="glass-panel p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-xl">Dispatch Log</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          disabled={logs.length === 0}
        >
          <Download size={16} className="mr-2" />
          Export
        </Button>
      </div>

      <Separator />

      {logs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground bg-muted/40 border border-border/70 rounded-xl">
          <Clock size={48} className="mx-auto mb-3 opacity-60 text-accent" />
          <p className="text-foreground">No dispatch entries yet</p>
          <p className="text-sm">Complete routes to start logging activity.</p>
        </div>
      ) : (
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {logs.slice().reverse().map((log, index) => (
              <div
                key={`${log.timestamp}-${index}`}
                className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-muted-foreground">
                      Route: {log.scenarioId}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-accent">+{log.xpEarned} TP</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimestamp(log.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </Card>
  )
}
