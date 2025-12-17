/**
 * Simple, kid-friendly explanations for each rail-themed scenario
 * These are used when the "Explain Simply" button is clicked
 */

export const scenarioExplanations: Record<string, string> = {
  'free-explore-local': `🚂 First yard run! You'll learn to log your work (commits), split into sidings (branches), and couple tracks back together (merge). Think of it as keeping a clear operations journal so you can replay any move.`,
  
  'free-explore-remote': `🤝 Now you're connecting your yard to the central depot. When you "push", you send your latest manifests to the depot. When you "pull", you bring back the newest schedule from other crews. Coordination keeps every line moving.`,
  
  'upstream-changes': `🔄 While you were switching cars, the main line changed. This shows how to fetch the latest timetable and merge it into your plan so you stay on the current schedule.`,
  
  'force-push': `⚠️ Force push is like sending a new timetable that overwrites what's at the depot. It replaces history, so only use it when you're sure no one will be surprised.`,
  
  'revert': `⏮️ A revert is backing out a bad car placement without undoing the newer moves. You add a new correction entry that restores the track to a safe state.`,
  
  'cherry-pick': `🎯 Cherry-picking is like grabbing one good car from another train and coupling it onto yours. You take a specific commit without pulling the whole train of changes.`,
  
  'rebase-simple': `🔀 Rebase is reordering your train so it lines up behind the latest locomotive. Your commits get replayed on top of the newest mainline, making the story clean and linear.`,
  
  'stash': `📦 Stash is parking your in-progress cars on a side track. Clear the main track to handle another job, then roll your stashed work back out exactly as you left it.`,
  
  'pull-request-workflow': `🎯 A pull request is like handing your route plan to the dispatcher for approval. Teammates review, comment, and once it's clear, the plan gets merged into the main timetable.`,
  
  'hotfix-workflow': `🚨 A signal is down on the main line! You branch off a quick fix train from the stable track, deliver the repair fast, and merge it back immediately to restore service.`,
  
  'interactive-rebase': `🎨 Interactive rebase is tidying your train cars before rollout: combine tiny steps, rename confusing labels, or reorder cars so the consist is clean and professional.`,
  
  'bisect-debugging': `🔍 A problem is somewhere in your past moves. Bisect is like inspecting checkpoints down the line to find exactly which switch caused the fault—efficient detective work for code.`,
  
  'tag-release': `🏷️ A tag is a station sign on your line. When you hit a milestone (like v1.0), you place a permanent marker on that commit so everyone can find that exact stop again.`,
  
  'conflict-resolution': `⚔️ Two crews changed the same switch differently. A merge conflict needs a dispatcher to choose the correct setting so both trains can roll safely. This teaches you how to resolve it.`,
}

/**
 * Get a simple explanation for a scenario
 */
export function getScenarioExplanation(scenarioId: string): string {
  return scenarioExplanations[scenarioId] || `🌟 This route will teach you essential Git moves. Watch how the graph shifts as each operation runs, just like monitoring trains across the network!`
}
