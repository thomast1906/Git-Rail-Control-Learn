/**
 * Educational content for Git concepts using rail/dispatch analogies.
 * Pre-written responses that provide beginner-friendly explanations.
 */

export const fallbackExplanations: Record<string, string> = {
  'Git basics': `🚦 Git is your railway control system. Each commit is a timestamped log entry. Branches are sidings or alternate tracks to try ideas safely. When a side track is ready, you merge it back into the main line so trains keep running smoothly.`,
  
  'Branching': `🌳 Branches are parallel tracks. The main branch is the main line; new branches are temporary sidings where you can rearrange cars without blocking traffic. When the work is good, you merge the siding back into the main line.`,
  
  'Merging': `🤝 Merging is coupling two trains of work. You connect the changes from one track to another so the history flows in one line. If both touched the same switch, you resolve the conflict to keep traffic safe.`,
  
  'Commits': `📜 A commit is a locked-in entry in the dispatch log. It records what changed and when, so you can roll back to any point or audit decisions later.`,
  
  'Remote Repositories': `🏰 A remote repository is the central depot. Your local repo is your yard. Pushing sends your latest manifests to the depot; pulling brings down new schedules and freight from other crews.`,
  
  'Pull Requests': `🎯 A pull request is handing your route plan to the dispatcher for review before it goes on the main line. Teammates comment, request tweaks, and approve before it merges.`,
  
  'Rebase': `⏰ Rebasing is reordering your cars to sit behind the latest locomotive on the main line. Your commits are replayed after current main history, giving a clean, linear story.`,
  
  'Stash': `🎒 Stashing parks your unfinished work on a side track. You clear the main line to handle another job, then pull the stash back exactly as you left it.`,
  
  'Cherry Pick': `🍒 Cherry-picking is pulling a single car from another train and coupling it to yours. You take one specific commit without bringing the rest of that train.`,
  
  'Tags': `🏷️ Tags are station signs on the line. They mark important releases so anyone can find that exact stop later. Unlike branches, tags never move.`,
  
  default: `🌟 Git is your railway logbook. It tracks every change, lets you branch to new tracks, merge work back in, and audit the whole line. You always know what moved, when, and why.`,
}

export const commandExplanations: Record<string, string> = {
  'commit': 'Creates a snapshot of your current work — like locking in today’s switch list.',
  'branch': 'Creates a new parallel track where you can experiment safely.',
  'merge': 'Couples changes from another branch into yours so history stays connected.',
  'checkout': 'Moves you to a different branch or commit — shifting to another point on the line.',
  'push': 'Uploads your local changes to the central depot for others to use.',
  'pull': 'Brings down new changes from the depot and updates your local line.',
  'revert': 'Undoes a specific commit by adding a correcting commit.',
  'reset': 'Moves your current position to a different commit (careful — work can be lost).',
  'stash': 'Parks uncommitted work on a side track so you can clear the main line.',
  'cherry-pick': 'Applies one specific commit from another branch onto your current branch.',
  'rebase': 'Replays your commits on top of another branch to keep history linear.',
  'tag': 'Creates a permanent marker on a commit — great for releases.',
  'clone': 'Downloads a complete copy of a repository to your local machine.',
  'fetch': 'Downloads remote changes without merging them so you can review first.',
  'log': 'Shows the history of commits — your dispatch log.',
  'status': 'Shows what files have changed — your current yard status.',
  'diff': 'Shows the specific changes made to files.',
  'add': 'Stages files for the next commit — prepares changes to save.',
  default: 'A Git command that helps you manage your code railway.',
}

/**
 * Get a fallback explanation for a Git concept
 */
export function getFallbackExplanation(concept?: string): string {
  if (!concept) return fallbackExplanations.default
  
  const key = Object.keys(fallbackExplanations).find(k => 
    concept.toLowerCase().includes(k.toLowerCase())
  )
  
  return fallbackExplanations[key || 'default']
}

/**
 * Get a fallback command explanation
 */
export function getFallbackCommandExplanation(command: string): string {
  const cmd = command.trim().split(' ')[0].replace('git', '').trim()
  return commandExplanations[cmd] || commandExplanations.default
}

/**
 * Validate a Git command using pattern matching
 */
export function validateGitCommandFallback(command: string): {
  isValid: boolean
  commandType: string
  explanation: string
  error: string | null
} {
  const trimmedCommand = command.trim()
  
  // Basic git command pattern
  const gitCommandPattern = /^git\s+(\w+)/
  const match = trimmedCommand.match(gitCommandPattern)
  
  if (!match) {
    return {
      isValid: false,
      commandType: 'unknown',
      explanation: '',
      error: 'Commands must start with "git" followed by a command name'
    }
  }
  
  const commandType = match[1]
  const validCommands = [
    'commit', 'branch', 'checkout', 'merge', 'push', 'pull', 'fetch',
    'clone', 'add', 'status', 'log', 'diff', 'revert', 'reset', 'stash',
    'cherry-pick', 'rebase', 'tag', 'remote', 'init', 'show', 'bisect',
    'blame', 'grep', 'clean', 'mv', 'rm', 'config'
  ]
  
  if (!validCommands.includes(commandType)) {
    return {
      isValid: false,
      commandType,
      explanation: '',
      error: `Unknown git command: "${commandType}". Try commands like commit, branch, merge, etc.`
    }
  }
  
  return {
    isValid: true,
    commandType,
    explanation: getFallbackCommandExplanation(commandType),
    error: null
  }
}
